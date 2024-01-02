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
			if (
				// url === undefined ||
				// TODO: how to fix this?
				// tab.canonical === event.url ||
				url === event.url
				// TODO: or if page == moz-extension://{extension-id}/pages/home.html
				// this updates the sidebar to show all quotes when displaying the quote page
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
		[url]
	);
	useEffect(() => {
		QuoteAPI.get(url).then(setQuotes);
		browser.runtime.onMessage.addListener(runtimeMessageReducer);
		return () => {
			browser.runtime.onMessage.removeListener(runtimeMessageReducer);
		};
	}, [url]);

	return [quotes] as const;
}

export default useQuotes;
