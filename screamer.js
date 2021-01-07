console.log("screamer");

let background = browser.runtime.connect({name: "content script"});
background.onMessage.addListener(timer);

function timer() {

}