const BaseURL = require("./BaseURL")

const PAGE_TITLE = '//h3'
const GENERATE_BTN = '#buttonGenerate'
const EDIT_FIELD = '#editField'
const COPY_BTN = '#buttonCopy'
const PARENT = '//guid-generator'

class Shadowdom extends BaseURL{

    async openURL(){
        await browser.maximizeWindow() //Maximize window
        return super.open('shadowdom')
    }

    get shadowDomPageTitle(){
        return $(PAGE_TITLE)
    }

    get parentElement(){
        return $(PARENT)
    }

    get generateBtn(){
        return (GENERATE_BTN)
    }

    get editField(){
        return (EDIT_FIELD)
    }

    get copyBtn(){
        return (COPY_BTN)
    }
}

module.exports = new Shadowdom();