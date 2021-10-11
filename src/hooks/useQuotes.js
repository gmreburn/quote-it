import { useCallback, useEffect, useState } from "react";
import QuoteAPI from "../api/QuoteAPI.js";

function useQuotes(tab) {
	const [quotes, setQuotes] = useState([]);
	const api = QuoteAPI();

	const runtimeMessageReducer = useCallback(
		function (msg) {
			if (tab === undefined || tab.url === msg.quote.tab.url) {
				switch (msg.type) {
					case "QUOTE_DELETED":
						setQuotes(quotes.filter((q) => q.id !== msg.quote.id));
						break;
					case "QUOTE_ADDED":
						setQuotes([...quotes, msg.quote]);
						break;
					case "QUOTE_UPDATED":
						setQuotes(
							quotes.map((obj) => quotes.find((o) => o.id === obj.id) || obj)
						);
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
		[tab, quotes]
	);
	const deleteQuote = (quote) => {
		// TODO: handle remotePromise
		const [localPromise, remotePromise] = api.delete(quote);

		localPromise.then(() => {
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
	};
	const saveAnnotation = (quote, annotationText) => {
		// TODO: handle remotePromise
		const [localPromise, remotePromise] = QuoteAPI().saveAnnotation(
			quote,
			annotationText
		);
		return localPromise.then(({ quotes, quote }) =>
			notify({ type: "QUOTE_ANNOTATION", quotes, quote })
		);
	};
	const saveHighlighterColor = (quote, newColor) => {
		// TODO: handle remotePromise
		const [localPromise, remotePromise] = QuoteAPI().saveHighlighterColor(
			quote,
			newColor
		);

		return localPromise.then(({ quotes, quote }) =>
			notify({ type: "QUOTE_HIGHLIGHT", quotes, quote })
		);

		// remotePromise.error()
	};
	const notify = (event) => {
		// Inform self
		runtimeMessageReducer(event);

		// Inform other tabs or homepage
		browser.runtime.sendMessage(event);
	};

	useEffect(() => {
		console.log("here for you");
		const [localPromise, remotePromise] = api.get(tab?.url);

		localPromise.then(setQuotes);
		remotePromise.then(setQuotes);
	}, [tab]);

	useEffect(() => {
		browser.runtime.onMessage.addListener(runtimeMessageReducer);
		return () => {
			browser.runtime.onMessage.removeListener(runtimeMessageReducer);
		};
	}, [tab, quotes]);

	return [quotes, saveAnnotation, saveHighlighterColor, deleteQuote];
}

export default useQuotes;
