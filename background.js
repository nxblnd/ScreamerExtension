let listOfSites = ["https://twitter.com/"];
let domains = listOfSites.map(url => new URL(url).hostname);
let timeLimit = 1;

browser.runtime.onConnect.addListener(connect);

function connect(port) {
    let hostname = new URL(port.sender.url).hostname;
    if (domains.includes(hostname)) {
        port.postMessage({timeLimit: timeLimit});
    }
    port.onMessage.addListener(() => {
        let audio = new Audio(browser.extension.getURL("soundtest.wav"));
        audio.play();
    })
}