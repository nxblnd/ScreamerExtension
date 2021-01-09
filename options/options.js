let msInMinute = 60 * 1000;
let defaultSettings = {
    timeLimit: 5 * msInMinute,
    listOfSites: [],
    sound: 'antivirusPig'
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('form').addEventListener('submit', submitOptions);

function submitOptions(e) {
    e.preventDefault();
    saveOptions();
}

function saveOptions() {
    browser.storage.sync.set({
        timeLimit: document.querySelector('#timeLimit').value * msInMinute,
        listOfSites: document.querySelector('#listOfSites').value.match(/\S+/g) || [],
        sound: document.querySelector('input[name="sound"]:checked').id
    });
}

function restoreOptions() {

    function setCurrentChoice(result) {
        if (Object.keys(result).length === 0 && result.constructor === Object) { // if result is empty object
            result = defaultSettings;
        }
        document.querySelector('#timeLimit').value = result.timeLimit / msInMinute;
        document.querySelector('#listOfSites').value = result.listOfSites.join('\n');
        document.querySelector('#' + result.sound).checked = true;
        saveOptions();
    }

    browser.storage.sync.get()
        .then(setCurrentChoice)
        .catch(error => console.log(error));
}