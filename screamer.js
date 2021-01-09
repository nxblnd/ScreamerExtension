let background = browser.runtime.connect({name: 'content script'});
background.onMessage.addListener(setTimer);

function setTimer(msg) {

    let timer;

    function visibilityCheck() {
        if (document.visibilityState === 'visible') {
            timer = setTimeout(
                () => {background.postMessage({audio: "play"})},
                msg.timeLimit);
        } else {
            background.postMessage({audio: "stop"});
            clearTimeout(timer);
        }
    }

    visibilityCheck();
    document.addEventListener("visibilitychange", visibilityCheck);
}


