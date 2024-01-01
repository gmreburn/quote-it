import QuoteAPI from "./api/QuoteAPI";

browser.menus.create({
	id: "save-selection",
	title: browser.i18n.getMessage("menuItemSaveQuote"),
	contexts: ["selection"],
});

browser.menus.onClicked.addListener(function (info, tab) {
	if (info.menuItemId == "save-selection" && info.selectionText && tab) {
		console.debug("save selection", info, tab);

		const canonical =
			(document.querySelector('link[rel="canonical"]') as HTMLLinkElement)
				?.href || tab?.url;
		if (!canonical) {
			return;
		}

		QuoteAPI.create(canonical, info.selectionText, tab).then((quote) => {
			browser.runtime.sendMessage({
				type: "QUOTE_ADDED",
				quote,
				url: tab?.url,
			});

			browser.notifications
				.create(`${quote.id}-created`, {
					type: "basic",
					title: browser.i18n.getMessage("QuoteAddedTitle"),
					message: browser.i18n.getMessage("QuoteAddedMessage"),
				})
				.then(() =>
					setTimeout(() => {
						browser.notifications.clear(`${quote.id}-created`);
					}, 7000)
				);
		});
	}
});

browser.browserAction.onClicked.addListener(() => {
	browser.tabs.create({ url: "/pages/home.html" });
});