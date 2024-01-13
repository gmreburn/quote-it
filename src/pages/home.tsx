import React from "react";
import ReactDOM from "react-dom";
import useQuotes from "hooks/useQuotes";
import "../tailwind.css";
import NoQuotesYet from "sidebar/components/NoQuotesYet";
import QuoteProvider from "providers/QuoteProvider";
import QuoteCard from "components/QuoteCard";

function Home() {
	const [quotes] = useQuotes();

	if (!Array.isArray(quotes)) {
		return null;
	}

	return (
		<div className=' pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8'>
			<div className='relative max-w-lg mx-auto divide-y-2 divide-gray-200 dark:divide-gray-800 lg:max-w-7xl'>
				<div>
					<h2 className='text-3xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl'>
						{browser.i18n.getMessage("QuotesFromAcrossTheWeb")}
					</h2>
					<p className='mt-3 text-xl text-gray-500 sm:mt-4'>
						{browser.i18n.getMessage("RevisitSavedQuotesParagraph")}
					</p>
				</div>
				<div className='mt-12 grid gap-16 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12'>
					{quotes.length === 0 && <NoQuotesYet />}
					{quotes.length > 0 &&
						quotes?.map((quote) => (
							<QuoteProvider quote={quote} key={quote.id}>
								<QuoteCard />
							</QuoteProvider>
						))}
				</div>
			</div>
		</div>
	);
}

const containerElement = document.createElement("div");
document.body.appendChild(containerElement);
ReactDOM.render(<Home />, containerElement);
document.title = "Saved quotes";
document.body.className = "bg-slate-100 dark:bg-slate-900";
