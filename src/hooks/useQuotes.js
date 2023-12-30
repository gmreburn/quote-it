import { useCallback, useEffect, useState } from "react";
import QuoteAPI from "../api/QuoteAPI.js";

function useQuotes(url) {
	const [quotes, setQuotes] = useState([]);
	const api = QuoteAPI();

	const runtimeMessageReducer = useCallback(
		function (msg) {
			// TODO: why is url === undefined correct? b.c when on addon homepage
			if (url === undefined || url === msg.quote.tab.url) {
				switch (msg.type) {
					case "QUOTE_DELETED":
						setQuotes(quotes.filter((q) => q.id !== msg.quote.id));
						break;
					case "QUOTE_ADDED":
						setQuotes([...quotes, msg.quote]);
						break;
					case "QUOTE_ANNOTATION":
					case "QUOTE_HIGHLIGHT":
						setQuotes(
							quotes.map(
								(obj) => msg.quotes.find((o) => o.id === obj.id) || obj
							)
						);
						break;

					default:
						console.debug("no such type", msg.type, msg);
						break;
				}
			}
		},
		[url, quotes]
	);
	const deleteQuote = (quote) =>
		api.delete(quote).then(() => {
			notify({ type: "QUOTE_DELETED", quote });

			browser.notifications
				.create(`${quote.id}-deleted`, {
					type: "basic",
					title: browser.i18n.getMessage("QuoteDeletedTitle"),
					message: browser.i18n.getMessage("QuoteDeleted"),
				})
				.then(() =>
					setTimeout(() => {
						browser.notifications.clear(`${quote.id}-deleted`);
					}, 7000)
				);
		});
	const saveAnnotation = (quote, annotationText) => {
		return QuoteAPI()
			.saveAnnotation(quote, annotationText)
			.then(({ quotes, quote }) =>
				notify({ type: "QUOTE_ANNOTATION", quotes, quote })
			);
	};
	const saveHighlighterColor = (quote, newColor) => {
		return QuoteAPI()
			.saveHighlighterColor(quote, newColor)
			.then(({ quotes, quote }) =>
				notify({ type: "QUOTE_HIGHLIGHT", quotes, quote })
			);
	};
	const notify = (event) => {
		// Inform self
		runtimeMessageReducer(event);

		// Inform other tabs or homepage
		browser.runtime.sendMessage(event);
	};

	useEffect(() => {
		api.get(url).then(setQuotes);
	}, [url]);

	useEffect(() => {
		browser.runtime.onMessage.addListener(runtimeMessageReducer);
		return () => {
			browser.runtime.onMessage.removeListener(runtimeMessageReducer);
		};
	}, [url, quotes]);

	return [quotes, saveAnnotation, saveHighlighterColor, deleteQuote];
}

export default useQuotes;
