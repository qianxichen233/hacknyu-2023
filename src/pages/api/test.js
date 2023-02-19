const fs = require('fs');
import got from 'got';
const jsdom = require("jsdom");
const {JSDOM} = jsdom;

export default function handler(req, res) {

    // make date dynamic
    const mlhURL = 'https://mlh.io/seasons/2023/events';

    const eventLogoIndex = 1;
    const eventNameIndex = 2;
    const eventDateIndex = 3;
    const eventLocationIndex = 6;
    const eventNotesIndex = 7;
    

    got(mlhURL).then(response => {
        const dom = new JSDOM(response.body);
        const numOfHackathons =  dom.window.document.getElementsByClassName('inner').length;
        console.log("total number of hackathons found:", numOfHackathons);
        for (let i = 0; i < numOfHackathons; i++){
            getProperty(dom, i, eventNameIndex);
            getProperty(dom, i, eventLogoIndex);
            getProperty(dom, i, eventDateIndex);
            getProperty(dom, i, eventLocationIndex);
            getProperty(dom, i, eventNotesIndex);
        }
        
    }).catch(err => {
        console.log(err);
    });

    res.status(200).json({
        name: 'Hackathons Extracted'
    })
}

function getProperty(domObject, positions, propertyIndex){



    const numberOfAttributes = domObject.window.document.getElementsByClassName('inner')[positions].children.length;

    // resolve this so it reads hackathons from diversity list as well
    if (numberOfAttributes!=9) {

        console.log("Hackathon Property:", domObject.window.document.getElementsByClassName('inner')[positions].children[propertyIndex].innerHTML);

        if (propertyIndex == 1) {
            const urlTag = domObject.window.document.getElementsByClassName('inner')[positions].children[propertyIndex].innerHTML;
            const src = urlTag.slice(urlTag.indexOf("src")).split('"')[1];
            console.log(src);
    
        }
    
        else if (propertyIndex == 6) {
            const cityIndex = 0;
            const StateOrCountryIndex = 1;
            let cityAndState = domObject.window.document.getElementsByClassName('inner')[positions].children[propertyIndex];
            console.log(cityAndState.children[cityIndex].textContent);
            console.log(cityAndState.children[StateOrCountryIndex].textContent);
        }
    }

    

}