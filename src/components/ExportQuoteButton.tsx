import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import React, { MouseEventHandler } from "react";
import Button from "./Button";

function ExportQuoteButton({
	onClick,
}: {
	onClick: MouseEventHandler<HTMLButtonElement>;
}) {
	return (
		<Button title={browser.i18n.getMessage("btnCopyQuote")} onClick={onClick}>
			<ClipboardDocumentIcon className='h-6 w-6' />
		</Button>
	);
}

export default ExportQuoteButton;
