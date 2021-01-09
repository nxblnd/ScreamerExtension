const msInMinute = 60 * 1000;
const defaultOptions = {
    timeLimit: 5 * msInMinute,
    listOfSites: [],
    sound: 'antivirusPig',
    loop: true
}
const soundboard = {
    antivirusPig: browser.extension.getURL("soundboard/antivirusPig.ogg"),
    nuclearLaunch: browser.extension.getURL("soundboard/nuclearLaunch.ogg"),
    alarmClock: browser.extension.getURL("soundboard/alarmClock.ogg")
}

let options;
let domains;
let sound;

browser.storage.sync.get()
    .then(applyOptions)
    .then(convertListOfSites)
    .then(loadAudio)
    .catch(error => console.log(error));

browser.runtime.onConnect.addListener(connect);

function connect(port) {
    let hostname = new URL(port.sender.url).hostname;
    if (domains.includes(hostname)) {
        port.postMessage({timeLimit: options.timeLimit});
    }
    port.onMessage.addListener(dispatchAudio);
}

function dispatchAudio(msg) {
    if (msg.audio === "play") {
        sound
            .play()
            .catch(error => console.log(error));
    } else if (msg.audio === "stop") {
        sound.pause();
        sound.currentTime = 0;
    }
}

function applyOptions(loadedOptions) {

    // if result is empty object
    if (Object.keys(loadedOptions).length === 0 && loadedOptions.constructor === Object) {
        options = defaultOptions;
    } else {
        options = loadedOptions;
    }
}

function convertListOfSites() {

    function processUrl(url) {
        try {
            return new URL(url).hostname;
        } catch {
            return url;
        }
    }

    domains = options.listOfSites.map(processUrl)
}

function loadAudio() {
    sound = new Audio(soundboard[options.sound]);
    sound.loop = options.loop;
}