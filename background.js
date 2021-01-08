let listOfSites = ["https://twitter.com/"];
let domains = listOfSites.map(url => new URL(url).hostname);
let timeLimit = 3000;
let audio = new Audio(browser.extension.getURL("soundtest.wav"));
//audio.loop = true;

browser.runtime.onConnect.addListener(connect);

function connect(port) {
    let hostname = new URL(port.sender.url).hostname;
    if (domains.includes(hostname)) {
        port.postMessage({timeLimit: timeLimit});
    }
    port.onMessage.addListener(dispatchAudio);
}

function dispatchAudio(msg) {
    if (msg.audio === "play") {
        audio
            .play()
            .catch(error => console.log(error));
    } else if (msg.audio === "stop") {
        audio.pause();
        audio.currentTime = 0;
    }
}