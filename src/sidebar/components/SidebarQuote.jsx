import React, { useState } from "react";
import Moment from "react-moment";
import {
	ClipboardCopyIcon,
	DocumentSearchIcon,
	PencilIcon,
	TrashIcon,
} from "@heroicons/react/outline";
import SimpleNotification from "./SimpleNotification.jsx";

function SidebarQuote({ quote: q, addNotification, url }) {
	const [quote, setQuote] = useState(q);
	const onCopyClicked = () => {
		navigator.clipboard.writeText(quote.text);
		addNotification(
			<SimpleNotification
				title="Quote copied!"
				message="The quote was successfully copied to your clipboard."
			/>
		);
	};
	const onDeleteClicked = () => {
		// TODO: confirm delete first
		// TODO: presist to storage
		browser.storage.local
			.get(url)
			.then((storedInfo) => storedInfo[Object.keys(storedInfo)[0]] || [])
			.then((quotes) => {
				const newQuotes = quotes.filter(
					(q) => !(quote.created == q.created && quote.text == q.text)
				);
				console.log("onDeleteClicked", newQuotes);
				let contentToStore = {};
				contentToStore[url] = newQuotes;
				browser.storage.local.set(contentToStore);
				setQuote(null);
				addNotification(
					<SimpleNotification
						title="Quote deleted!"
						message="The quote was deleted successfully."
					/>
				);
			});
	};
	const onEditClicked = () => {};
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
	// const editQuote = () => {
	// 	const newQuotes = quotes.slice();
	// 	// saveQuotes(newQuotes);
	// 	// setQuotes(newQuotes);
	// };
	// const deleteQuote = (quote) => {
	//
	// 	// saveQuotes(newQuotes);
	// 	// setQuotes(newQuotes);
	// };
	// function saveQuotes(quotes) {
	// }

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
					{/* <button
						title="Edit quote metadata"
						type="button"
						className="hover:text-gray-600"
						onClick={onEditClicked}
					>
						<PencilIcon className="h-6 w-6" />
					</button> */}
					<button
						title="Copy quote to clipboard"
						type="button"
						className="hover:text-gray-600"
						onClick={onCopyClicked}
					>
						<ClipboardCopyIcon className="h-6 w-6" />
					</button>
					<button
						title="Highlight quote in webpage"
						type="button"
						className="hover:text-gray-600"
						onClick={onFindClicked}
					>
						<DocumentSearchIcon className="h-6 w-6" />
					</button>
					<button
						title="Delete quote"
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
