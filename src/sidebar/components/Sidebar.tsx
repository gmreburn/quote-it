import React from "react";
import SidebarQuote from "./SidebarQuote";
import useQuotes from "../../hooks/useQuotes";
import NoQuotesYet from "./NoQuotesYet";
import QuoteProvider from "providers/QuoteProvider";
import useTab from "hooks/useTab";

function Sidebar() {
	const [tab] = useTab();
	const [quotes] = useQuotes(tab.url);

	if (!Array.isArray(quotes)) {
		return null;
	} else if (quotes.length === 0) {
		return <NoQuotesYet />;
	} else {
		return (
			<ul role='list' className='divide-y'>
				{quotes.map((quote) => (
					<QuoteProvider quote={quote} key={quote.id}>
						<SidebarQuote />
					</QuoteProvider>
				))}
			</ul>
		);
	}
}

export default Sidebar;
