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
			runtimeMessageReducer(msg); // process message to self - runtime.sendMessage will not fire for self

			// TODO: This is probably only necessary when user is on home page to notify the open sidebar
			// or sidebar to send to homepage that is open. Another scenario might be when same url open in separate
			// window. Need to experiment.
			browser.runtime.sendMessage(msg).then(() =>
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
		console.debug("loading quotes for", tab ? tab.url : "every website");
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
