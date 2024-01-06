type Quote = {
	id: string;
	text: string;
	/** The canonical URL of where the quote came from */
	url: string;
	websiteTitle?: string;
	annotation?: QuoteAnnotation;
	highlighter?: Highlighter;
	created: string;
	updated?: string;
};
