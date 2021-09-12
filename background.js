browser.menus.create({
	id: "save-selection",
	title: browser.i18n.getMessage("menuItemSaveQuote"),
	contexts: ["selection"],
});

browser.menus.onClicked.addListener(function (info, tab) {
	if (info.menuItemId == "save-selection") {
		const { pageUrl, selectionText } = info;
		const tabUrl = new URL(pageUrl);
		const id = tabUrl.hostname + tabUrl.pathname;
		browser.storage.local
			.get(id)
			.then((storedInfo) => storedInfo[Object.keys(storedInfo)[0]] || [])
			.then((quotes) => {
				const quote = {
					text: selectionText.trim(),
					created: new Date().toISOString(),
				};
				quotes.push(quote);
				let contentToStore = {};
				contentToStore[id] = quotes;
				browser.storage.local.set(contentToStore);

				browser.runtime.sendMessage({ type: "NEW_QUOTE", quote });
			});
	}
});

function found(results) {
	console.log(`There were: ${results.count} matches.`);
	if (results.count > 0) {
		browser.find.highlightResults();
	}
}

browser.find.find("Firefox").then(found);
