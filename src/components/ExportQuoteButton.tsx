import { ClipboardDocumentIcon } from "@heroicons/react/24/outline";
import React, { MouseEventHandler } from "react";
import Button from "./Button";

interface Props {
	onClick?: MouseEventHandler<HTMLButtonElement>;
}

function ExportQuoteButton({ onClick }: Props) {
	return (
		<Button title={browser.i18n.getMessage("btnCopyQuote")} onClick={onClick}>
			<ClipboardDocumentIcon className='h-6 w-6' />
		</Button>
	);
}

export default ExportQuoteButton;
