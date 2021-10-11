function LocalQuoteAPI() {
	return {
		saveHighlighterColor: function (quote, color) {
			return this.get(quote.tab.url).then((quotes) => {
				const pageId = this.getPageId(quote.tab.url);
				const updatedQuotes = quotes.map((q) => {
					if (q.id === quote.id) {
						q.highlighter = Object.assign({}, q.highlighter, {
							color,
							created: q.highlighter?.created || new Date().toISOString(),
							updated: new Date().toISOString(),
						});
					}
					return q;
				});

				return browser.storage.local
					.set({ [pageId]: updatedQuotes })
					.then(() => {
						return {
							quotes: updatedQuotes,
							quote: updatedQuotes.find((q) => q.id === quote.id),
						};
					});
			});
		},
		saveAnnotation: function (quote, annotationText) {
			return this.get(quote.tab.url).then((quotes) => {
				const pageId = this.getPageId(quote.tab.url);
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

				return browser.storage.local
					.set({ [pageId]: updatedQuotes })
					.then(() => {
						return {
							quotes: updatedQuotes,
							quote: updatedQuotes.find((q) => q.id === quote.id),
						};
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
			console.debug("api get (local)", url);
			// var redirectURL = browser.identity.getRedirectURL(); // https://12d89ac9b7b8e7cfef393b3a1d101555db9f0fed.extensions.allizom.org/
			// https://quote-it.auth.us-east-1.amazoncognito.com/oauth2/authorize
			if (url) {
				return browser.storage.local
					.get(this.getPageId(url))
					.then((storedInfo) =>
						[].concat(
							...Object.keys(storedInfo).map((key) =>
								storedInfo[key].map((quote) =>
									Object.assign(quote, { url: key })
								)
							)
						)
					)
					.then((quotes) =>
						// Backward compatibility: Map quote to new format
						quotes.map((quote) => {
							if (!quote.tab) {
								quote.tab = { url: `http://${quote.url}` };
							}
							return quote;
						})
					);
			}
		},
		create: function (id, quoteText, tab) {
			console.debug("api create (local)", quoteText);

			if (quoteText && tab && tab.url) {
				const pageId = this.getPageId(tab.url);
				const quote = {
					id,
					text: quoteText.trim(),
					created: new Date().toISOString(),
					synced: false,
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
			console.debug("api delete (local)", quote);
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
		replace: function (id, quote) {
			return this.get(quote.tab.url).then((quotes) => {
				const pageId = this.getPageId(quote.tab.url);
				const updatedQuotes = quotes.map((q) => {
					if (q.id === id) {
						return quote;
					}
					return q;
				});

				return browser.storage.local
					.set({ [pageId]: updatedQuotes })
					.then(() => quote);
			});
		},
	};
}

export default LocalQuoteAPI;
