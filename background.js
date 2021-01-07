let listOfSites = ["https://twitter.com/"];

browser.runtime.onConnect.addListener(connect);

function connect(port) {
    console.log(port.sender.url);
}