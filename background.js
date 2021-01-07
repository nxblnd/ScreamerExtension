let listOfSites = ["https://twitter.com/"];

browser.runtime.onConnect.addListener(connect);

function connect(port) {
    let url = new URL(port.sender.url);
    console.log(url.hostname);
}