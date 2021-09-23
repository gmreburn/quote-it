import { nanoid } from "nanoid";
import { useCallback, useEffect, useState } from "react";
import QuoteAPI from "../api/QuoteAPI.js";

function useQuotes(tab) {
	const [quotes, setQuotes] = useState([]);
	const api = QuoteAPI(tab && tab.url);

	const addQuote = (quote) => api.create(quote).then(setQuotes);
	const deleteQuote = (quote) => api.delete(quote.id).then(setQuotes);

	useEffect(() => {
		console.debug("loading quotes for", tab ? tab.url : "global");
		api.get().then(setQuotes);
		if (tab) {
			browser.runtime.onMessage.addListener(runtimeMessageReducer);
			return () => {
				browser.runtime.onMessage.removeListener(runtimeMessageReducer);
			};
		}
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
