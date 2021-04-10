<h1 align="center" style="position: relative;">
    <img width="200" src="./extension/images/128px.png"/><br>
    ArabicMsForms
</h1>

<h4 align="center">
    A cross-browser extension to change the display language of Microsoft Forms to Arabic!
</h4>

<p align="center">
	<img alt="GitHub release (latest by date)" src="https://img.shields.io/github/v/release/hadialqattan/arabic-ms-forms-extension">
    <a href="https://deepscan.io/dashboard#view=project&tid=13457&pid=16635&bid=361032"><img src="https://deepscan.io/api/teams/13457/projects/16635/branches/361032/badge/grade.svg" alt="DeepScan grade">
	<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/hadialqattan/arabic-ms-forms-extension">
    <img alt="GitHub" src="https://img.shields.io/github/license/hadialqattan/no-darkreader">
</p>

<p align="center">
    <a href="#installation">Installation</a> •
    <a href="#usage">Usage</a> •
    <a href="#contributing">Contributing</a> •
    <a href="#faq">FAQ</a> •
    <a href="#license">License</a>
</p>

## Installation

- [Google Chrome Extensions WebStore](https://chrome.google.com/webstore/detail/arabicmsforms/ojkgdfdcnecnkndghddcpmdbbdedeocd)
- [Mozilla Firefox Add-ons Store](https://addons.mozilla.org/en-US/firefox/addon/arabicmsforms/)
- [Microsoft Edge Add-ons Store](https://microsoftedge.microsoft.com/addons/detail/arabicmsforms/anfogchmdlmfclgijpaljcnaceiameej)

## Usage

After the installation, the extension will automatically add `lang=ar` to the proper Microsoft Forms' URLs.

To disable the extension from working for a certain amount of time, you only need to press its icon (the icon will appear in black & white), same for re-enabling.

## Contributing

Pull requests are welcome! For larger changes, especially structural ones, please open an issue first to discuss what you would like to change.

If you have a feature request, feel free to [open an issue](https://github.com/hadialqattan/arabic-ms-forms-extension/issues)!

## FAQ

### Why this exists?

My school tests are usually written in Arabic (RTL language) while I prefer to set my browser's language to English (which cause readability issues) while Microsoft Forms doesn't have an easy way to change its language, instead, I have to change the browser's language to change Microsoft Forms language!!!

After searching for a while I found [this official page](https://support.microsoft.com/en-us/office/language-settings-for-microsoft-forms-b282f9aa-0fe4-4290-b1e1-827a8a35ac27) says that I can change the interface language by adding a query param to the URL which is `lang=ar` (in my case), so I've created this extension to do that automatically.

### Why you didn't create a popup panel to choose any language instead of hardcoding the Arabic?

That's why this is open source 😉.

## License

This project is licensed under a [GPLv3](./LICENSE) license.
