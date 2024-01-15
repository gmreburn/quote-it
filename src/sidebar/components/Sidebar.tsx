import React from "react";
import SidebarQuote from "./SidebarQuote";
import useQuotes from "../../hooks/useQuotes";
import NoQuotesYet from "./NoQuotesYet";
import QuoteProvider from "providers/QuoteProvider";
import useTab from "hooks/useTab";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "components/ui/collapsible";
import { Button } from "components/ui/button";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

function Sidebar() {
	const [tab] = useTab();
	const [quotes] = useQuotes(tab.url);
	const [isOpen, setIsOpen] = React.useState(false);

	if (!Array.isArray(quotes)) {
		return null;
	} else if (quotes.length === 0) {
		return <NoQuotesYet />;
	} else {
		return (
			<>
				<Collapsible
					open={isOpen}
					onOpenChange={setIsOpen}
					className='space-y-2'
				>
					<div className='flex items-center justify-between space-x-4 px-4 hover:bg-zinc-200'>
						<CollapsibleTrigger asChild>
							<Button variant='ghost' size='sm' className='w-9 p-0'>
								{/* <ChevronUpDownIcon /> */}
								{isOpen ? (
									<ChevronDownIcon className='h-4 w-4' />
								) : (
									<ChevronRightIcon className='h-4 w-4' />
								)}
								<span className='sr-only'>Toggle</span>
							</Button>
						</CollapsibleTrigger>
						<h4 className=''>Grouped by something</h4>
					</div>
					<CollapsibleContent className='space-y-2'>
						{/* <div className='rounded-md border px-4 py-3 font-mono text-sm'>
							Mock Quote 1
						</div>
						<div className='rounded-md border px-4 py-3 font-mono text-sm'>
							Mock Quote 2
						</div> */}
						{quotes.map((quote) => (
							<QuoteProvider quote={quote} key={quote.id}>
								<SidebarQuote />
							</QuoteProvider>
						))}
					</CollapsibleContent>
				</Collapsible>
			</>
		);
	}
}

export default Sidebar;
