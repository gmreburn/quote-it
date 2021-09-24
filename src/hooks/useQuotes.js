import { useCallback, useEffect, useState } from "react";
import QuoteAPI from "../api/QuoteAPI.js";

function useQuotes(tab) {
	const [quotes, setQuotes] = useState([]);
	const api = QuoteAPI();

	const runtimeMessageReducer = useCallback(
		function (msg) {
			console.log("msg received", tab?.url, msg.quote.tab.url);

			if (tab === undefined || tab.url === msg.quote.tab.url) {
				switch (msg.type) {
					case "QUOTE_DELETED":
						console.log("QUOTE_DELETED", quotes, msg.quote);

						setQuotes(quotes.filter((q) => q.id !== msg.quote.id));
						break;
					case "QUOTE_ADDED":
						console.log("QUOTE_ADDED", quotes, msg.quote);
						setQuotes([...quotes, msg.quote]);
						break;

					default:
						console.log("no such type");
						break;
				}
			}
		},
		[tab, quotes]
	);
	const deleteQuote = (quote) =>
		api.delete(quote).then(() => {
			runtimeMessageReducer({ type: "QUOTE_DELETED", quote });
			browser.runtime.sendMessage({ type: "QUOTE_DELETED", quote }).then(() =>
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
					)
			);
		});

	useEffect(() => {
		console.debug("loading quotes for", tab ? tab.url : "global");
		api.get(tab?.url).then(setQuotes);
	}, [tab]);

	useEffect(() => {
		browser.runtime.onMessage.addListener(runtimeMessageReducer);
		return () => {
			browser.runtime.onMessage.removeListener(runtimeMessageReducer);
		};
	}, [tab, quotes]);

	return [quotes, deleteQuote];
}

export default useQuotes;
