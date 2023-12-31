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
						setQuotes((prevQuotes) =>
							prevQuotes.filter((q) => q.id !== event.quote)
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
	const deleteQuote = async (url: string, quoteId: string) => {
		const quote = await QuoteAPI.get(quoteId);
		QuoteAPI.delete(url, quoteId).then(() => {
			notify({ type: "QUOTE_DELETED", quote: quoteId, url });

			browser.notifications
				.create(`${quoteId}-deleted`, {
					type: "basic",
					title: browser.i18n.getMessage("QuoteDeletedTitle"),
					message: browser.i18n.getMessage("QuoteDeleted"),
				})
				.then(() =>
					setTimeout(() => {
						browser.notifications.clear(`${quoteId}-deleted`);
					}, 7000)
				);

			return;
		});
	};
	const saveAnnotation = (quote: Quote, annotationText: string) => {
		return QuoteAPI.saveAnnotation(quote, annotationText).then((annotation) =>
			notify({
				type: "QUOTE_ANNOTATED",
				quoteId: quote.id,
				annotation,
				url: quote.url,
			})
		);
	};
	const saveHighlighterColor = (quote: Quote, newColor: HighlighterColor) => {
		return QuoteAPI.saveHighlighterColor(quote, newColor).then((highlighter) =>
			notify({
				type: "QUOTE_HIGHLIGHTED",
				quoteId: quote.id,
				highlighter,
				url: quote.url,
			})
		);
	};
	const notify = (
		event:
			| QuoteAddedEvent
			| QuoteAnnotatedEvent
			| QuoteDeletedEvent
			| QuoteHighlightedEvent
	) => {
		// Inform self
		runtimeMessageReducer(event);

		// Inform other tabs or homepage
		browser.runtime.sendMessage(event);
	};

	useEffect(() => {
		QuoteAPI.get(url).then(setQuotes);
	}, [url]);

	useEffect(() => {
		browser.runtime.onMessage.addListener(runtimeMessageReducer);
		return () => {
			browser.runtime.onMessage.removeListener(runtimeMessageReducer);
		};
	}, [url]);

	return [quotes, saveAnnotation, saveHighlighterColor, deleteQuote] as const;
}

export default useQuotes;
