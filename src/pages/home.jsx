import React from "react";
import ReactDOM from "react-dom";
import HomeQuote from "../components/HomeQuote.jsx";
import useQuotes from "../hooks/useQuotes";
import "../tailwind.css";
import NoQuotesYet from "../sidebar/components/NoQuotesYet.jsx";

function Home() {
	const [quotes, deleteQuote] = useQuotes();

	return (
		<div className="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
			<div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
				<div>
					<h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
						Quotes
					</h2>
					{/* <p className="mt-3 text-xl text-gray-500 sm:mt-4">
						Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat
						massa dictumst amet. Sapien tortor lacus arcu.
					</p> */}
				</div>
				<div className="mt-12 grid gap-16 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
					{quotes.length === 0 && <NoQuotesYet />}
					{quotes.length > 0 &&
						quotes?.map((quote) => (
							<HomeQuote
								key={quote.id}
								quote={quote}
								deleteQuote={deleteQuote}
							/>
						))}
				</div>
			</div>
		</div>
	);
}

ReactDOM.render(<Home />, document.body);
document.title = "Saved quotes";
