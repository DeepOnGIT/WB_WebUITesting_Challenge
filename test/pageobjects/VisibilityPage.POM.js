const BaseURL = require("./BaseURL");

const PAGE_TITLE = '//h3'
const HIDE_BTN = '#hideButton' // Find Hide button by xpath
const UNHIDE_BTN = '#unhideButton' //unhide button
const REMOVED_BTN = 'button#removedButton' //removed button
const XERO_W_BTN = 'button#zeroWidthButton'
const OVERLAP_BTN = 'button#overlappedButton'
const OVERLAP_BTN2 = 'div#hidingLayer'
const OPACITY_BTN = 'button#transparentButton'
const INVISIBLE_HIDE_BTN = 'button#invisibleButton'
const NOT_DISPLAY_BUTTON = 'button#notdisplayedButton'
const OFFSCREEN_BTN = 'button#offscreenButton'

class VisibilityPage extends BaseURL {

    //Overwriting open with subpath /ajax
    async openURL() {
        await browser.maximizeWindow() //Maximize window
        return super.open('visibility')
    }

    get page_title() {
        return $(PAGE_TITLE)
    }

    //Hide button
    get hideButton() {
        return $(HIDE_BTN)
    }

    get unhideButton() {
        return $(UNHIDE_BTN)
    }

    get removedButton() {
        return $(REMOVED_BTN)
    }

    get zeroWidthButton() {
        return $(XERO_W_BTN)
    }

    get overlappedButton() {
        return $(OVERLAP_BTN)
    }
    get otherOverLap_btn() {
        return $(OVERLAP_BTN2)
    }

    get opacityButton() {
        return $(OPACITY_BTN)
    }

    get invisibleButton() {
        return $(INVISIBLE_HIDE_BTN)
    }

    get notdisplayedButton() {
        return $(NOT_DISPLAY_BUTTON)
    }

    get offscreenButton() {
        return $(OFFSCREEN_BTN)
    }

    async clickHideButton() {
        await this.hideButton.click();
        await browser.pause(5000);
    }

    async verifyButtonsVisibility() {
        const webButton = [
            this.removedButton,
            this.zeroWidthButton,
            this.overlappedButton,
            this.opacityButton,
            this.invisibleButton,
            this.notdisplayedButton,
            this.offscreenButton
        ];
        let ButtonVisibilityOn;
        for (const button of webButton) {
            ButtonVisibilityOn = await button.isDisplayed();
        }
    }

    async verifyUnhideButtonVisible() {
        return await this.unhideButton.waitForDisplayed();
    }

    async verifyRemovedButtonDisplayed() {
        expect(await $('button#removedButton').isExisting()).toBe(false);
    }

    async verifyZeroWidthButtonDisplayed() {
        const elementWidth = await (await this.zeroWidthButton).getCSSProperty('width');
        // Assert that the width of the element is zero after clicking on hide button
        expect(elementWidth.value).toBe('0px');
    }

    async verifyOpacityButtonDisplayed() {
        const elementOpacity = await (await this.opacityButton).getCSSProperty('opacity');
        // Assert that the opacity of the element is zero after clicking on hide button
        expect(elementOpacity.value).toBe(0);
    }

    async verifyVisibilityHiddenButtonDisplayed() {
        const elementHidden = await (await this.invisibleButton).getCSSProperty('visibility');
        expect(elementHidden.value).toBe('hidden');
    }

    async verifyDisplayNoneButtonDisplayed() {
        const elementDisplay = await (await this.notdisplayedButton).getCSSProperty('display');
        expect(elementDisplay.value).toBe('none');
    }

    async verifyOffsetButtonDisplayed() {
        const leftValue = await (await this.offscreenButton).getCSSProperty('left');
        const rightValue = await (await this.offscreenButton).getCSSProperty('right');
        const topValue = await (await this.offscreenButton).getCSSProperty('top');
        const bottomValue = await (await this.offscreenButton).getCSSProperty('bottom');
        expect(leftValue.value).toBe('-9999px');
        expect(rightValue.value).toBe('11441.8px');
        expect(topValue.value).toBe('-9999px');
        expect(bottomValue.value).toBe('10661.4px');
    }
}

module.exports = new VisibilityPage();