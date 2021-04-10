// Constants.
const langParam = "lang=";
const arLangParam = `${langParam}ar`;
const manifestPath = "../manifest.json";

// Global variables.
var isActive = true;
var contentScriptPath = "";
var urlPatterns = [];

// Load data from `manifest.json`
fetch(manifestPath)
  .then((res) => res.text())
  .then((data) => {
    let contentScriptJson = JSON.parse(data)["content_scripts"][0];
    patterns = contentScriptJson["matches"];
    contentFilePath = contentScriptJson["js"][0];
  });

/*
  --- --- --- --- Change URL lang to AR --- --- --- ---
*/

// Return url contains `lang=ar` based on the current url.
const getArUrl = (currentUrl) => {
  if (currentUrl.search(arLangParam) < 0) {
    let langParamIndex = currentUrl.search(langParam);
    if (langParamIndex > -1) {
      let currentLangParam = currentUrl.substr(
        langParamIndex,
        langParam.length + 2
      );
      return currentUrl.replace(currentLangParam, arLangParam); // replace `lang=xx` with `lang-ar`
    } else {
      return `${currentUrl}&${arLangParam}`; // add `lang=ar`
    }
  } else {
    return currentUrl; // already has `lang=ar`.
  }
};

// `chrome.runtime.sendMessage("changeLangToAr");` event listener.
chrome.runtime.onMessage.addListener((msg) => {
  // BnW icon (disabled by clicking the icon).
  if (!isActive) return null;
  // Replace current tab URL with Arabic one.
  if (msg == "changeLangToAr") {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      let currentTab = tabs[0];
      let arUrl = getArUrl(currentTab.url);
      if (arUrl != currentTab.url) {
        chrome.tabs.update(currentTab.id, { url: arUrl });
      }
    });
  }
});

/*
  --- --- --- Manage extension state (disable/enable) --- --- ---
*/

// Inverte the state: (enabled ~> disabled) and vice versa.
const stateInversion = () => {
  if (isActive) {
    chrome.browserAction.setIcon({ path: "images/16px_bnw.png" });
  } else {
    chrome.browserAction.setIcon({ path: "images/16px.png" });
  }
  isActive = !isActive;
};

// Run `content.js` script when the extension activated.
const runContentScript = (currentUrl) => {
  // Not active ~> no need to check the URL.
  if (!isActive) return null;
  // Run `content.js` if currentUrl match.
  for (let pattern of patterns) {
    if (currentUrl.search(pattern.replace("*", "")) > -1) {
      chrome.tabs.executeScript({ file: contentScriptPath });
      break;
    }
  }
};

// Extension icon onClick event listener.
chrome.browserAction.onClicked.addListener((tab) => {
  stateInversion();
  runContentScript();
});
