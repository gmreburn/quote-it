import React, { useState } from "react";
import Moment from "react-moment";
import {
	ClipboardCopyIcon,
	DocumentSearchIcon,
	TrashIcon,
} from "@heroicons/react/outline";
import SimpleNotification from "./SimpleNotification.jsx";

function SidebarQuote({ quote: q, addNotification, url }) {
	const [quote, setQuote] = useState(q);
	const onCopyClicked = () => {
		navigator.clipboard.writeText(quote.text);
		addNotification(
			<SimpleNotification
				title={browser.i18n.getMessage("QuoteCopiedTitle")}
				message={browser.i18n.getMessage("QuoteCopied")}
			/>
		);
	};
	const onDeleteClicked = () => {
		// TODO: confirm delete first
		browser.storage.local
			.get(url)
			.then((storedInfo) => storedInfo[Object.keys(storedInfo)[0]] || [])
			.then((quotes) => {
				const newQuotes = quotes.filter((q) => !(quote.id == q.id));

				let contentToStore = {};
				contentToStore[url] = newQuotes;
				browser.storage.local.set(contentToStore);
				setQuote(null);
				addNotification(
					<SimpleNotification
						title={browser.i18n.getMessage("QuoteDeletedTitle")}
						message={browser.i18n.getMessage("QuoteDeleted")}
					/>
				);
			});
	};
	const onFindClicked = () => {
		browser.find
			.find(quote.text, {
				caseSensitive: true,
			})
			.then((finds) => {
				if (finds.count > 0) {
					browser.find.highlightResults({ noScroll: false });
				}
			});
	};

	if (!quote) return null;

	return (
		<li className="relative bg-white py-5 px-4 hover:bg-gray-50">
			<div className="flex justify-between space-x-3">
				<div className="min-w-0 flex-1">
					<a href="#" className="block focus:outline-none">
						<p className="text-sm font-medium text-gray-900 truncate">
							{quote.author}
						</p>
						<p className="text-sm text-gray-500 truncate">{quote.subject}</p>
					</a>
				</div>
				<Moment
					className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500"
					fromNow
				>
					{quote.created}
				</Moment>
			</div>
			<div className="mt-1">
				<p className="line-clamp-2 text-sm text-gray-700">"{quote.text}"</p>
			</div>
			<div className="flex justify-between space-x-3 mt-2">
				<div className="min-w-0 flex-1"></div>
				<div className="flex flex-shrink-0 whitespace-nowrap text-sm text-gray-500 space-x-2">
					<button
						title={browser.i18n.getMessage("btnCopyQuote")}
						type="button"
						className="hover:text-gray-600"
						onClick={onCopyClicked}
					>
						<ClipboardCopyIcon className="h-6 w-6" />
					</button>
					<button
						title={browser.i18n.getMessage("btnHighlightQuote")}
						type="button"
						className="hover:text-gray-600"
						onClick={onFindClicked}
					>
						<DocumentSearchIcon className="h-6 w-6" />
					</button>
					<button
						title={browser.i18n.getMessage("btnDeleteQuote")}
						type="button"
						className="hover:text-gray-600"
						onClick={onDeleteClicked}
					>
						<TrashIcon className="h-6 w-6" />
					</button>
				</div>
			</div>
		</li>
	);
}

export default SidebarQuote;