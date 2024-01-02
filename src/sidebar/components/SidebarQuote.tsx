import Button from "components/Button";
import React, { useState } from "react";
import Moment from "react-moment";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/outline";
import Annotation from "components/Annotation";
import HighlighterSelector from "components/HighlighterSelector";
import Toolbar from "./Toolbar";
import TextHighlighter from "components/TextHighlighter";
import useQuote from "hooks/useQuote";

function SidebarQuote() {
	const { quote, saveAnnotation } = useQuote();
	const [showAnnotationInput, setShowAnnotationInput] = useState(false);
	const onAnnotationBlurred = (quoteText: string) => {
		saveAnnotation(quoteText);
		setShowAnnotationInput(false);
	};
	const onAnnotationClicked = () => {
		setShowAnnotationInput(true);
	};

	if (!quote) return null;

	return (
		<li className='relative py-5 px-4'>
			<div className='flex justify-between space-x-3'>
				<div className='min-w-0 flex-1'>
					<a href={quote.url} className='block focus:outline-none'>
						<p className='text-sm font-medium text-gray-900x truncate'>
							{quote.websiteTitle}
						</p>
						<p className='text-sm text-gray-500 truncate'>{quote.url}</p>
					</a>
				</div>
				<Moment
					className='flex-shrink-0 whitespace-nowrap text-sm text-gray-500'
					fromNow
					withTitle
				>
					{quote.created}
				</Moment>
			</div>
			<div className='mt-1'>
				<p className='italic'>
					<TextHighlighter color={quote?.highlighter?.color}>
						&quot;{quote.text}&quot;
					</TextHighlighter>
				</p>
			</div>
			<div className='flex justify-between space-x-3 mt-2'>
				<div className='min-w-0 flex-1'></div>
				<div className='flex flex-shrink-0 whitespace-nowrap space-x-2'>
					<Button
						onClick={onAnnotationClicked}
						title={browser.i18n.getMessage("btnAnnotate")}
					>
						<ChatBubbleBottomCenterTextIcon className='h-6 w-6' />
					</Button>
					<HighlighterSelector />
					<Toolbar quote={quote} />
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
