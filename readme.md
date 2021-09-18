# Quote It

Select text on a webpage and right click then select save quote. Quote should apear in the sidebar (CTRL+Q) to open sidebar. Quotes can be deleted, highlighted and copied to clipboard.

# Dev Guide

## Prerequisites

- [nodejs v14](https://nodejs.org/en/)

## Getting started

```
# npm install && npm run build
```

output: ./dist
Zip this directory and upload to addons.mozilla.org

Everything in this directory is deleted on `npm run build` from `clean: true` in webpack.config.js in output section.

## API Pages

Some [manifest.json](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json) options require an HTML template to render properly. Paths defined in the manifest are relative to `./src/manifest.json` and can be HTML or JSX.

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

You can create custom pages from JSX or HTML syntax by placing them in the `./src/pages` directory. Assets found here will be compiled if JSX; otherwise, copied as-is.

# How to debug

- Go to about:debugging#/runtime/this-firefox
- Click Load Temporary Add-on...
- Browse for and select the manifest.json in this directory

CTRL+SHIFT+J opens the console log window. `Console.log` messages will show there.
You might need to click the gear icon/settings then "Show Content Messages" in the Browser Console window

# Documentation / Links

- [Mozilla Add-ons JavaScript APIs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API)
- [Load extension for development](about:debugging#/runtime/this-firefox)
- [React-Extension-Boilerplate](https://github.com/WebExp0528/React-Extension-Boilerplate) Not maintained well but good reference. npm audit shows several violations.
