import React, { useCallback, useEffect, useState } from "react";
import SidebarQuote from "./SidebarQuote";
import useQuotes from "../../hooks/useQuotes";
import NoQuotesYet from "./NoQuotesYet";

function Sidebar({ tab: t }: { tab: browser.tabs.Tab }) {
	const [tab, setTab] = useState(t);
	const [quotes, saveAnnotation, saveHighlighterColor, deleteQuote] = useQuotes(
		tab.url
	);

	const handleActiveTabChange = useCallback(
		(activeInfo: browser.tabs._OnActivatedActiveInfo) => {
			console.debug("handleActiveTabChange", activeInfo);
			if (activeInfo.windowId === tab.windowId) {
				browser.tabs.get(activeInfo.tabId).then(setTab);
			}
		},
		[tab]
	);
	const handleOnUpdated = useCallback(
		(
			tabId: number,
			changeInfo: browser.tabs._OnUpdatedChangeInfo,
			tab: browser.tabs.Tab
		) => {
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

	if (!Array.isArray(quotes)) {
		return null;
	} else if (quotes.length === 0) {
		return <NoQuotesYet />;
	} else {
		return (
			<ul role='list' className='divide-y'>
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
