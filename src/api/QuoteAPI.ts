import { nanoid } from "nanoid";

class QuoteAPI {
	async saveHighlighterColor(
		quote: Quote,
		color: HighlighterColor
	): Promise<Highlighter> {
		const quotes = await this.get(quote.url);

		const updatedQuotes = quotes.map((q) => {
			if (q.id === quote.id) {
				q.highlighter = {
					color,
					created: q.annotation?.created || new Date().toISOString(),
					updated: new Date().toISOString(),
				};
			}
			return q;
		});

		await browser.storage.local.set({ [quote.url]: updatedQuotes });

		const updatedQuote = updatedQuotes.find((q) => q.id === quote.id);
		if (!updatedQuote?.highlighter) {
			throw new Error("Failed to save the highlighter color.");
		}

		return updatedQuote.highlighter;
	}

	async saveAnnotation(
		quote: Quote,
		annotationText: string
	): Promise<QuoteAnnotation> {
		const quotes = await this.get(quote.url);

		const updatedQuotes = quotes.map((q) => {
			if (q.id === quote.id) {
				q.annotation = {
					text: annotationText,
					created: q.annotation?.created || new Date().toISOString(),
					updated: new Date().toISOString(),
				};
			}
			return q;
		});

		await browser.storage.local.set({ [quote.url]: updatedQuotes });

		const updatedQuote = updatedQuotes.find((q) => q.id === quote.id);
		if (!updatedQuote?.annotation) {
			throw new Error("Failed to save the annotation.");
		}

		return updatedQuote.annotation;
	}

	async get(url?: string): Promise<Quote[]> {
		console.debug("api get", url);
		const storedInfo = (await browser.storage.local.get(url)) as {
			[key: string]: Quote[];
		};
		const quotes = Object.keys(storedInfo).flatMap((key) =>
			storedInfo[key].map((quote) => ({ ...quote, url: key }))
		);
		console.log("quotes", quotes);
		return quotes;
	}

	async create(
		url: string,
		quoteText: string,
		tab: browser.tabs.Tab
	): Promise<Quote> {
		console.debug("api create", quoteText);

		if (!quoteText || !tab || !url) {
			throw new Error("Invalid parameters. E4892");
		}

		const quote: Quote = {
			id: nanoid(),
			text: quoteText.trim(),
			created: new Date().toISOString(),
			websiteTitle: tab.title,
			url,
		};

		const quotes = await this.get(url);
		quotes.push(quote);

		await browser.storage.local.set({ [url]: quotes });

		return quote;
	}

	async delete(url: string, quoteId: string): Promise<Quote[]> {
		console.debug("api delete", quoteId);

		if (!quoteId) {
			throw new Error("Invalid parameters. E4894");
		}

		const quotes = await this.get(url);
		const updatedQuotes = quotes.filter((q) => q.id !== quoteId);
		const contentToStore = { [url]: updatedQuotes };

		await browser.storage.local.set(contentToStore);

		return updatedQuotes;
	}
}

export default new QuoteAPI();
