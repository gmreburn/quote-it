import QuoteAPI from "./api/QuoteAPI";
import getIdToken from "./util/auth";

browser.menus.create({
	id: "save-selection",
	title: browser.i18n.getMessage("menuItemSaveQuote"),
	contexts: ["selection"],
});

browser.menus.onClicked.addListener(function (info, tab) {
	if (info.menuItemId == "save-selection") {
		console.debug("save selection", info, tab);
		const [localPromise, remotePromise] = QuoteAPI().create(
			info.selectionText,
			tab
		);

		localPromise.then((quote) => {
			browser.runtime.sendMessage({ type: "QUOTE_ADDED", quote });

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

		remotePromise.then((quote) => {
			browser.runtime.sendMessage({ type: "QUOTE_UPDATED", quote });
		});

		// TODO: catch remotePromise.error and update local storage so we know to try to sync it later..
	}
});

browser.browserAction.onClicked.addListener(() => {
	getIdToken().then(console.log);
	browser.tabs.create({ url: "/pages/home.html" });
});
