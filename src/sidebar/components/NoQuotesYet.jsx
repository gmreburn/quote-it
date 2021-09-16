import React from "react";
import { FolderAddIcon } from "@heroicons/react/outline";

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

export default NoQuotesYet;
