"use strict";

browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request.action === "getCanonicalURL") {
		const canonicalElement = document.querySelector('link[rel="canonical"]');
		const canonicalURL = canonicalElement?.getAttribute("href") || document.URL;
		sendResponse(canonicalURL);
		return Promise.resolve(canonicalURL);
	}
	return Promise.resolve();
});
