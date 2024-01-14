import QuoteAPI from "./api/QuoteAPI";
import { QueryClient } from "@tanstack/react-query";

try {
	const queryClient = new QueryClient();

	// Make the queryClient accessible to other scripts or contexts
	window.queryClient = queryClient;

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
				let url = tab.url;
				try {
					url = await browser.tabs.sendMessage(tab.id, {
						action: "getCanonicalURL",
					});
				} catch {
					url = tab.url;
				}

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
			console.error(error);
		}
	});

	browser.browserAction.onClicked.addListener(() => {
		browser.tabs.create({ url: "/pages/home.html" });
	});
} catch (e) {
	console.error(e);
}
