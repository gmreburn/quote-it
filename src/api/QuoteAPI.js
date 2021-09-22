function QuoteAPI() {
	const get = (id) => {
		return browser.storage.local
			.get(id)
			.then((storedInfo) =>
				[].concat(
					...Object.keys(storedInfo).map((key) =>
						storedInfo[key].map((quote) => Object.assign(quote, { url: key }))
					)
				)
			);
	};

	return { get };
}

export default QuoteAPI;
