const BaseURL = require('./BaseURL');

const BTN = '//button[@id="ajaxButton"]' //Button to be clicked
const MSG_COUNT = '.bg-success'
const PAGE_TITLE = '//h3' //page title
const SPINNER = 'i#spinner' //spinner element

class AjaxPage extends BaseURL {

    //Overwriting open with subpath /ajax
    async openURL() {
        await browser.maximizeWindow() //Maximize window
        return super.open('ajax')
    }

    get AjaxTitle() {
        return $(PAGE_TITLE)
    }

    //Button Triggering AJAX Request - button
    get triggerBTN() {
        return $(BTN);
    }

    get msg_text(){
        return $(MSG_COUNT) //single elements found
    }

    get countOfMsg(){
        return $$(MSG_COUNT) //multiple elements found
    }

    get spinner(){
        return $(SPINNER)
    }


    async clickAjaxRequest_btn() {
        
        await this.triggerBTN.click();
        // Wait till the spinner element to disappear

        try {
            //Wait for spinner (loading animation) to be disappeared and execution goes to next line
            //takes 15.5 seconds to display one message. So timeougt is customized to 35 secs.
            await this.spinner.waitForDisplayed({ reverse: true, timeout: 35000 });
        } catch (e) {
            console.error('[ERR] Spinner is still on screen and did not disappear');
        }
    }
}

module.exports = new AjaxPage();
