# Screamer extension

Funny extension that screams if you spend too much time on selected web-sites

## About

Initially, this extension supposed to be a joking answer to my friend's tweet.
It would use famous Kaspersky Antivirus pig scream, if you spent more than one minute on Twitter page.
But I could not resist the urge to make area of application a little wider.
So, now it allows to set your own time limit, provide list of sites and choose one of 3 sounds (with loop option):

* Antivirus pig scream
* Civil Protection siren
* Digital alarm clock beep

While this extension is still kind of joke, you can use it as a legitimate time saving and digital well-being tool.

## Technical details

This extension uses WebExtension APIs of browsers. 
Initial target browser was Mozilla Firefox, hence the use of browser namespace.
In order to make extension cross-platform, Mozilla's [browser-polyfill.js](https://github.com/mozilla/webextension-polyfill/)  was used.

Elements were styled in accordance with [Photon Design System](https://design.firefox.com/photon/) in order to blend nicely with overall Firefox design. Though during implementation there were some deviations from style guide to make options page look better. Also some observations were made: not every element in Firefox is in sync with style guide anyway.

Final note: actually, I am not too familiar with JavaScript, so code quality might be far from the best.

## Installation

Addon is available at [addons.mozilla.org](https://addons.mozilla.org/en-US/firefox/addon/screamer/) for Firefox.
As for Chrome, you'll need to install extension manually since I don't want to deal with Chrome Extension Store developer fee.
Maybe if my extension was somewhat more useful, I would spend that money, but right now I don't see any reason to do so.

Though, manual installation is quite simple:

1. Download Zip with the latest release
1. Extract it somewhere on your computer
1. Go to [chrome://extensions](chrome://extensions)
1. Enable "Developer mode"
1. Press "Load unpacked" and provide the path to extracted extension
1. Ignore that couple of warnings; it's just Google don't want to know anything about Firefox
1. ??????
1. Have fun
