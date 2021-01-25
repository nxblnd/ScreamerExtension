let background = browser.runtime.connect({name: 'content script'});
background.onMessage.addListener(initTimer);

function initTimer(msg) {

    let timer;

    function setTimer() {
        if (msg.onActive === false || document.visibilityState === 'visible') {
            timer = setTimeout(
                () => {background.postMessage({audio: "play"})},
                msg.timeLimit);
        } else {
            background.postMessage({audio: "stop"});
            clearTimeout(timer);
        }
    }

    setTimer();
    document.addEventListener("visibilitychange", setTimer);
}


