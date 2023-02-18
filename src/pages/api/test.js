const fs = require('fs');
import got from 'got';
const jsdom = require("jsdom");
const {JSDOM} = jsdom;

export default function handler(req, res) {

    // make date dynamic
    const mlhURL = 'https://mlh.io/seasons/2023/events';

    got(mlhURL).then(response => {
        const dom = new JSDOM(response.body);
        console.log(dom.window.document.getElementsByClassName('container feature'));
    }).catch(err => {
        console.log(err);
    });

    res.status(200).json({
        name: 'Test Endpoint'
    })
}