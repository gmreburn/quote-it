import React, { useCallback, useEffect, useState } from "react";
import { FolderAddIcon } from "@heroicons/react/outline";
import SidebarQuote from "./SidebarQuote.jsx";
import useQuotes from "./hooks/useQuotes.js";

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

	// const editQuote = () => {
	// 	const newQuotes = quotes.slice();
	// 	// saveQuotes(newQuotes);
	// 	// setQuotes(newQuotes);
	// };
	// const deleteQuote = (quote) => {
	// 	const newQuotes = quotes.filter((q) => quote != q);
	// 	// saveQuotes(newQuotes);
	// 	// setQuotes(newQuotes);
	// };
	// function saveQuotes(quotes) {
	// 	let contentToStore = {};
	// 	contentToStore[url] = quotes;
	// 	browser.storage.local.set(contentToStore);
	// }

	if (quotes === false) {
		return null; // loading indicator..?
	} else if (Array.isArray(quotes) && quotes.length === 0) {
		return <NoQuotesYet />;
	}
	return (
		<>
			{notifications.map((notification) => notification)}
			<ul role="list" className="divide-y divide-gray-200">
				{quotes.map((quote, i) => (
					<SidebarQuote
						quote={quote}
						key={i}
						addNotification={addNotification}
					/>
				))}
			</ul>
		</>
	);
}

export default Sidebar;

function NoQuotesYet() {
	return (
		<div className="flex justify-center mt-20">
			<div>
				<FolderAddIcon className="mx-auto h-12 w-12 text-gray-400" />
				<h3 className="mt-2 font-bold text-gray-900 text-center">
					No quotes yet
				</h3>
				<p className="mt-1 mx-8 text-gray-500 text-center">
					Get started by right-clicking selected text on the webpage to save the
					selection as a new quote.
				</p>
			</div>
		</div>
	);
}
