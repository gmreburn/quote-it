type QuoteAnnotatedEvent = QuoteEvent & {
	type: "QUOTE_ANNOTATED";
	quoteId: string;
	annotation: QuoteAnnotation;
};
