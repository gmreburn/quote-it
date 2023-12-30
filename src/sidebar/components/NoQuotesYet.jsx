import React from "react";
import { FolderPlusIcon } from "@heroicons/react/24/outline";

function NoQuotesYet() {
	return (
		<div className='flex justify-center mt-4'>
			<div>
				<FolderPlusIcon className='mx-auto h-12 w-12' />
				<h3 className='mt-2 font-bold text-center'>
					{browser.i18n.getMessage("NoQuotesYet")}
				</h3>
				<p className='mt-1 mx-8 text-center'>
					{browser.i18n.getMessage("NoQuotes_GetStarted")}
				</p>
			</div>
		</div>
	);
}

export default NoQuotesYet;
