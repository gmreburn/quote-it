type QuoteHighlightedEvent = QuoteEvent & {
	type: "QUOTE_HIGHLIGHTED";
	quoteId: string;
	highlighter: Highlighter;
};
