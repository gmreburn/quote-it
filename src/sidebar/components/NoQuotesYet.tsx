import React from "react";
import { FolderPlusIcon } from "@heroicons/react/24/outline";

function NoQuotesYet() {
	return (
		<div className='flex justify-center items-center h-full dark:text-gray-100'>
			<div>
				<FolderPlusIcon className='mx-auto h-12 w-12' />
				<h3 className='mt-2x font-bold text-center text-xl'>
					{browser.i18n.getMessage("NoQuotesYet")}
				</h3>
				<p className='mt-1 mx-8 text-center text-gray-500'>
					{browser.i18n.getMessage("NoQuotes_GetStarted")}
				</p>
			</div>
		</div>
	);
}

export default NoQuotesYet;
