let msInMinute = 60 * 1000;
let defaultSettings = {
    timeLimit: 5 * msInMinute
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);

function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
        timeLimit: document.querySelector("#timeLimit").value * msInMinute
    });
}

function restoreOptions() {

    function setCurrentChoice(result) {
        document.querySelector("#timeLimit").value = result.timeLimit / msInMinute ||
                                                             defaultSettings.timeLimit / msInMinute;
    }

    function onError(error) {
        console.log(error);
    }

    let load = browser.storage.sync.get("timeLimit");
    load.then(setCurrentChoice, onError);
}