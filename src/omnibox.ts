import QuoteAPI from "./api/QuoteAPI";
const api = QuoteAPI();
const quotes: Quote[] = [];
let promise: Promise<number | void>;

browser.omnibox.onInputStarted.addListener(() => {
	promise = api.get().then((q) => quotes.push(...q));
});

browser.omnibox.onInputCancelled.addListener(() => {
	quotes.length = 0;
});

browser.omnibox.setDefaultSuggestion({
	description: "Start typing to find a quote.",
});

browser.omnibox.onInputChanged.addListener((input, suggest) => {
	promise.then(() => {
		const suggestions = quotes
			.filter((quote) => quote.text.toLowerCase().includes(input.toLowerCase()))
			.map((quote) => ({
				content: quote.url,
				description: quote.text,
			}))
			.slice(0, 5);
		suggest(suggestions);
	});
});

browser.omnibox.onInputEntered.addListener((url, disposition) => {
	switch (disposition) {
		case "currentTab":
			browser.tabs.update({ url });
			break;
		case "newForegroundTab":
			browser.tabs.create({ url });
			break;
		case "newBackgroundTab":
			browser.tabs.create({ url, active: false });
			break;
	}
});
