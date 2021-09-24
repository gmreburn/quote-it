import React from "react";
import DeleteQuoteButton from "../components/DeleteQuoteButton.jsx";
import ExportQuoteButton from "../components/ExportQuoteButton.jsx";

function HomeQuote({ quote, deleteQuote }) {
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
	const onDeleteClicked = () => deleteQuote(quote);

	return (
		<div>
			{/* <a href={quote.category.href} className="inline-block">
								<span
									className={classNames(
										quote.category.color,
										"inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium"
									)}
								>
									{quote.category.name}
								</span>
							</a> */}

			<a
				href={quote.tab.url}
				className="block mt-4 text-gray-500"
				target="_blank"
			>
				<p>{quote.tab.url.substr(0, 40)}</p>
				<p className="text-xl font-semibold text-gray-500">
					{quote.websiteTitle}
				</p>
				<p className="mt-3 text-base text-gray-900">
					{quote.published} &mdash; "{quote.text}"
				</p>
			</a>

			<div className="flex flex-shrink-0 whitespace-nowrap space-x-2 justify-end text-gray-500">
				{/* TODO: make toolbar component, pass quote to it */}
				<ExportQuoteButton onClick={onCopyClicked} />
				<DeleteQuoteButton onClick={onDeleteClicked} />
			</div>
			{/* {quote.author && (
								<div className="mt-6 flex items-center">
									<div className="ml-3">
										<p className="text-sm font-medium text-gray-900">
											<a href={quote.author.href}>{quote.author.name}</a>
										</p>
										<div className="flex space-x-1 text-sm text-gray-500">
											<time dateTime={quote.datetime}>{quote.date}</time>
											<span aria-hidden="true">&middot;</span>
										</div>
									</div>
								</div>
							)} */}
		</div>
	);
}

export default HomeQuote;
