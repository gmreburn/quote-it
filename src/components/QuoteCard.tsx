import React from "react";
import { Button } from "components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "components/ui/card";
import useQuote from "hooks/useQuote";
import { calculateRelativeTime } from "lib/utils";
import { TrashIcon } from "@heroicons/react/24/solid";
import Annotation from "./Annotation";
export default function QuoteCard() {
	const { quote, deleteQuote, saveAnnotation } = useQuote();

	if (!quote.id) return null;

	return (
		<Card className='relative overflow-hidden'>
			<CardHeader className='flex flex-row items-center border-b'>
				<CardTitle className='line-clamp-1 text-sm'>
					<a
						className='inline-block text-blue-500 hover:text-blue-700'
						href={quote.url}
						title={quote.websiteTitle}
					>
						{quote.websiteTitle}
					</a>
				</CardTitle>
				<CardDescription className='ml-auto'>
					{calculateRelativeTime(quote.created)}
				</CardDescription>
			</CardHeader>
			<CardContent className='p-6'>
				<div className='text-xl leading-relaxed'>
					<span className='select-none'>&quot;</span>
					{quote.text}
					<span className='select-none'>&quot;</span>
				</div>
				<div className='mt-4 text-gray-500 italic'>
					<Annotation />
				</div>
			</CardContent>
			<CardFooter>
				<div className='flex justify-between items-center'>
					<Button
						variant={"destructive"}
						// className='bg-red-500 hover:bg-red-600 text-white'
						onClick={deleteQuote}
						title={browser.i18n.getMessage("btnDeleteQuote")}
					>
						<TrashIcon className='h-4 w-6' />
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
}
