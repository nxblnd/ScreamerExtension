const msInMinute = 60 * 1000;
const defaultOptions = {
    timeLimit: 5 * msInMinute,
    listOfSites: [],
    sound: 'antivirusPig',
    loop: true,
    onActive: true,
}
const soundboard = {
    antivirusPig: browser.runtime.getURL("resources/soundboard/antivirusPig.ogg"),
    civilProtection: browser.runtime.getURL("resources/soundboard/civilProtection.ogg"),
    alarmClock: browser.runtime.getURL("resources/soundboard/alarmClock.ogg")
}

let options;
let domains;
let sound;
let contentPorts = [];

browser.storage.sync.get()
    .then(setUp)
    .catch(error => console.log(error));

browser.runtime.onConnect.addListener(dispatchPort);

function dispatchPort(port) {
    if (port.name === 'content script') {
        contentScript(port);
    } else if (port.name === 'options script') {
        optionsScript(port);
    }
}

function contentScript(port) {
    contentPorts[port.sender.tab.id] = port;
    callContentScript(port);
}

function callContentScript(port) {
    let hostname = trimWWW(new URL(port.sender.url).hostname);
    if (domains.includes(hostname)) {
        port.postMessage({timeLimit: options.timeLimit});
        port.onMessage.addListener(dispatchAudio);
    }
}

function trimWWW(hostname) {
    return hostname.replace(/^www./g, '');
}

function optionsScript(port) {

    function respond(msg) {
        if (msg.type === 'get') {
            port.postMessage(options);
        } else if (msg.type === 'set') {
            options = msg.options;
            setUp(options);
        }
    }

    port.onMessage.addListener(respond);
}

function setUp(options) {
    applyOptions(options);
    convertListOfSites();
    loadAudio();
    contentPorts.forEach(port => callContentScript(port));
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

function applyOptions(newOptions) {

    // if result is empty object
    if (Object.keys(newOptions).length === 0 && newOptions.constructor === Object) {
        options = defaultOptions;
    } else {
        options = newOptions;
    }
}

function convertListOfSites() {

    function processUrl(url) {
        try {
            return trimWWW(new URL(url).hostname);
        } catch {
            return trimWWW(url);
        }
    }

    domains = options.listOfSites.map(processUrl)
}

function loadAudio() {
    sound = new Audio(soundboard[options.sound]);
    sound.loop = options.loop;
}
