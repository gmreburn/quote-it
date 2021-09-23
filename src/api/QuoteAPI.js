function QuoteAPI(uri) {
	const pageId = uri && new URL(uri).hostname + new URL(uri).pathname;
	return {
		get: function () {
			return browser.storage.local
				.get(pageId)
				.then((storedInfo) =>
					[].concat(
						...Object.keys(storedInfo).map((key) =>
							storedInfo[key].map((quote) => Object.assign(quote, { url: key }))
						)
					)
				);
		},
		create: function (quote) {
			return this.get(pageId).then((quotes) => {
				quotes.push(quote);
				browser.storage.local.set({ [pageId]: quotes });
				return quotes;
			});
		},
		delete: function (id) {
			return this.get(pageId).then((quotes) => {
				let contentToStore = {
					[pageId]: quotes.filter((q) => !(id == q.id)),
				};
				browser.storage.local.set(contentToStore);
				return contentToStore[pageId];
			});
		},
	};
}

export default QuoteAPI;
