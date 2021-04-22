const state = {
  isActive: true,
}
const props = {
  lang: 'ar',
  icons: {
    enabled: 'icon16.png',
    disabled: 'icon16_bnw.png',
  },
}
const manifest = {
  path: './manifest.json',
  contentScript: {
    path: '',
    pattern: '',
  },
}

fetch(manifest.path)
  .then((res) => res.text())
  .then((data) => {
    let contentScriptJson = JSON.parse(data)['content_scripts'][0]
    manifest.contentScript.path = contentScriptJson['js'][0]
    manifest.contentScript.pattern = contentScriptJson['matches'][0]
  })

const toggleIcon = () => {
  state.isActive = !state.isActive
  let iconPath = state.isActive ? props.icons.enabled : props.icons.disabled
  chrome.browserAction.setIcon({ path: iconPath })
}

const runContentScript = (currentUrl) => {
  let pattern = manifest.contentScript.pattern.replace('*', '')
  let isMatch = currentUrl.search(pattern) > -1
  if (isMatch) {
    chrome.tabs.executeScript({ file: manifest.contentScript.path })
  }
}

const getCurrentTab = () => {
  return new Promise((resolve, reject) => {
    try {
      chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        resolve(tabs[0])
      })
    } catch (e) {
      reject(e)
    }
  })
}

// Handle extension icon click event.
chrome.browserAction.onClicked.addListener((_) => {
  toggleIcon()
  if (state.isActive) {
    getCurrentTab().then((currentTab) => {
      runContentScript(currentTab.url)
    })
  }
})

// Handle message sending event (sent from `content.js`).
chrome.runtime.onMessage.addListener((_) => {
  if (state.isActive) {
    getCurrentTab().then((currentTab) => {
      let currentUrl = new URL(currentTab.url)
      let queryParams = currentUrl.searchParams
      if (queryParams.get('lang') != props.lang) {
        queryParams.set('lang', props.lang)
        chrome.tabs.update(currentTab.id, { url: currentUrl.toString() })
      }
    })
  }
})
