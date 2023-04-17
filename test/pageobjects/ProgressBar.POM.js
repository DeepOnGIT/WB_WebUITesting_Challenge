const { expect } = require('chai');
const BaseURL = require('./BaseURL');
const START_BTN = '//*[@id="startButton"]' //found element by direct xPath
const STOP_BTN = '//h4[2]//following::button[@onclick="Stop()"]' //element found using custom xpath by onClick
const BAR_PERC = '//div[@id="progressBar"]' //element found using custom xpath by following child elements
const PAGE_TITLE = '//h3' //xpath of Page title

class ProgressBar extends BaseURL {

    //Overwriting open with subpath /progressbar
    async openURL() {
        await browser.maximizeWindow() //Maximize window
        return super.open('progressbar');
    }

    //Start button 
    get startBtn() {
        return $(START_BTN);
    }

    //Stop button
    get stopBtn() {
        return $(STOP_BTN);
    }

    //Percentage Bar
    get percentageBar() {
        return $(BAR_PERC);
    }

    get pageTitle() {
        return $(PAGE_TITLE)
    }


    //Logic to do the action
    async ProgressBarValue() {
        let progressValueNow = await this.percentageBar.getAttribute('aria-valuenow'); //Storing before value of progress bar
        let stopButtonClicked = false //Stop button is set to false 

        //Logic
        do {
            await browser.pause(100); //wait for milli second
            progressValueNow = await this.percentageBar.getAttribute('aria-valuenow'); //Get Attribute the value
        }
        //While percentage is less than 75 and Stop button is true
        while (progressValueNow < 75 && !stopButtonClicked);

        //And if percentage reaches greater than or equal to 75
        if (progressValueNow >= 75) {
            await this.stopBtn.click(); //Click stop
        }
        return progressValueNow;

    }

}

module.exports = new ProgressBar();
