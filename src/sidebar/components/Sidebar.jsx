import React, { useCallback, useEffect, useState } from "react";
import SidebarQuote from "./SidebarQuote.jsx";
import useQuotes from "../hooks/useQuotes.js";
import NoQuotesYet from "./NoQuotesYet.jsx";

function Sidebar({ windowId }) {
	const [url, setUrl] = useState("");
	const [notifications, setNotifications] = useState([]);
	const [quotes, setQuotes] = useQuotes(url);
	const [tabId, setTabId] = useState(false);
	const handleActiveTabChange = useCallback(
		(activeInfo) => {
			if (activeInfo.windowId === windowId) {
				browser.tabs.get(activeInfo.tabId).then((tab) => {
					const tabUrl = new URL(tab.url);
					const newUrl = tabUrl.hostname + tabUrl.pathname;
					if (newUrl !== url) {
						setUrl(newUrl);
					}
					setTabId(tab.id);
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
	const runtimeMessageReducer = (msg) => {
		if (msg && msg.type === "NEW_QUOTE") {
			setQuotes([...quotes, msg.quote]);
		}
	};

	useEffect(() => {
		browser.tabs.onUpdated.addListener(handleOnUpdated, {
			windowId,
			properties: ["url"],
		});
		browser.tabs.onActivated.addListener(handleActiveTabChange);
	}, []);
	useEffect(() => {
		browser.runtime.onMessage.addListener(runtimeMessageReducer);
		return () => {
			browser.runtime.onMessage.removeListener(runtimeMessageReducer);
		};
	}, [quotes]);

	if (quotes === false) {
		return null;
	} else if (Array.isArray(quotes) && quotes.length === 0) {
		return <NoQuotesYet />;
	} else {
		return (
			<>
				{notifications.map((notification, i) => (
					<div key={i}>{notification}</div>
				))}
				<ul role="list" className="divide-y divide-gray-200">
					{quotes.map((quote) => (
						<SidebarQuote
							quote={quote}
							key={quote.id}
							addNotification={addNotification}
							url={url}
							tabId={tabId}
						/>
					))}
				</ul>
			</>
		);
	}
}

export default Sidebar;
