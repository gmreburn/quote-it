import { TrashIcon } from "@heroicons/react/outline";
import React from "react";

function DeleteQuoteButton({ onClick }) {
	return (
		<button
			title={browser.i18n.getMessage("btnDeleteQuote")}
			type="button"
			className="hover:text-gray-600"
			onClick={onClick}
		>
			<TrashIcon className="h-6 w-6" />
		</button>
	);
}

export default DeleteQuoteButton;
