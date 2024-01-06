import React from "react";
import DeleteQuoteButton from "./DeleteQuoteButton";
import ExportQuoteButton from "./ExportQuoteButton";
import TextHighlighter from "./TextHighlighter";
import useQuote from "hooks/useQuote";
import Moment from "react-moment";

function HomeQuote() {
	const { quote } = useQuote();
	const onCopyClicked = () => {
		navigator.clipboard.writeText(quote.text);

		browser.notifications
			.create(`${quote.id}-copied`, {
				type: "basic",
				title: browser.i18n.getMessage("QuoteCopiedTitle"),
				message: browser.i18n.getMessage("QuoteCopied"),
			})
			.then(() =>
				setTimeout(() => {
					browser.notifications.clear(`${quote.id}-copied`);
				}, 7000)
			);
	};

	return (
		<div>
			{/* TODO: filter quotes by label
			 {quote.highlighter && (
				<a href="#" className="inline-block">
					<span
						className={clsx(
							quote.highlighter.color,
							"inline-flex bg-green-300 items-center px-3 py-0.5 rounded-full text-sm font-medium"
						)}
					>
						{quote.highlighter.label || "review"}
					</span>
				</a>
			)} */}

			<a href={quote.url} className='block mt-4 text-gray-500' target='_blank'>
				<p>{quote.url}</p>
				<p className='text-xl font-semibold text-gray-900 dark:text-gray-100'>
					{quote.websiteTitle}
				</p>
				<p className='mt-3 text-base text-gray-900 dark:text-gray-100'>
					<TextHighlighter color={quote?.highlighter?.color}>
						<span className='italic text-lg'>"{quote.text}"</span>
					</TextHighlighter>{" "}
					&mdash;{" "}
					<Moment
						className='flex-shrink-0 whitespace-nowrap text-sm text-gray-500'
						fromNow
						withTitle
					>
						{quote.created}
					</Moment>
				</p>
			</a>
			{quote.annotation && (
				<p className='dark:text-slate-100 mt-2'>{quote.annotation.text}</p>
			)}

			<div className='flex flex-shrink-0 whitespace-nowrap space-x-2 justify-end text-gray-500'>
				<ExportQuoteButton onClick={onCopyClicked} />
				<DeleteQuoteButton />
			</div>
			{/* TODO: add citation metadata
			 {quote.author && (
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
