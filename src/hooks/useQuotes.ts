import { useCallback, useEffect, useState } from "react";
import QuoteAPI from "../api/QuoteAPI";

function useQuotes(url?: string) {
	const [quotes, setQuotes] = useState<Quote[]>([]);
	const runtimeMessageReducer = useCallback(
		function (
			event:
				| QuoteAddedEvent
				| QuoteAnnotatedEvent
				| QuoteDeletedEvent
				| QuoteHighlightedEvent
		) {
			if (url === undefined || url === event.url) {
				switch (event.type) {
					case "QUOTE_DELETED":
						console.debug("gmr", quotes);
						setQuotes((prevQuotes) =>
							prevQuotes.filter((q) => q.id !== event.quoteId)
						);
						break;
					case "QUOTE_ADDED":
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
						console.debug("Unsupported event type", event);
						break;
				}
			}
		},
		[url]
	);
	useEffect(() => {
		QuoteAPI.get(url).then(setQuotes);
		browser.runtime.onMessage.addListener(runtimeMessageReducer);
		return () => {
			browser.runtime.onMessage.removeListener(runtimeMessageReducer);
		};
	}, [url]);

	useEffect(() => {
		browser.runtime.connect();
	}, []);

	return [quotes] as const;
}

export default useQuotes;
