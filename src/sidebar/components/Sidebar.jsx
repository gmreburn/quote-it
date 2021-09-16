import React, { useCallback, useEffect, useState } from "react";
import SidebarQuote from "./SidebarQuote.jsx";
import useQuotes from "../hooks/useQuotes.js";
import NoQuotesYet from "./NoQuotesYet.jsx";

function Sidebar({ windowId }) {
	const [url, setUrl] = useState("");
	const [notifications, setNotifications] = useState([]);
	const quotes = useQuotes(url);
	const handleActiveTabChange = useCallback(
		(activeInfo) => {
			if (activeInfo.windowId === windowId) {
				browser.tabs.get(activeInfo.tabId).then((tab) => {
					const tabUrl = new URL(tab.url);
					const newUrl = tabUrl.hostname + tabUrl.pathname;
					if (newUrl !== url) {
						setUrl(newUrl);
					}
				});
			}
		},
		[windowId]
	);
	const addNotification = (notification, timeout = 8000) => {
		setNotifications([notification, ...notifications]);
		setTimeout(
			() => {
				setNotifications(notifications.filter((n) => n !== notification));
			},
			!isNaN(Number(timeout)) ? timeout : 8000
		);
	};
	const handleOnUpdated = useCallback(
		(tabId, changeInfo, tab) => {
			const tabUrl = new URL(tab.url);
			const newUrl = tabUrl.hostname + tabUrl.pathname;
			if (newUrl !== url) {
				setUrl(newUrl);
			}
		},
		[windowId]
	);

	useEffect(() => {
		browser.tabs.onUpdated.addListener(handleOnUpdated, {
			windowId,
			properties: ["url"],
		});
		browser.tabs.onActivated.addListener(handleActiveTabChange);
		browser.runtime.onMessage.addListener((msg) => {
			if ((msg && msg.type === "NEW_QUOTE") || msg.type == "QUOTE_DELETED") {
				// for now, redraw content
				// updateContent();
				console.log(msg);
				refresh();
			}
		});
	}, []);

	if (quotes === false) {
		return null; // loading indicator..?
	} else if (Array.isArray(quotes) && quotes.length === 0) {
		return <NoQuotesYet />;
	}
	return (
		<>
			{/* TODO: set key={i} on each notification */}
			{notifications.map((notification) => notification)}
			<ul role="list" className="divide-y divide-gray-200">
				{quotes.map((quote, i) => (
					<SidebarQuote
						quote={quote}
						key={i}
						addNotification={addNotification}
						url={url}
					/>
				))}
			</ul>
		</>
	);
}

export default Sidebar;
