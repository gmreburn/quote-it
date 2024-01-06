import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { SwatchIcon } from "@heroicons/react/24/outline";
import useQuote from "hooks/useQuote";
import clsx from "clsx";

export default function HighlighterSelector() {
	const { saveHighlighterColor } = useQuote();
	const highlighters = [
		{ color: "bg-yellow-300 dark:bg-yellow-700", label: "Review" },
		{ color: "bg-green-300 dark:bg-green-700", label: "Term" },
		{ color: "bg-pink-300 dark:bg-pink-700", label: "Important" },
	];
	// TODO: remove `any` usage
	const onHighlighterChanged = (color: any) => {
		saveHighlighterColor(color.split("-")[1]);
	};

	return (
		<Menu
			as='div'
			className='relative inline-block text-left z-10'
			title={browser.i18n.getMessage("HighlightThisQuote")}
		>
			<div>
				<Menu.Button className='flex items-center hover:text-gray-600'>
					<span className='sr-only'>Open highlighter options</span>
					<SwatchIcon className='h-6 w-6' aria-hidden='true' />
				</Menu.Button>
			</div>

			<Transition
				as={Fragment}
				enter='transition ease-out duration-100'
				enterFrom='transform opacity-0 scale-95'
				enterTo='transform opacity-100 scale-100'
				leave='transition ease-in duration-75'
				leaveFrom='transform opacity-100 scale-100'
				leaveTo='transform opacity-0 scale-95'
			>
				<Menu.Items className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-slate-800 ring-1 ring-black dark:ring-white ring-opacity-5 focus:outline-none'>
					<div className='py-1'>
						<Menu.Item>
							{({ active }) => (
								<a
									href='#'
									className={clsx(
										active
											? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
											: "text-slate-700 dark:text-slate-300",
										"block px-4 py-2 text-sm space-x-2"
									)}
									onClick={() => onHighlighterChanged("")}
								>
									<span>None</span>
								</a>
							)}
						</Menu.Item>
						{highlighters.map((highlighter) => (
							<Menu.Item key={highlighter.color}>
								{({ active }) => (
									<a
										href='#'
										className={clsx(
											active
												? "g-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
												: "text-slate-700 dark:text-slate-300",
											"block px-4 py-2 text-sm space-x-2"
										)}
										onClick={() => onHighlighterChanged(highlighter.color)}
									>
										<span
											className={clsx(
												highlighter.color,
												"flex-shrink-0 inline-block h-2 w-2 rounded-full"
											)}
											aria-hidden='true'
										/>
										<span>{highlighter.label}</span>
									</a>
								)}
							</Menu.Item>
						))}
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
