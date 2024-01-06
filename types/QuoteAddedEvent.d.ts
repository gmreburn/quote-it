type QuoteAddedEvent = QuoteEvent & {
	type: "QUOTE_ADDED";
	quote: Quote;
};
