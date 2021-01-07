let listOfSites = ["https://twitter.com/"];
let domains = listOfSites.map(url => new URL(url).hostname);

browser.runtime.onConnect.addListener(connect);

function connect(port) {
    let hostname = new URL(port.sender.url).hostname;
    if (domains.includes(hostname)) {
        port.postMessage();
    }
}