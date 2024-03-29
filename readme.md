# Quote It

Right-click highlighted text on any webpage to quote it. Quotes appear in the sidebar (CTRL+Q to open the sidebar). Quotes can be deleted, highlighted on the page, and copied to the clipboard.

## Prerequisites

- [nodejs v18](https://nodejs.org/en/)

## Quick Overview

```sh
npm install
npm start
```

## Package for addons.mozilla.org

```sh
npm run package
```

### Outputs

- `./addon/web-ext-artifacts/[name][version].zip` - The extension is packaged using the name found in the `./src/manifest.json` and version found in `./package.json`. The output is saved to `./addon/web-ext-artifacts/`.

- `./[name][version].zip` - The sources are packaged next to this readme.md based on the name and version found in `./package.json`.

# Development Guide

You’ll need to have Node v18 or later version on your local development machine to compile the sources. I recommend using the latest LTS version. You can use nvm (macOS/Linux) or nvm-windows to switch Node versions between different projects.

## API Pages

Some [manifest.json](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json) options require an HTML template to render properly. Paths defined in the manifest are relative to `./src/manifest.json` and this build system supports `HTML` and `TSX`.

An HTML page will be compiled from the TSX found in the corresponding src file.

```js
// ./src/manifest.json
...
	"sidebar_action": {
		"default_panel": "sidebar/panel.tsx" // outputs to ./addon/sidebar/panel.html
	},
...
```

## Custom Pages

You can create custom pages from TSX or HTML syntax by placing them in the `./src/pages` directory. TSX assets found here will be compiled; otherwise, assets are copied as-is into the addon. This is useful for creating a homepage, install or uninstall page.

## Debugging

The `npm start` command will open firefox automatically then watch for changes to source files. The extension in the browser will reload as changes are detected. New source files may not be detected by the watcher so you will need to restart the `npm start` process until this is fixed. The start URL is configured in `./package.json`. See `config.start_url`.

CTRL+SHIFT+J in Firefox opens the console log window. `Console.log` messages will show there. You might need to click the gear icon/settings then "Show Content Messages" in the Browser Console window.

# Documentation / Links

- [Mozilla Add-ons JavaScript APIs](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API)
