import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ColorSwatchIcon } from "@heroicons/react/outline";
import classNames from "../util/classNames";

export default function LabelSelector({ onChange }) {
	const highlighters = [
		{ color: "bg-yellow-300", label: "Review" },
		{ color: "bg-green-300", label: "Term" },
		{ color: "bg-pink-300", label: "Important" },
	];
	const onHighlighterChanged = (color) => {
		onChange(color.split("-")[1]);
	};

	return (
		<Menu as="div" className="relative inline-block text-left z-10">
			<div>
				<Menu.Button className="flex items-center hover:text-gray-600">
					<span className="sr-only">Open highlighter options</span>
					<ColorSwatchIcon className="h-6 w-6" aria-hidden="true" />
				</Menu.Button>
			</div>

			<Transition
				as={Fragment}
				enter="transition ease-out duration-100"
				enterFrom="transform opacity-0 scale-95"
				enterTo="transform opacity-100 scale-100"
				leave="transition ease-in duration-75"
				leaveFrom="transform opacity-100 scale-100"
				leaveTo="transform opacity-0 scale-95"
			>
				<Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
					<div className="py-1">
						<Menu.Item>
							{({ active }) => (
								<a
									href="#"
									className={classNames(
										active ? "bg-gray-100 text-gray-900" : "text-gray-700",
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
										href="#"
										className={classNames(
											active ? "bg-gray-100 text-gray-900" : "text-gray-700",
											"block px-4 py-2 text-sm space-x-2"
										)}
										onClick={() => onHighlighterChanged(highlighter.color)}
									>
										<span
											className={classNames(
												highlighter.color,
												"flex-shrink-0 inline-block h-2 w-2 rounded-full"
											)}
											aria-hidden="true"
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
