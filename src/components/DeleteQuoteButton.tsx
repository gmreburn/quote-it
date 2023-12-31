import { TrashIcon } from "@heroicons/react/24/outline";
import React, { MouseEventHandler } from "react";
import Button from "./Button";

function DeleteQuoteButton({
	onClick,
}: {
	onClick: MouseEventHandler<HTMLButtonElement>;
}) {
	return (
		<Button title={browser.i18n.getMessage("btnDeleteQuote")} onClick={onClick}>
			<TrashIcon className='h-6 w-6' />
		</Button>
	);
}

export default DeleteQuoteButton;
