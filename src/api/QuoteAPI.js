import { nanoid } from "nanoid";
import LocalAPI from "./LocalAPI.js";
import RemoteAPI from "./RemoteAPI";

function QuoteAPI(
	API_ADDR = "http://127.0.0.1:3000" // "https://t17g6r07c6.execute-api.us-east-1.amazonaws.com/v1"
) {
	// TODO: do not call remote api on each request.. read from local and sync on interval
	const localApi = LocalAPI();
	const remoteApi = RemoteAPI();
	return {
		saveHighlighterColor: function (quote, color) {
			return [
				localApi.saveHighlighterColor(quote, color),
				remoteApi.saveHighlighterColor(quote, color),
			];
		},
		saveAnnotation: function (quote, annotationText) {
			return [
				localApi.saveAnnotation(quote, annotationText),
				remoteApi.saveAnnotation(quote, annotationText),
			];
		},
		get: function (url) {
			console.debug("api get", url);

			return [localApi.get(url), remoteApi.get(url)];
		},
		create: function (quoteText, tab) {
			console.debug("api create", quoteText);

			if (quoteText && tab && tab.url) {
				const id = nanoid();

				return [
					localApi.create(id, quoteText, tab),
					remoteApi
						.create(id, quoteText, tab)
						.then((remote) => localApi.replace(id, remote)),
				];
			} else {
				throw "Invalid parameters. E4892";
			}
		},
		delete: function (quote) {
			console.debug("api delete", quote);

			if (quote && quote.id && quote.tab && quote.tab.url) {
				return [localApi.delete(quote), remoteApi.delete(quote)];
			} else {
				throw "Invalid parameters. E4894";
			}
		},
	};
}

export default QuoteAPI;
