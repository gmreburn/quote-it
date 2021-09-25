import { ClipboardCopyIcon } from "@heroicons/react/outline";
import React from "react";
import Button from "./Button.jsx";

function ExportQuoteButton({ onClick }) {
	return (
		<Button title={browser.i18n.getMessage("btnCopyQuote")} onClick={onClick}>
			<ClipboardCopyIcon className="h-6 w-6" />
		</Button>
	);
}

export default ExportQuoteButton;
