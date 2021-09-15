Go to about:debugging#/runtime/this-firefox
Click Load Temporary Add-on...
Browse for and select the manifest.json in this directory

Select text on a webpage and right click.. see option in menu
CTRL+SHIFT+J opens the console log window. See messages there
You might need to click the gear icon/settings then "Show Content Messages" in the Browser Console window

Reviewer Links to libraries:

- https://github.com/moment/moment/blob/2.29.1/dist/moment.js

Could not find link to tailwind. They allow webpack/npm from what I can tell so either install from npm or use webpack.
POC with webpack here: C:\src\firefox-addons\webpack-demo

---

# Dev notes

output: ./dist
everything in this directory is deleted on `npm run build` from `clean: true,` in webpack.config.js in output section

had to copy \_locales, icons and manifest.json. Had to update paths in manifest. Need to get webpack to handle this.

firefox throws error about no eval() allowed. Need to see how to overcome this.

# Third party libraries that may be useful later:

- [webextension-polyfill](https://www.npmjs.com/package/webextension-polyfill)
- [react-app-polyfill](https://www.npmjs.com/package/react-app-polyfill)
