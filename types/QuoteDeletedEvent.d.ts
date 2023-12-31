type QuoteDeletedEvent = QuoteEvent & {
	type: "QUOTE_DELETED";
	quote: string;
};
