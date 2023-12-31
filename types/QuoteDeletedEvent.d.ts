type QuoteDeletedEvent = QuoteEvent & {
	type: "QUOTE_DELETED";
	quoteId: string;
};
