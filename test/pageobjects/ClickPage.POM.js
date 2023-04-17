const BaseURL = require('./BaseURL');

const expectedColor = 'rgba(255, 0, 0, 1)'; //rgba code of color red
const BTN = '#badButton' //button be clicked
const BTN_CSS_BG_COLOR = 'background-color'
const PAGE_TITLE = '//h3'

class ClickPage extends BaseURL {

    async openURL() {
        await browser.maximizeWindow() //Maximize window
        return super.open('click')
    }

    get page_title(){
        return $(PAGE_TITLE)
    }

    get clickBtn() {
        return $(BTN)
    }
    
    async buttonColor() {
        const button = await this.clickBtn;
        const color = await button.getCSSProperty(BTN_CSS_BG_COLOR);
        return color.value  
    }

    get expectedColor(){
        return expectedColor
    }

}

module.exports = new ClickPage();