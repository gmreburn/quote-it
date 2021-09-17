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

# How to debug

- Go to about:debugging#/runtime/this-firefox
- Click Load Temporary Add-on...
- Browse for and select the manifest.json in this directory

CTRL+SHIFT+J opens the console log window. `Console.log` messages will show there.
You might need to click the gear icon/settings then "Show Content Messages" in the Browser Console window