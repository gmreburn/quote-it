Object.assign(
	{ title: document.title },
	Array.from(
		document.querySelectorAll('script[type="application/ld+json"]')
	).reduce(function (previousValue, currentValue) {
		try {
			return Object.assign(
				{},
				previousValue,
				...JSON.parse(currentValue.innerText)
			);
		} catch (error) {
			return previousValue;
		}
	}, null),
	Array.from(document.head.querySelectorAll("meta")).reduce(
		(previousValue, currentValue) => {
			try {
				return Object.assign({}, previousValue, {
					[currentValue.name]: currentValue.content,
				});
			} catch (error) {
				return previousValue;
			}
		}
	)["og:title"]
);
