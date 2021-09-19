import React, { useEffect } from "react";
import usePageMetadata from "../hooks/usePageMetadata.js";
import Input from "./Input.jsx";

export default function EditPageMetadata({ tab }) {
	const [pageMetadata, setPageMetadata] = usePageMetadata(tab);
	console.log("pageMetadata", pageMetadata);
	// const messageListener = (message, sender, sendResponse) => {};

	// useEffect(() => {
	// 	browser.runtime.onMessage.addListener(messageListener);
	// 	console.log("tab", tab);
	// 	return () => {
	// 		browser.runtime.onMessage.removeListener(messageListener);
	// 	};
	// }, [tab]);

	return (
		<form className="space-y-8 divide-y divide-gray-200 select-none m-4">
			<div className="space-y-8 divide-y divide-gray-200">
				<div className="space-y-6 sm:space-y-5">
					<div>
						<h3 className="text-lg leading-6 font-medium text-gray-900">
							Page metadata
						</h3>
						<p className="mt-1 max-w-2xl text-sm text-gray-500">
							View and manage details about this webpage to add context and
							meaning to saved quotes.
						</p>
					</div>
					<div className="space-y-6 sm:space-y-5">
						<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
							<label
								htmlFor="first-name"
								className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
							>
								Article title
							</label>
							<div className="mt-1 sm:mt-0 sm:col-span-2">
								<input
									type="text"
									name="first-name"
									id="first-name"
									autoComplete="none"
									className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
									value={pageMetadata.articleTitle}
								/>
							</div>
						</div>

						<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
							<label
								htmlFor="last-name"
								className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
							>
								Website title
							</label>
							<div className="mt-1 sm:mt-0 sm:col-span-2">
								<input
									type="text"
									name="last-name"
									id="last-name"
									autoComplete="none"
									value={pageMetadata.websiteTitle}
									className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
								/>
							</div>
						</div>

						<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
							>
								Publisher <span className="text-gray-500">(or sponsor)</span>
							</label>
							<div className="mt-1 sm:mt-0 sm:col-span-2">
								<Input
									id="email"
									name="email"
									type="text"
									autoComplete="none"
									value={pageMetadata.publisher}
									className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
								/>
							</div>
						</div>

						<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
							<label
								htmlFor="country"
								className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
							>
								Canonical Address
							</label>
							<div className="mt-1 sm:mt-0 sm:col-span-2">
								<input
									id="email"
									name="email"
									type="url"
									autoComplete="none"
									value={pageMetadata.url}
									className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
									placeholder="https://"
								/>
							</div>
						</div>

						<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
							<label
								htmlFor="street-address"
								className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
							>
								Published <span className="text-gray-500">(online)</span>
							</label>
							<div className="mt-1 sm:mt-0 sm:col-span-2">
								<input
									type="date"
									name="street-address"
									id="street-address"
									autoComplete="none"
									value={pageMetadata.published}
									className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="space-y-6 sm:space-y-5">
					<div>
						<h3 className="text-lg leading-6 font-medium text-gray-900">
							Contributors
						</h3>
						<p className="mt-1 max-w-2xl text-sm text-gray-500">
							The term "contributors" is used loosely to mean the person or
							group primarily responsible for producing the source material.
							Writers, editors, translators, performers, and corporate authors
							may be relevant to your citations.
						</p>
					</div>
					<div className="space-y-6 sm:space-y-5">
						<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
							>
								Publisher <span className="text-gray-500">(or sponsor)</span>
							</label>
							<div className="mt-1 sm:mt-0 sm:col-span-2">
								<input
									id="email"
									name="email"
									type="text"
									autoComplete="none"
									className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
								/>
							</div>
						</div>

						<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
							<label
								htmlFor="country"
								className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
							>
								Canonical Address
							</label>
							<div className="mt-1 sm:mt-0 sm:col-span-2">
								<input
									id="email"
									name="email"
									type="url"
									autoComplete="none"
									className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
									placeholder="https://"
								/>
							</div>
						</div>

						<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
							<label
								htmlFor="street-address"
								className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
							>
								Published <span className="text-gray-500">(online)</span>
							</label>
							<div className="mt-1 sm:mt-0 sm:col-span-2">
								<input
									type="date"
									name="street-address"
									id="street-address"
									autoComplete="none"
									className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
}
