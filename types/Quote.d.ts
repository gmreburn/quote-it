type Quote = {
	id: string;
	text: string;
	/** The canonical URL of where the quote came from */
	url: string;
	websiteTitle: string;
	annotation?: string;
	highlighter: {
		color: HighlighterColor;
		label: string;
	};
	created: string;
	updated: string;
};
