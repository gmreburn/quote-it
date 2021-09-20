import React, { useState } from "react";
import Moment from "react-moment";
import {
	ClipboardCopyIcon,
	DocumentSearchIcon,
	TrashIcon,
} from "@heroicons/react/outline";

function SidebarQuote({ quote, deleteQuote }) {
	const onCopyClicked = () => {
		navigator.clipboard.writeText(quote.text);

		browser.notifications.create(`${quote.id}-copied`, {
			type: "basic",
			title: browser.i18n.getMessage("QuoteCopiedTitle"),
			message: browser.i18n.getMessage("QuoteCopied"),
		});
		setTimeout(() => {
			browser.notifications.clear(`${quote.id}-copied`);
		}, 7000);
	};
	const onDeleteClicked = () => {
		// TODO: confirm delete before delete or add undo button to notification
		deleteQuote(quote).then(() => {
			browser.notifications.create(`${quote.id}-deleted`, {
				type: "basic",
				title: browser.i18n.getMessage("QuoteDeletedTitle"),
				message: browser.i18n.getMessage("QuoteDeleted"),
			});
			setTimeout(() => {
				browser.notifications.clear(`${quote.id}-deleted`);
			}, 7000);
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
		<li className="relative py-5 px-4">
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
				<p className="line-clamp-5">"{quote.text}"</p>
			</div>
			<div className="flex justify-between space-x-3 mt-2">
				<div className="min-w-0 flex-1"></div>
				<div className="flex flex-shrink-0 whitespace-nowrap space-x-2">
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
