import getAccessToken from "../util/auth";

function RemoteQuoteAPI(
	API_ADDR = "http://127.0.0.1:3000" // "https://t17g6r07c6.execute-api.us-east-1.amazonaws.com/v1"
) {
	return {
		saveHighlighterColor: function (quote, color) {
			return getAccessToken().then((accessToken) => {
				return fetch(
					`${API_ADDR}/quotes/${encodeURIComponent(quote.tab.url)}`,
					{
						method: "PATCH",
						mode: "cors",
						cache: "no-cache",
						credentials: "same-origin",
						headers: {
							"Content-Type": "application/json",
							Authorization: accessToken,
						},
						referrerPolicy: "no-referrer",
						body: JSON.stringify({ highlighter: color }),
					}
				).then((response) => response.json());
			});
		},
		saveAnnotation: function (quote, annotationText) {
			return getAccessToken().then((accessToken) => {
				return fetch(
					`${API_ADDR}/quotes/${encodeURIComponent(quote.tab.url)}`,
					{
						method: "PATCH",
						mode: "cors",
						cache: "no-cache",
						credentials: "same-origin",
						headers: {
							"Content-Type": "application/json",
							Authorization: accessToken,
						},
						referrerPolicy: "no-referrer",
						body: JSON.stringify({ annotationText }),
					}
				).then((response) => response.json());
			});
		},
		get: function (url) {
			console.debug("api get (remote)", url);
			// var redirectURL = browser.identity.getRedirectURL(); // https://12d89ac9b7b8e7cfef393b3a1d101555db9f0fed.extensions.allizom.org/
			// https://quote-it.auth.us-east-1.amazoncognito.com/oauth2/authorize

			return getAccessToken().then((accessToken) => {
				return fetch(`${API_ADDR}/quotes/${btoa(encodeURIComponent(url))}`, {
					method: "GET",
					mode: "cors",
					cache: "no-cache",
					credentials: "same-origin",
					headers: {
						"Content-Type": "application/json",
						Authorization: accessToken,
					},
					referrerPolicy: "no-referrer",
				})
					.then((response) => response.json())
					.then((resp) => resp.Items); // TODO: handle response, might contain multiple pages or have an error
			});
		},
		create: function (id, quoteText, tab) {
			console.debug("api create (remote)", quoteText);

			if (quoteText && tab && tab.url) {
				return getAccessToken().then((accessToken) => {
					return fetch(`${API_ADDR}/quotes`, {
						method: "POST",
						mode: "cors",
						cache: "no-cache",
						credentials: "same-origin",
						headers: {
							"Content-Type": "application/json",
							Authorization: accessToken,
							"X-Idempotency-Key": id,
						},
						referrerPolicy: "no-referrer",
						body: JSON.stringify({ text: quoteText.trim(), tab }),
					}).then((response) => response.json());
				});
			} else {
				throw "Invalid parameters. E4896";
			}
		},
		delete: function (quote) {
			console.debug("api delete (remote)", quote);
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
				throw "Invalid parameters. E4898";
			}
		},
	};
}

export default RemoteQuoteAPI;
