import React, { ReactNode, useCallback, useEffect, useState } from "react";
import quoteContext, { QuoteContext } from "contexts/quoteContext";
import QuoteAPI from "api/QuoteAPI";
import useTab from "hooks/useTab";
type Props = { children: ReactNode; quote: Quote };
// TODO: need to set an event listener for <link/> canonical change.. also probably for tab's url change
const QuoteProvider = ({ quote: initalValue, ...props }: Props) => {
	const [tab] = useTab();
	const [quote, setQuote] = useState(initalValue);
	const runtimeMessageReducer = useCallback(
		function (event: QuoteAnnotatedEvent | QuoteHighlightedEvent) {
			console.table(event);
			console.table(quote);
			if (event.quoteId === quote.id) {
				switch (event.type) {
					case "QUOTE_ANNOTATED":
						setQuote((prevQuote) => ({
							...prevQuote,
							annotation: Object.assign(
								{},
								prevQuote.annotation,
								event.annotation
							),
						}));
						console.debug("quote updated", {
							...quote,
							annotation: Object.assign({}, quote.annotation, event.annotation),
						});
						break;
					case "QUOTE_HIGHLIGHTED":
						setQuote((prevQuote) => ({
							...prevQuote,
							highlighter: Object.assign(
								{},
								prevQuote.highlighter,
								event.highlighter
							),
						}));
						break;

					default:
						console.debug("no such type", event);
						break;
				}
			}
		},
		[quote]
	);
	// useEffect(() => {
	// 	browser.runtime.onMessage.addListener(runtimeMessageReducer);
	// 	return () => {
	// 		browser.runtime.onMessage.removeListener(runtimeMessageReducer);
	// 	};
	// }, [quote]);

	const deleteQuote = async () => {
		if (!tab || !tab.url) {
			// If tab or tab.url is undefined, exit the function
			return;
		}

		const { url } = tab;

		try {
			await QuoteAPI.delete(url, quote.id);

			notify({ type: "QUOTE_DELETED", quoteId: quote.id, url });

			const notificationId = `${quote.id}-deleted`;

			browser.notifications.create(notificationId, {
				type: "basic",
				title: browser.i18n.getMessage("QuoteDeletedTitle"),
				message: browser.i18n.getMessage("QuoteDeleted"),
			});

			setTimeout(() => {
				browser.notifications.clear(notificationId);
			}, 7000);
		} catch (error) {
			console.error("Error deleting quote:", error);
			// Handle the error as needed
		}
	};
	// saveAnnotation: (annotationText: string) => Promise<QuoteAnnotation>;
	const saveAnnotation = async (annotationText: string) => {
		if (!tab || !tab.url) {
			// If tab or tab.url is undefined, return undefined
			throw new Error("The tab or tab's URL is undefined.");
		}

		const annotation = await QuoteAPI.saveAnnotation(quote, annotationText);

		notify({
			type: "QUOTE_ANNOTATED",
			quoteId: quote.id,
			annotation,
			url: tab.url,
		});

		return annotation;
	};
	const saveHighlighterColor = async (newColor: HighlighterColor) => {
		if (!tab || !tab.url) {
			// If tab or tab.url is undefined, return undefined
			throw new Error("The tab or tab's URL is undefined.");
		}

		const highlighter = await QuoteAPI.saveHighlighterColor(quote, newColor);

		notify({
			type: "QUOTE_HIGHLIGHTED",
			quoteId: quote.id,
			highlighter,
			url: tab.url,
		});
		return highlighter;
	};
	//--
	const notify = (event: QuoteAnnotatedEvent | QuoteHighlightedEvent) => {
		// Inform self
		runtimeMessageReducer(event);

		// Inform other tabs or homepage
		browser.runtime.sendMessage(event);
	};

	const [value, setValue] = useState<QuoteContext>({
		quote,
		deleteQuote,
		saveAnnotation,
		saveHighlighterColor,
	});
	const { Provider } = quoteContext;

	useEffect(() => {
		setValue({ quote, deleteQuote, saveAnnotation, saveHighlighterColor });
	}, [quote]);

	return <Provider value={value} {...props} />;
};

export default QuoteProvider;
