import { useCallback, useEffect, useState } from "react";
import QuoteAPI from "../api/QuoteAPI";
import useTab from "./useTab";

function useQuotes() {
	const [tab] = useTab();
	const [quotes, setQuotes] = useState<Quote[]>([]);
	const runtimeMessageReducer = useCallback(
		function (
			event:
				| QuoteAddedEvent
				| QuoteAnnotatedEvent
				| QuoteDeletedEvent
				| QuoteHighlightedEvent
		) {
			if (
				tab === undefined ||
				// TODO: how to fix this?
				// tab.canonical === event.url ||
				tab.url === event.url
			) {
				switch (event.type) {
					case "QUOTE_DELETED":
						setQuotes((prevQuotes) =>
							prevQuotes.filter((q) => q.id !== event.quoteId)
						);
						break;
					case "QUOTE_ADDED":
						console.log("event", "QUOTE_ADDED", event);
						setQuotes((prevQuotes) => [...prevQuotes, event.quote]);
						break;
					case "QUOTE_ANNOTATED":
						setQuotes((prevQuotes) =>
							prevQuotes.map((q) =>
								q.id === event.quoteId
									? { ...q, annotation: event.annotation }
									: q
							)
						);
						break;
					case "QUOTE_HIGHLIGHTED":
						setQuotes((prevQuotes) =>
							prevQuotes.map((q) =>
								q.id === event.quoteId
									? { ...q, highlighter: event.highlighter }
									: q
							)
						);
						break;

					default:
						console.debug("no such type", event);
						break;
				}
			}
		},
		[tab]
	);
	useEffect(() => {
		if (tab?.url) {
			QuoteAPI.get(tab.url).then(setQuotes);
			browser.runtime.onMessage.addListener(runtimeMessageReducer);
			return () => {
				browser.runtime.onMessage.removeListener(runtimeMessageReducer);
			};
		}
	}, [tab]);

	return [quotes] as const;
}

export default useQuotes;
