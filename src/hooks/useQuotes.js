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

					default:
						console.debug("no such type", msg.type, msg);
						break;
				}
			}
		},
		[tab, quotes]
	);
	const deleteQuote = (quote) =>
		api.delete(quote).then(() => {
			const msg = { type: "QUOTE_DELETED", quote };
			runtimeMessageReducer(msg); // Inform self - runtime.sendMessage will not fire for self

			// Informs other tabs or homepage of the deleted quote
			browser.runtime.sendMessage(msg);

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
		return QuoteAPI().saveAnnotation(quote, annotationText).then(setQuotes);
	};

	useEffect(() => {
		console.debug("loading quotes for", tab ? tab.url : "every website");
		api.get(tab?.url).then(setQuotes);
	}, [tab]);

	useEffect(() => {
		browser.runtime.onMessage.addListener(runtimeMessageReducer);
		return () => {
			browser.runtime.onMessage.removeListener(runtimeMessageReducer);
		};
	}, [tab, quotes]);

	return [quotes, saveAnnotation, deleteQuote];
}

export default useQuotes;
