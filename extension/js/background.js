const langParam = "lang=";
const arLangParam = langParam + "ar";
const manifestFilePath = "../manifest.json";

var isActive = true,
  contentFilePath = "",
  patterns = [];

fetch(manifestFilePath)
  .then((response) => response.text())
  .then((data) => {
    let contentScriptJson = JSON.parse(data)["content_scripts"][0];
    patterns = contentScriptJson["matches"];
    contentFilePath = contentScriptJson["js"][0];
  });

function changeLangToAr(currentUrl) {
  if (currentUrl.search(arLangParam) < 0) {
    let langParamIndex = currentUrl.search(langParam);
    if (langParamIndex > -1) {
      let currentLangParam = currentUrl.substr(
        langParamIndex,
        langParam.length + 2
      );
      return currentUrl.replace(currentLangParam, arLangParam);
    } else {
      return currentUrl + "&" + arLangParam;
    }
  }
  return currentUrl; // no change.
}

chrome.runtime.onMessage.addListener((message) => {
  if (!isActive) {
    return null;
  }
  if (message == "changeLangToAr") {
    chrome.tabs.getSelected(null, (tab) => {
      let arUrl = changeLangToAr(tab.url);
      if (arUrl != tab.url) {
        chrome.tabs.update(tab.id, { url: arUrl });
      }
    });
  }
});

function changeIconByState() {
  if (isActive) {
    chrome.browserAction.setIcon({ path: "images/16px_bnw.png" });
  } else {
    chrome.browserAction.setIcon({ path: "images/16px.png" });
  }
  isActive = !isActive;
}

function reRunContentScript(currentUrl) {
  if (!isActive) {
    return null;
  }
  for (pattern of patterns) {
    if (currentUrl.search(pattern.replace("*", "")) > -1) {
      chrome.tabs.executeScript({ file: contentFilePath });
      break;
    }
  }
}

chrome.browserAction.onClicked.addListener((tab) => {
  changeIconByState();
  reRunContentScript(tab.url);
});
