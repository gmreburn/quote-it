import Button from "../../components/Button.jsx";
import React, { useState } from "react";
import Moment from "react-moment";
import { AnnotationIcon } from "@heroicons/react/outline";
import Annotation from "../../components/Annotation.jsx";
import HighlighterSelector from "../../components/HighlighterSelector.jsx";
import Toolbar from "./Toolbar.jsx";
import TextHighlighter from "../../components/TextHighlighter.jsx";

function SidebarQuote({
	quote,
	saveAnnotation,
	saveHighlighterColor,
	deleteQuote,
}) {
	const [showAnnotationInput, setShowAnnotationInput] = useState(false);
	const onAnnotationBlurred = (quoteText) => {
		saveAnnotation(quote, quoteText);
		setShowAnnotationInput(false);
	};
	const onAnnotationClicked = () => {
		setShowAnnotationInput(true);
	};
	const onHighlighterChanged = (newColor) => {
		saveHighlighterColor(quote, newColor);
	};

	if (!quote) return null;

	return (
		<li className="relative py-5 px-4">
			<div className="flex justify-between space-x-3">
				<div className="min-w-0 flex-1">
					<a href="#" className="block focus:outline-none">
						<p className="text-sm font-medium text-gray-900 truncate">
							{quote.author}
						</p>
						<p className="text-sm text-gray-500 truncate">{quote.subject}</p>
					</a>
				</div>
				<Moment
					className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500"
					fromNow
				>
					{quote.created}
				</Moment>
			</div>
			<div className="mt-1">
				<p className="italic">
					<TextHighlighter color={quote?.highlighter?.color}>
						"{quote.text}"
					</TextHighlighter>
				</p>
			</div>
			<div className="flex justify-between space-x-3 mt-2">
				<div className="min-w-0 flex-1"></div>
				<div className="flex flex-shrink-0 whitespace-nowrap space-x-2">
					<Button
						onClick={onAnnotationClicked}
						title={browser.i18n.getMessage("btnAnnotate")}
					>
						<AnnotationIcon className="h-6 w-6" />
					</Button>
					<HighlighterSelector onChange={onHighlighterChanged} />
					<Toolbar quote={quote} deleteQuote={deleteQuote} />
				</div>
			</div>

			<Annotation
				quote={quote}
				showAnnotationInput={showAnnotationInput}
				setShowAnnotationInput={setShowAnnotationInput}
				onAnnotationBlurred={onAnnotationBlurred}
			/>
		</li>
	);
}

export default SidebarQuote;
