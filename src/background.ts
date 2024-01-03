import QuoteAPI from "./api/QuoteAPI";

try {
	browser.menus.create({
		id: "save-selection",
		title: browser.i18n.getMessage("menuItemSaveQuote"),
		contexts: ["selection"],
	});

	browser.menus.onClicked.addListener(async function (info, tab) {
		try {
			if (
				info.menuItemId == "save-selection" &&
				info.selectionText &&
				tab &&
				tab.id
			) {
				// Use tabs.sendMessage to communicate with content scripts
				const url = await browser.tabs.sendMessage(tab.id, {
					action: "getCanonicalURL",
				});

				if (url) {
					const quote = await QuoteAPI.create(url, info.selectionText, tab);

					browser.runtime.sendMessage({
						type: "QUOTE_ADDED",
						quote,
						url,
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
				} else {
					console.error("No URL found for the active tab.");
				}
			} else {
				console.error("No active tab found.");
			}
		} catch (error) {
			console.error("Error:", error);
		}
	});

	browser.browserAction.onClicked.addListener(() => {
		browser.tabs.create({ url: "/pages/home.html" });
	});
} catch (e) {
	console.error("gmr", e);
}
