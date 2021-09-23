import React from "react";
import ReactDOM from "react-dom";
import DeleteQuoteButton from "../components/DeleteQuoteButton.jsx";
import ExportQuoteButton from "../components/ExportQuoteButton.jsx";
import useQuotes from "../hooks/useQuotes";
import "../tailwind.css";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

function Home() {
	const [quotes, deleteQuote] = useQuotes();

	// TODO: remove duplicate code
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

	return (
		<div className="bg-white pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
			<div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 lg:max-w-7xl">
				<div>
					<h2 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl">
						Quotes
					</h2>
					{/* <p className="mt-3 text-xl text-gray-500 sm:mt-4">
						Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat
						massa dictumst amet. Sapien tortor lacus arcu.
					</p> */}
				</div>
				<div className="mt-12 grid gap-16 pt-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-12">
					{quotes.map((quote) => (
						<div key={quote.id}>
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
								href={`https://${quote.url}`}
								className="block mt-4 text-gray-500"
								target="_blank"
							>
								<p>{`https://${quote.url.substr(0, 40)}`}</p>
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
					))}
				</div>
			</div>
		</div>
	);
}

ReactDOM.render(<Home />, document.body);
