import React, { ReactNode, useCallback, useEffect, useState } from "react";
import quoteContext, { QuoteContext } from "contexts/quoteContext";
import QuoteAPI from "api/QuoteAPI";

type Props = { children: ReactNode; quote: Quote };
// TODO: need to set an event listener for <link/> canonical change.. also probably for tab's url change
const QuoteProvider = ({ quote: initalValue, ...props }: Props) => {
	const [quote, setQuote] = useState(initalValue);
	const runtimeMessageReducer = useCallback(
		function (
			event: QuoteAnnotatedEvent | QuoteDeletedEvent | QuoteHighlightedEvent
		) {
			if (event.quoteId === quote.id) {
				switch (event.type) {
					case "QUOTE_DELETED":
						setQuote({} as Quote);
						break;
					case "QUOTE_ANNOTATED":
						setQuote((prevQuote) => ({
							...prevQuote,
							annotation: Object.assign(
								{},
								prevQuote.annotation,
								event.annotation
							),
						}));
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
						console.debug("Unsupported event type", event);
						break;
				}
			}
		},
		[quote]
	);

	const deleteQuote = async () => {
		try {
			await QuoteAPI.delete(quote.url, quote.id);

			notify({ type: "QUOTE_DELETED", quoteId: quote.id, url: quote.url });

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
	const saveAnnotation = async (annotationText: string) => {
		const annotation = await QuoteAPI.saveAnnotation(quote, annotationText);

		notify({
			type: "QUOTE_ANNOTATED",
			quoteId: quote.id,
			annotation,
			url: quote.url,
		});

		return annotation;
	};
	const saveHighlighterColor = async (newColor: HighlighterColor) => {
		const highlighter = await QuoteAPI.saveHighlighterColor(quote, newColor);

		notify({
			type: "QUOTE_HIGHLIGHTED",
			quoteId: quote.id,
			highlighter,
			url: quote.url,
		});
		return highlighter;
	};
	//--
	const notify = (
		event: QuoteAnnotatedEvent | QuoteDeletedEvent | QuoteHighlightedEvent
	) => {
		if (event.quoteId) {
			// Inform self
			runtimeMessageReducer(event);
		}

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
		browser.runtime.connect();
	}, []);

	useEffect(() => {
		setValue({ quote, deleteQuote, saveAnnotation, saveHighlighterColor });
	}, [quote]);

	return <Provider value={value} {...props} />;
};

export default QuoteProvider;
