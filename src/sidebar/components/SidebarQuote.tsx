import React from "react";
import Annotation from "components/Annotation";
import HighlighterSelector from "components/HighlighterSelector";
import Toolbar from "./Toolbar";
import TextHighlighter from "components/TextHighlighter";
import useQuote from "hooks/useQuote";
import { calculateRelativeTime } from "lib/utils";

function SidebarQuote() {
	const { quote } = useQuote();

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
				{calculateRelativeTime(quote.created)}
			</div>
			<div className='mt-1'>
				<p className='italic text-lg'>
					<TextHighlighter color={quote?.highlighter?.color}>
						&quot;{quote.text}&quot;
					</TextHighlighter>
				</p>
			</div>
			<div className='flex justify-between space-x-3 mt-2'>
				<div className='min-w-0 flex-1'></div>
				<div className='flex flex-shrink-0 whitespace-nowrap space-x-2'>
					<HighlighterSelector />
					<Toolbar quote={quote} />
				</div>
			</div>

			<Annotation />
		</li>
	);
}

export default SidebarQuote;
