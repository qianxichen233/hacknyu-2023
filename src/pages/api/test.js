const browserObject = require('./browser');
const scraperController = require('./pageController.js');


export default function handler(req, res) {

    let browserInstance = browserObject.startBrowser();

// Pass the browser instance to the scraper controller
scraperController(browserInstance)
    res.status(200).json({ name: 'Test Endpoint' })
  }
  

