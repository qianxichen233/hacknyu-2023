const scraperObject = {
	// make the date dynamic
	url: 'https://mlh.io/seasons/2023/events',
	async scraper(browser){
		let page = await browser.newPage();
		console.log(`Navigating to ${this.url}...`);
		await page.goto(this.url);
		await page.waitForSelector('.container .feature');
		
		hackathonObject = await page.evaluate(() => {
			console.log(document.getElementsByClassName('container feature'));
			return 1;
			//return document.querySelectorAll("div.row");
		  });
		
		console.log("here");
	}
}

module.exports = scraperObject;