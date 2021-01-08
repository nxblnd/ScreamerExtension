let background = browser.runtime.connect({name: 'content script'});
background.onMessage.addListener(setTimer);

let timer;

function setTimer(msg) {
    timer = setTimeout(
        () => {background.postMessage({audio: "play"})},
        msg.timeLimit);
}
