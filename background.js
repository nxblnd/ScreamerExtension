let listOfSites = ["https://twitter.com/"];

async function requestOrigins() {
    return browser.permissions.request({
        origins: listOfSites,
        permissions: ["activeTab"]
    });
}

async function registerScript() {
    return browser.contentScripts.register({
        matches: listOfSites,
        js: [{file: "screamer.js"}],
        runAt: "document_idle"
    });
}

async function wireOriginWithScript() {
    let origins = await requestOrigins();
    origins
        .then(registerScript)
        .catch(error => alert(error.message));
}

browser.runtime.onMessage.addListener(wireOriginWithScript);
