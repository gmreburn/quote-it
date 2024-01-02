import React from "react";
import ReactDOM from "react-dom";
import HomeQuote from "components/HomeQuote";
import useQuotes from "hooks/useQuotes";
import "../tailwind.css";
import NoQuotesYet from "sidebar/components/NoQuotesYet";
import QuoteProvider from "providers/QuoteProvider";

function Home() {
	const [quotes] = useQuotes();

	if (!Array.isArray(quotes)) {
		return null;
	}

	return (
		<div className='bg-white dark:bg-slate-900 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8'>
			<div className='relative max-w-lg mx-auto divide-y-2 divide-gray-200 dark:divide-gray-800 lg:max-w-7xl'>
				<div>
					<h2 className='text-3xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl'>
						{browser.i18n.getMessage("QuotesFromAcrossTheWeb")}
					</h2>
					{/* TODO: refine this description */}
					{/* <p className='mt-3 text-xl text-gray-500 sm:mt-4'>
						Revisit moments of inspiration effortlessly, and let your unique
						tapestry of wisdom be a source of motivation and insight.
					</p> */}
				</div>
				<div className='mt-12 grid gap-16 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12'>
					{quotes.length === 0 && <NoQuotesYet />}
					{quotes.length > 0 &&
						quotes?.map((quote) => (
							<QuoteProvider quote={quote} key={quote.id}>
								<HomeQuote key={quote.id} />
							</QuoteProvider>
						))}
				</div>
			</div>
		</div>
	);
}

ReactDOM.render(<Home />, document.body);
document.title = "Saved quotes";
