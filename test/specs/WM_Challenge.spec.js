const AjaxPage = require('../pageobjects/AjaxPage.POM')
const ProgressBar = require('../pageobjects/ProgressBar.POM')
const VisibilityPage = require("../pageobjects/VisibilityPage.POM")
const ClickPage = require("../pageobjects/ClickPage.POM")
const Shadowdom = require('../pageobjects/Shadowdom.POM')
const { expect } = require('chai')

describe('Validate UITPG Web Page', () => {

    it('Verify whether stop button is clicked when bar reaches 75%', async () => {
        await ProgressBar.openURL() //Maximizes window & opens URL

        let ProgressBarPageTitle = await ProgressBar.pageTitle.getText(); //Validate the title of page 
        expect(ProgressBarPageTitle).to.equal('Progress Bar') //Expecting title to be same

        await ProgressBar.startBtn.click() //Click start button

        let progressBarValue = await ProgressBar.ProgressBarValue(); //calling business logic from POM page
        let numericProgressBarValue = Number(progressBarValue); //Value is a number

        //Validation
        const actual = numericProgressBarValue; //actual value
        const expected = 80; //expected value
        expect(actual).to.be.lessThanOrEqual(expected); //expecting the value to be around 75 - 80. As 5% is the tolerence.
    })

    it("Validate message count when Ajax button is clicked twice", async () => {
        await AjaxPage.openURL() //Maximizes window & opens URL

        let AjaxPageTitle = await AjaxPage.AjaxTitle.getText(); //Get page title
        expect(AjaxPageTitle).to.equal('AJAX Data') //Expecting title to be same

        expect(await AjaxPage.triggerBTN.isDisplayed) //checking whether button is displayed

        await AjaxPage.clickAjaxRequest_btn() //Click Trigger button once and wait for spinner animation to disappear

        let message = await AjaxPage.msg_text.getText()
        expect(message).to.be.equal('Data loaded with AJAX get request.') //Validate the String message

        await AjaxPage.clickAjaxRequest_btn() // Click button again and wait for spinner animation to disappear

        let msgCount = await AjaxPage.countOfMsg.length //get number of messages
        expect(msgCount).to.equal(1);
    })

    it("Verify whether hide button replaced with unhide when clicked", async () => {
        await VisibilityPage.openURL() //open url

        let VisibilityPageTitle = await VisibilityPage.page_title.getText();
        expect(VisibilityPageTitle).to.equal('Visibility')// Page Title validation

        await VisibilityPage.hideButton.click() //Click hide button

        expect(await VisibilityPage.hideButton.isDisplayed()).to.be.false; //expecting hide button to be disappeared

        expect(await VisibilityPage.unhideButton.isDisplayed()).to.be.true; //and expecting unhide button to be visible

        //----------------------------------------------------------------------------------------------

        //CSS validation for hidden buttons starts here
        //Uncomment line 54 and 56 to validate the CSS properties of hidden buttons
        
        await VisibilityPage.clickHideButton();
        await VisibilityPage.verifyRemovedButtonDisplayed();
        await VisibilityPage.verifyZeroWidthButtonDisplayed();
        await VisibilityPage.verifyOpacityButtonDisplayed();
        await VisibilityPage.verifyVisibilityHiddenButtonDisplayed();
        await VisibilityPage.verifyDisplayNoneButtonDisplayed();
        await VisibilityPage.verifyOffsetButtonDisplayed();
        const isUnhideButtonDisplayed = await VisibilityPage.verifyUnhideButtonVisible();
        expect(isUnhideButtonDisplayed).to.be(true)
    })

    it("Verify whether button color is changed to RED when clicked", async () => {
        await ClickPage.openURL()
        let clickPageTitle = await ClickPage.page_title.getText()
        expect(clickPageTitle).to.be.equals('Click')
        const colorValue = await ClickPage.buttonColor()
        expect(colorValue).to.be.equal(ClickPage.expectedColor);
    })

    it("Verify whether copy button is copying the exact input value", async () => {

        await Shadowdom.openURL() //open URL

        let shadowDomPageTitle = await Shadowdom.shadowDomPageTitle.getText();
        expect(shadowDomPageTitle).to.equal('Shadow DOM') //Validate Page Title

        await Shadowdom.parentElement.shadow$(Shadowdom.generateBtn).click() //click on generate text

        let textfield = await Shadowdom.parentElement.shadow$(Shadowdom.editField);
        let data_generated = await textfield.getValue() //get text from edit field

        await Shadowdom.parentElement.shadow$(Shadowdom.copyBtn).click() //click on copy button

        await textfield.clearValue() //clear the input box
        await browser.keys(['Control', 'v']); //Paste the copied text

        expect(await textfield.getValue()).to.equal(data_generated) //validating the text generated is not equal to text copied
    })


})