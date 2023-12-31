import { useCallback, useEffect, useState } from "react";
import QuoteAPI from "../api/QuoteAPI";
import useTab from "./useTab";

function useQuotes() {
	const { tab } = useTab();
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
				tab.canonical === event.url ||
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
	const deleteQuote = async (quoteId: string) => {
		QuoteAPI.delete(tab.canonical, quoteId).then(() => {
			notify({ type: "QUOTE_DELETED", quoteId: quoteId, url: tab.canonical });

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
				url: tab.canonical,
			})
		);
	};
	const saveHighlighterColor = (quote: Quote, newColor: HighlighterColor) => {
		return QuoteAPI.saveHighlighterColor(quote, newColor).then((highlighter) =>
			notify({
				type: "QUOTE_HIGHLIGHTED",
				quoteId: quote.id,
				highlighter,
				url: tab.canonical,
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
		QuoteAPI.get(tab.canonical).then(setQuotes);
		browser.runtime.onMessage.addListener(runtimeMessageReducer);
		return () => {
			browser.runtime.onMessage.removeListener(runtimeMessageReducer);
		};
	}, [tab]);

	return [quotes, saveAnnotation, saveHighlighterColor, deleteQuote] as const;
}

export default useQuotes;
