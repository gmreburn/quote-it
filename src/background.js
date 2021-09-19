browser.menus.create({
	id: "save-selection",
	title: browser.i18n.getMessage("menuItemSaveQuote"),
	contexts: ["selection"],
});

browser.menus.onClicked.addListener(function (info, tab) {
	if (info.menuItemId == "save-selection") {
		browser.runtime.sendMessage({ info, tab });
	}
});
