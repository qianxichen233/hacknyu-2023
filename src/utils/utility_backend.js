const fs = require("fs");
import got from "got";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const axios = require("axios");

const hackathon = (interval) => {
    console.log(interval);
    // make date dynamic
    const mlhURL = "https://mlh.io/seasons/2023/events";

    let mlhData = [];

    const eventLogoIndex = 1;
    const eventNameIndex = 2;
    const eventDateIndex = 3;
    const eventLocationIndex = 6;
    const eventNotesIndex = 7;

    return new Promise((resolve, reject) => {
        fetch(mlhURL)
            .then((response) => response.text())
            .then((response) => {
                const dom = new JSDOM(response);
                const numOfHackathons =
                    dom.window.document.getElementsByClassName("inner").length;
                console.log(
                    "total number of hackathons found:",
                    numOfHackathons
                );
                for (let i = 0; i < numOfHackathons; i++) {
                    let hackathonObject = {};
                    hackathonObject["name"] = getProperty(
                        dom,
                        i,
                        eventNameIndex
                    );
                    hackathonObject["logoImageURL"] = getProperty(
                        dom,
                        i,
                        eventLogoIndex
                    );
                    hackathonObject["date"] = getProperty(
                        dom,
                        i,
                        eventDateIndex
                    );
                    hackathonObject["location"] = getProperty(
                        dom,
                        i,
                        eventLocationIndex
                    );
                    hackathonObject["format"] = getProperty(
                        dom,
                        i,
                        eventNotesIndex
                    );
                    if (!hackathonObject.name) continue;
                    if (interval.start || interval.end) {
                        console.log("test");
                        let stringDate = hackathonObject.date
                            .split("-")[0]
                            .trim();
                        stringDate = stringDate.substr(
                            0,
                            stringDate.length - 2
                        );
                        stringDate = "2023 " + stringDate;
                        console.log(stringDate);
                        if (
                            (interval.start &&
                                new Date(interval.start) >
                                    new Date(stringDate)) ||
                            (interval.end &&
                                new Date(interval.end) < new Date(stringDate))
                        ) {
                            console.log(`filtered ${stringDate}`);
                            continue;
                        }
                    }
                    mlhData.push(hackathonObject);
                    //console.log('MLHDATA is', mlhData);
                }
                //console.log("MLHDATA is", mlhData);

                resolve(mlhData);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
};

function getProperty(domObject, positions, propertyIndex) {
    const mainContainer =
        domObject.window.document.getElementsByClassName("inner")[positions];

    const numberOfAttributes = mainContainer.children.length;

    // resolve this so it reads hackathons from diversity list as well
    if (numberOfAttributes != 9) {
        //console.log("Hackathon Property:", domObject.window.document.getElementsByClassName('inner')[positions].children[propertyIndex].innerHTML);

        if (propertyIndex == 1) {
            const urlTag = mainContainer.children[propertyIndex].innerHTML;
            const src = urlTag.slice(urlTag.indexOf("src")).split('"')[1];
            //console.log(src);
            return src;
        } else if (propertyIndex == 2) {
            const name = mainContainer.children[propertyIndex].textContent;
            return name;
        } else if (propertyIndex == 3) {
            const date = mainContainer.children[propertyIndex].textContent;
            return date.trim();
        } else if (propertyIndex == 6) {
            const cityIndex = 0;
            const StateOrCountryIndex = 1;
            let cityAndState = mainContainer.children[propertyIndex];
            return {
                city: cityAndState.children[cityIndex].textContent,
                stateOrCountry:
                    cityAndState.children[StateOrCountryIndex].textContent,
            };
            // console.log(cityAndState.children[cityIndex].textContent);
            // console.log(cityAndState.children[StateOrCountryIndex].textContent);

            // return locationObj;
        } else if (propertyIndex == 7) {
            const hackathonFormat = mainContainer.children[propertyIndex];
            const hackathonFormatText = hackathonFormat.children[0].textContent;
            return hackathonFormatText;
        }
    }
}

async function flight(from, to, date) {
    const options_iata = {
        method: "GET",
        url: "https://skyscanner50.p.rapidapi.com/api/v1/searchAirport",
        params: { query: from },
        headers: {
            "X-RapidAPI-Key": process.env.rapid_API_key,
            "X-RapidAPI-Host": "skyscanner50.p.rapidapi.com",
        },
    };

    console.log("--------- before first request ---------");

    let response = (await axios.request(options_iata)).data;
    if (response.length === 0) throw Error("No airport found");
    const fromIataCode = response.data[0].CityId;
    console.log("--------- before second request ---------");

    options_iata.params.query = to;
    response = (await axios.request(options_iata)).data;
    if (response.length === 0) throw Error("No airport found");
    const toIataCode = response.data[0].CityId;
    console.log("--------- before third request ---------");
    console.log(fromIataCode, toIataCode);

    const options_flight = {
        method: "GET",
        url: "https://skyscanner50.p.rapidapi.com/api/v1/searchFlights",
        params: {
            origin: fromIataCode,
            destination: toIataCode,
            date: date,
            adults: "1",
            currency: "USD",
            countryCode: "US",
            market: "en-US",
        },
        headers: {
            "X-RapidAPI-Key": process.env.rapid_API_key,
            "X-RapidAPI-Host": "skyscanner50.p.rapidapi.com",
        },
    };

    response = (await axios.request(options_flight)).data.data;
    response.sort((a, b) => {
        return a.price.amount < b.price.amount;
    });

    return response[0];
}

export { hackathon, flight };
