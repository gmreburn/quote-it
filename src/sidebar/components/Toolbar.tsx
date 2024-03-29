import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import {
	DocumentDuplicateIcon,
	DocumentMagnifyingGlassIcon,
	TrashIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import useQuote from "hooks/useQuote";

export default function Toolbar({ quote }: { quote: Quote }) {
	const { deleteQuote } = useQuote();
	const onCopyClicked = () => {
		navigator.clipboard.writeText(quote.text);

		browser.notifications.create(`${quote.id}-copied`, {
			type: "basic",
			title: browser.i18n.getMessage("QuoteCopiedTitle"),
			message: browser.i18n.getMessage("QuoteCopied"),
		});
		setTimeout(() => {
			browser.notifications.clear(`${quote.id}-copied`);
		}, 7000);
	};
	const onFindClicked = () => {
		browser.find
			.find(quote.text, {
				caseSensitive: true,
			})
			.then((finds) => {
				if (finds.count > 0) {
					browser.find.highlightResults({ noScroll: false });
				}
			});
	};
	return (
		<Menu as='div' className='relative inline-block text-left'>
			<div>
				<Menu.Button className='flex items-center hover:text-gray-600'>
					<span className='sr-only'>Open options</span>
					<EllipsisVerticalIcon className='h-6 w-6' aria-hidden='true' />
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
				<Menu.Items className='origin-top-right z-10 break-words absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
					<div className='py-1'>
						<Menu.Item>
							{({ active }) => (
								<button
									className={clsx(
										active ? "bg-gray-100 text-gray-900" : "text-gray-700",
										"group flex w-full items-center px-4 py-2 text-sm"
									)}
									onClick={onCopyClicked}
									title={browser.i18n.getMessage("btnCopyQuote")}
								>
									<DocumentDuplicateIcon
										className='mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500'
										aria-hidden='true'
									/>
									{browser.i18n.getMessage("btnCopyQuote")}
								</button>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<button
									className={clsx(
										active ? "bg-gray-100 text-gray-900" : "text-gray-700",
										"group flex w-full items-center px-4 py-2 text-sm"
									)}
									onClick={onFindClicked}
									title={browser.i18n.getMessage("btnHighlightQuote")}
								>
									<DocumentMagnifyingGlassIcon
										className='mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500'
										aria-hidden='true'
									/>
									{browser.i18n.getMessage("mnuHighlightQuote")}
								</button>
							)}
						</Menu.Item>
						<Menu.Item>
							{({ active }) => (
								<button
									className={clsx(
										active ? "bg-gray-100 text-gray-900" : "text-gray-700",
										"group flex w-full items-center px-4 py-2 text-sm"
									)}
									onClick={deleteQuote}
									title={browser.i18n.getMessage("btnDeleteQuote")}
								>
									<TrashIcon
										className='mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500'
										aria-hidden='true'
									/>
									{browser.i18n.getMessage("btnDeleteQuote")}
								</button>
							)}
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}
