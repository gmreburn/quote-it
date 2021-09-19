Object.assign(
	{ title: document.title },
	Array.from(
		document.querySelectorAll('script[type="application/ld+json"]')
	).reduce(function (previousValue, currentValue) {
		return Object.assign(
			{},
			previousValue,
			...JSON.parse(currentValue.innerText)
		);
	}, null),
	Array.from(document.head.querySelectorAll("meta")).reduce(
		(previousValue, currentValue) =>
			Object.assign({}, previousValue, {
				[currentValue.name]: currentValue.content,
			})
	)["og:title"]
);
