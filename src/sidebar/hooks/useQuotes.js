import { nanoid } from "nanoid";
import { useCallback, useEffect, useState } from "react";

function useQuotes(tab) {
	const [quotes, setQuotes] = useState([]);
	const url = new URL(tab.url);
	const id = url.hostname + url.pathname;

	const addQuote = (quote) => {
		return browser.storage.local
			.get(id)
			.then((storedInfo) => storedInfo[Object.keys(storedInfo)[0]] || [])
			.then((quotes) => {
				quotes.push(quote);
				let contentToStore = {};
				contentToStore[id] = quotes;
				browser.storage.local.set(contentToStore);
				setQuotes(quotes);
			});
	};
	const deleteQuote = (quote) => {
		return browser.storage.local
			.get(id)
			.then((storedInfo) => storedInfo[Object.keys(storedInfo)[0]] || [])
			.then((quotes) => {
				let contentToStore = {
					[id]: quotes.filter((q) => !(quote.id == q.id)),
				};
				browser.storage.local.set(contentToStore);
				setQuotes(contentToStore[id]);
			});
	};

	useEffect(() => {
		console.debug("loading quotes for", tab.url);
		browser.storage.local
			.get(id)
			.then((storedInfo) => storedInfo[Object.keys(storedInfo)[0]] || [])
			.then(setQuotes);
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
