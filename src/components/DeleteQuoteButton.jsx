import { TrashIcon } from "@heroicons/react/outline";
import React from "react";
import Button from "./Button.jsx";

function DeleteQuoteButton({ onClick }) {
	return (
		<Button title={browser.i18n.getMessage("btnDeleteQuote")} onClick={onClick}>
			<TrashIcon className="h-6 w-6" />
		</Button>
	);
}

export default DeleteQuoteButton;
