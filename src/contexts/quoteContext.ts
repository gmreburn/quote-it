import { createContext } from "react";

export type QuoteContext = {
	quote: Quote;
	deleteQuote: (quoteId: string) => Promise<void>;
	saveAnnotation: (annotationText: string) => Promise<QuoteAnnotation>;
	saveHighlighterColor: (newColor: HighlighterColor) => Promise<Highlighter>;
};

const quoteContext = createContext<QuoteContext>({} as QuoteContext);

export default quoteContext;
