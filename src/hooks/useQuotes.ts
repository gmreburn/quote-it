import { useCallback, useEffect, useState } from "react";
import QuoteAPI from "../api/QuoteAPI";

function useQuotes(url?: string) {
	const [quotes, setQuotes] = useState<Quote[]>([]);
	const api = QuoteAPI();

	const runtimeMessageReducer = useCallback(
		function (
			event:
				| QuoteAddedEvent
				| QuoteAnnotatedEvent
				| QuoteDeletedEvent
				| QuoteHighlightedEvent
		) {
			if (url === undefined) {
				// TODO: this probably needs added back to the if block || url === event.quote.tab.url) {
				switch (event.type) {
					case "QUOTE_DELETED":
						setQuotes((prevQuotes) =>
							prevQuotes.filter((q) => q.id !== event.quote)
						);
						break;
					case "QUOTE_ADDED":
						setQuotes((prevQuotes) => [...prevQuotes, event.quote]);
						break;
					case "QUOTE_ANNOTATED":
					case "QUOTE_HIGHLIGHTED":
						// TODO: find and update object
						// setQuotes(
						// 	quotes.map(
						// 		(obj) => event.quotes.find((o) => o.id === obj.id) || obj
						// 	)
						// );
						break;

					default:
						console.debug("no such type", event);
						break;
				}
			}
		},
		[url]
	);
	const deleteQuote = (quoteId: string) =>
		api.delete(quoteId).then(() => {
			notify({ type: "QUOTE_DELETED", quote: quoteId });

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
	const saveAnnotation = (quote: Quote, annotationText: string) => {
		return QuoteAPI()
			.saveAnnotation(quote, annotationText)
			.then(({ quotes, quote }) =>
				notify({ type: "QUOTE_ANNOTATED", quote: quote.id, annotationText })
			);
	};
	const saveHighlighterColor = (quote: Quote, newColor: HighlighterColor) => {
		return QuoteAPI()
			.saveHighlighterColor(quote, newColor)
			.then(({ quotes, quote }) =>
				notify({
					type: "QUOTE_HIGHLIGHTED",
					quote: quote.id,
					// TODO: this probably wrong property name
					color: quote.color,
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
		api.get(url).then(setQuotes);
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
