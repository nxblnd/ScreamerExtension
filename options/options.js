const msInMinute = 60 * 1000;

let background = browser.runtime.connect({name: 'options script'});

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('form').addEventListener('submit', submitOptions);

function submitOptions(e) {
    e.preventDefault();
    saveOptions();
}

function saveOptions() {
    let options = updateOptions();
    browser.storage.sync.set(options);
}

function updateOptions() {
    options = {
        timeLimit: document.querySelector('#timeLimit').value * msInMinute,
        listOfSites: document.querySelector('#listOfSites').value.match(/\S+/g) || [],
        sound: document.querySelector('input[name="sound"]:checked').id,
        loop: document.querySelector('#loop').checked
    }
    background.postMessage({type: 'set', options: options});
    return options;
}

function restoreOptions() {

    function setCurrentChoice(options) {
        document.querySelector('#timeLimit').value = options.timeLimit / msInMinute;
        document.querySelector('#listOfSites').value = options.listOfSites.join('\n');
        document.querySelector('#' + options.sound).checked = true;
        document.querySelector('#loop').checked = options.loop;
    }

    background.postMessage({type: 'get'});
    background.onMessage.addListener(setCurrentChoice);
}