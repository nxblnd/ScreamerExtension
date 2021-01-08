let msInMinute = 60 * 1000;
let defaultSettings = {
    timeLimit: 5 * msInMinute,
    listOfSites: [],
    id: 'antivirusPig'
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('form').addEventListener('submit', saveOptions);

function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
        timeLimit: document.querySelector('#timeLimit').value * msInMinute,
        listOfSites: document.querySelector('#listOfSites').value.match(/\S+/g),
        sound: document.querySelector('input[name="sound"]:checked').id
    });
}

function restoreOptions() {

    function setCurrentChoice(result) {
        if (Object.keys(result).length === 0 && result.constructor === Object) { // if result is empty object
            result = defaultSettings;
        }
        document.querySelector('#timeLimit').value = result.timeLimit / msInMinute;
        document.querySelector('#listOfSites').value = result.listOfSites.join('\n') || [];
        document.querySelector('#' + result.id).checked = true;
    }

    function onError(error) {
        console.log(error);
    }

    let load = browser.storage.sync.get();
    load.then(setCurrentChoice, onError);
}