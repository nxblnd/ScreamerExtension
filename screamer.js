console.log("screamer");

let background = browser.runtime.connect({name: 'content script'});
background.onMessage.addListener(timer);

let currentTime = 0;

function timer(msg) {
    setTimeout(() => console.log('timeout'), msg.timeLimit);
    background.postMessage();
    // let audio = new Audio(browser.extension.getURL("note.mp3"));
    // audio.play();
}
