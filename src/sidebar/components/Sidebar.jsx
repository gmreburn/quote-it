import React, { useCallback, useEffect, useState } from "react";
import SidebarQuote from "./SidebarQuote.jsx";
import useQuotes from "../../hooks/useQuotes.js";
import NoQuotesYet from "./NoQuotesYet.jsx";

function Sidebar({ tab: t }) {
	const [tab, setTab] = useState(t);
	const [quotes, saveAnnotation, saveHighlighterColor, deleteQuote] =
		useQuotes(tab);

	const handleActiveTabChange = useCallback(
		(activeInfo) => {
			console.debug("handleActiveTabChange", activeInfo);
			if (activeInfo.windowId === tab.windowId) {
				browser.tabs.get(activeInfo.tabId).then(setTab);
			}
		},
		[tab]
	);
	const handleOnUpdated = useCallback(
		(tabId, changeInfo, tab) => {
			console.debug("handleOnUpdated", tab);
			if (tab.windowId === tab.windowId) {
				setTab(tab);
			}
		},
		[tab]
	);

	useEffect(() => {
		browser.tabs.onUpdated.addListener(handleOnUpdated, {
			windowId: tab.windowId,
			properties: ["url"],
		});
		browser.tabs.onActivated.addListener(handleActiveTabChange);

		return () => {
			browser.tabs.onUpdated.removeListener(handleOnUpdated);
			browser.tabs.onActivated.removeListener(handleActiveTabChange);
		};
	}, []);

	if (quotes === false) {
		return null;
	} else if (Array.isArray(quotes) && quotes.length === 0) {
		return <NoQuotesYet />;
	} else {
		return (
			<ul role="list" className="divide-y">
				{quotes.map((quote) => (
					<SidebarQuote
						quote={quote}
						key={quote.id}
						saveAnnotation={saveAnnotation}
						deleteQuote={deleteQuote}
						saveHighlighterColor={saveHighlighterColor}
					/>
				))}
			</ul>
		);
	}
}

export default Sidebar;
