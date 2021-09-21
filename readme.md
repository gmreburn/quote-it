# Quote It

Select text on a webpage and right click then select save quote. Quote should apear in the sidebar (CTRL+Q) to open sidebar. Quotes can be deleted, highlighted and copied to clipboard.

## Prerequisites

- [nodejs v14](https://nodejs.org/en/)

## Quick Overview

```sh
npm install
npm start
```

## Package for addons.mozilla.org

```sh
npm run pack
```

The extension will be packaged as a zip file using the name and version found in the `./src/manifest.json`. The output is saved to `./addon/web-ext-artifacts/`

## Permission Descriptions

| Permission      | Used for                                      |
| --------------- | --------------------------------------------- |
| "menus"         | Right click to save quote on any webpage      |
| "tabs"          |                                               |
| "notifications" | Inform user when a request has been completed |
| "find"          | Highlight quotes on webpages                  |
| "activeTab"     |                                               |
| "<all_urls>"    |                                               |

# Development Guide

You’ll need to have Node 14.0.0 or later version on your local development machine. We recommend using the latest LTS version. You can use nvm (macOS/Linux) or nvm-windows to switch Node versions between different projects.

## Getting Started Immediately

You **don’t** need to install or configure tools like webpack or Babel.<br>
They are preconfigured and hidden so that you can focus on the code.

## API Pages

Some [manifest.json](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json) options require an HTML template to render properly. Paths defined in the manifest are relative to `./src/manifest.json`. and this boilerplate supports `HTML` and `JSX`.

An HTML page will be created from the JSX found in the corresponding src file.

```js
// ./src/manifest.json
...
	"sidebar_action": {
		"default_panel": "sidebar/panel.jsx"
		// other properties
	},
...
```

## Custom Pages

You can create custom pages from JSX or HTML syntax by placing them in the `./src/pages` directory. Assets found here will be compiled if JSX; otherwise, copied as-is into the addon.

## Debugging

The `npm start` command will automatically open firefox and watch for changes to source files. The extension in the browser will be reloaded when changes are detected. New source files may not be detected by the watcher so you will need to restart the `npm start` process until this is fixed.

CTRL+SHIFT+J in Firefox opens the console log window. `Console.log` messages will show there. You might need to click the gear icon/settings then "Show Content Messages" in the Browser Console window.

# Documentation / Links

- [Mozilla Add-ons JavaScript APIs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API)
- [citation-js (or something similiar) might be good for pulling/formatting metadata](https://www.npmjs.com/package/citation-js)
