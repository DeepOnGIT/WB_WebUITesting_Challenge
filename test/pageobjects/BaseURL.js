//Common BaseURL
module.exports = class BaseURL {
    
    //path param to pass path
    open (path) {
        return browser.url(`http://uitestingplayground.com/${path}`)
    }
}
