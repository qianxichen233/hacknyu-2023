const fs = require("fs");
import got from "got";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

export default function handler(req, res) {
    if (req.method !== "GET")
        return res.status(405).json({ error: "only accept GET method" });

    // make date dynamic
    const mlhURL = "https://mlh.io/seasons/2023/events";

    let mlhData = [];

    const eventLinkIndex = 0;
    const eventLogoIndex = 1;
    const eventNameIndex = 2;
    const eventDateIndex = 3;
    const eventLocationIndex = 6;
    const eventNotesIndex = 7;

    got(mlhURL)
        .then((response) => {
            const dom = new JSDOM(response.body);
            const numOfHackathons =
                dom.window.document.getElementsByClassName("inner").length;
            console.log("total number of hackathons found:", numOfHackathons);
            for (let i = 0; i < numOfHackathons; i++) {
                let hackathonObject = {};
                hackathonObject["url"] = getProperty(dom, i, eventLinkIndex);
                hackathonObject["name"] = getProperty(dom, i, eventNameIndex);
                hackathonObject["logoImageURL"] = getProperty(
                    dom,
                    i,
                    eventLogoIndex
                );
                hackathonObject["date"] = getProperty(dom, i, eventDateIndex);
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
                mlhData.push(hackathonObject);
                //console.log('MLHDATA is', mlhData);
            }
            console.log("MLHDATA is", mlhData);

            res.status(200).json({
                mlhData,
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

function getProperty(domObject, positions, propertyIndex) {
    const mainContainer =
        domObject.window.document.getElementsByClassName("inner")[positions];

    const numberOfAttributes = mainContainer.children.length;

    // resolve this so it reads hackathons from diversity list as well
    if (numberOfAttributes != 9) {
        //console.log("Hackathon Property:", domObject.window.document.getElementsByClassName('inner')[positions].children[propertyIndex].innerHTML);
        console.log("PropertyIndex", propertyIndex);
        if (propertyIndex == 0) {
            console.log(domObject.window.document.getElementsByClassName("event-link")[positions].href);
            return domObject.window.document.getElementsByClassName("event-link")[positions].href;
        }

        else if (propertyIndex == 1) {
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
