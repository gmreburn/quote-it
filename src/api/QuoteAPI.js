import { nanoid } from "nanoid";

function QuoteAPI() {
	return {
		saveAnnotation: function (quote, annotationText) {
			return this.get(quote.tab.url).then((quotes) => {
				const pageId = this.getPageId(quote.tab.url);
				quotes.find;
				const updatedQuotes = quotes.map((q) => {
					if (q.id === quote.id) {
						q.annotation = Object.assign({}, q.annotation, {
							text: annotationText,
							created: q.annotation?.created || new Date().toISOString(),
							updated: new Date().toISOString(),
						});
					}
					return q;
				});
				console.log("updatedq", updatedQuotes);
				return browser.storage.local
					.set({ [pageId]: updatedQuotes })
					.then(() => {
						return updatedQuotes;
					});
			});
		},
		getPageId: function (uri) {
			if (uri) {
				const url = new URL(uri);
				return url.hostname + url.pathname;
			}
		},
		get: function (url) {
			console.log("api get", url);
			return browser.storage.local
				.get(this.getPageId(url))
				.then((storedInfo) =>
					[].concat(
						...Object.keys(storedInfo).map((key) =>
							storedInfo[key].map((quote) => Object.assign(quote, { url: key }))
						)
					)
				)
				.then((quotes) => {
					console.log("quotes", this.getPageId(url), quotes);
					return quotes;
				});
		},
		create: function (quoteText, tab) {
			console.log("api create", quoteText);
			if (quoteText && tab && tab.url) {
				const pageId = this.getPageId(tab.url);
				const quote = {
					id: nanoid(),
					text: quoteText.trim(),
					created: new Date().toISOString(),
					tab,
				};
				return this.get(tab.url).then((quotes) => {
					quotes.push(quote);
					return browser.storage.local.set({ [pageId]: quotes }).then(() => {
						return quote;
					});
				});
			} else {
				throw "Invalid parameters. E4892";
			}
		},
		delete: function (quote) {
			console.log("api delete", quote);
			if (quote && quote.id && quote.tab && quote.tab.url) {
				const key = this.getPageId(quote.tab.url);
				return this.get(quote.tab.url).then((quotes) => {
					let contentToStore = {
						[key]: quotes.filter((q) => !(quote.id == q.id)),
					};
					browser.storage.local.set(contentToStore);
					return contentToStore[key];
				});
			} else {
				throw "Invalid parameters. E4894";
			}
		},
	};
}

export default QuoteAPI;
