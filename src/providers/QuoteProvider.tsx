import React, { ReactNode, useCallback, useEffect, useState } from "react";
import quoteContext from "contexts/quoteContext";
import QuoteAPI from "api/QuoteAPI";
import useTab from "hooks/useTab";
type Props = { children: ReactNode; quote: Quote };
// TODO: need to set an event listener for <link/> canonical change.. also probably for tab's url change
const QuoteProvider = ({ quote, ...props }: Props) => {
	const { tab } = useTab();
	const deleteQuote = async () => {
		QuoteAPI.delete(tab.canonical, quote.id).then(() => {
			notify({ type: "QUOTE_DELETED", quoteId: quote.id, url: tab.canonical });

			browser.notifications
				.create(`${quote.id}-deleted`, {
					type: "basic",
					title: browser.i18n.getMessage("QuoteDeletedTitle"),
					message: browser.i18n.getMessage("QuoteDeleted"),
				})
				.then(() =>
					setTimeout(() => {
						browser.notifications.clear(`${quote.id}-deleted`);
					}, 7000)
				);

			return;
		});
	};
	const saveAnnotation = (annotationText: string) => {
		return QuoteAPI.saveAnnotation(quote, annotationText).then((annotation) => {
			notify({
				type: "QUOTE_ANNOTATED",
				quoteId: quote.id,
				annotation,
				url: tab.canonical,
			});
			return annotation;
		});
	};
	const saveHighlighterColor = (newColor: HighlighterColor) => {
		return QuoteAPI.saveHighlighterColor(quote, newColor).then(
			(highlighter) => {
				notify({
					type: "QUOTE_HIGHLIGHTED",
					quoteId: quote.id,
					highlighter,
					url: tab.canonical,
				});
				return highlighter;
			}
		);
	};
	//--
	const notify = (
		event:
			| QuoteAddedEvent
			| QuoteAnnotatedEvent
			| QuoteDeletedEvent
			| QuoteHighlightedEvent
	) => {
		// Inform other tabs or homepage
		browser.runtime.sendMessage(event);
	};

	const [value, setValue] = useState({
		tab,
		quote,
		deleteQuote,
		saveAnnotation,
		saveHighlighterColor,
	});
	const { Provider } = quoteContext;

	useEffect(() => {
		setValue({ tab, quote, deleteQuote, saveAnnotation, saveHighlighterColor });
	}, [tab]);

	return <Provider value={value} {...props} />;
};

export default QuoteProvider;
