import { nanoid } from "nanoid";
import QuoteAPI from "./api/QuoteAPI";

browser.menus.create({
	id: "save-selection",
	title: browser.i18n.getMessage("menuItemSaveQuote"),
	contexts: ["selection"],
});

browser.menus.onClicked.addListener(function (info, tab) {
	if (info.menuItemId == "save-selection") {
		console.log("save selection", info, tab);
		QuoteAPI()
			.create(info.selectionText, tab)
			.then((quote) =>
				browser.runtime.sendMessage({ type: "QUOTE_ADDED", quote })
			);
	}
});

browser.browserAction.onClicked.addListener(() => {
	browser.tabs.create({ url: "/pages/home.html" });
});
