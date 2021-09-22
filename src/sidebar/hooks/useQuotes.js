import { nanoid } from "nanoid";
import { useCallback, useEffect, useState } from "react";
import QuoteAPI from "../../api/QuoteAPI";

function useQuotes(tab) {
	const [quotes, setQuotes] = useState([]);
	const url = new URL(tab.url);
	const api = QuoteAPI(url.hostname + url.pathname);

	const addQuote = (quote) => api.create(quote).then(setQuotes);
	const deleteQuote = (quote) => api.delete(quote.id).then(setQuotes);

	useEffect(() => {
		console.debug("loading quotes for", tab.url);
		api.get().then(setQuotes);
		browser.runtime.onMessage.addListener(runtimeMessageReducer);
		return () => {
			browser.runtime.onMessage.removeListener(runtimeMessageReducer);
		};
	}, [tab]);

	const runtimeMessageReducer = useCallback(
		(msg) => {
			if (
				msg.tab &&
				msg.tab.windowId === tab.windowId &&
				msg.tab.id === tab.id
			) {
				console.log("new quote", quotes, msg);
				addQuote({
					id: nanoid(),
					text: msg.info.selectionText.trim(),
					created: new Date().toISOString(),
				});
			}
		},
		[tab]
	);

	return [quotes, deleteQuote];
}

export default useQuotes;
