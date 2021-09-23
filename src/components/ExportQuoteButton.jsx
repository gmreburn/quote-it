import { ClipboardCopyIcon } from "@heroicons/react/outline";
import React from "react";

function ExportQuoteButton({ onClick }) {
	return (
		<button
			title={browser.i18n.getMessage("btnCopyQuote")}
			type="button"
			className="hover:text-gray-600"
			onClick={onClick}
		>
			<ClipboardCopyIcon className="h-6 w-6" />
		</button>
	);
}

export default ExportQuoteButton;
