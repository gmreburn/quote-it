import React from "react";
import { useState } from "react";
import { RadioGroup } from "@headlessui/react";

const settings = [
	{
		name: "MLA 8 (Modern Language Association)",
		description:
			"Popular with arts and humanities to cite paintings, books, and other literature.",
	},
	{
		name: "APA 6 (American Psychological Association)",
		description: "Designed for technical works in social science studies.",
	},
	{
		name: "Quote text only",
		description:
			"You don't care about the other metadata and just want the quote.",
	},
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Example() {
	const [selected, setSelected] = useState(settings[0]);
	// TODO: add theme support
	return (
		<RadioGroup value={selected} onChange={setSelected}>
			<RadioGroup.Label className="block font-medium">
				Citation format
			</RadioGroup.Label>

			<div className="bg-white rounded-md -space-y-px">
				{settings.map((setting, settingIdx) => (
					<RadioGroup.Option
						key={setting.name}
						value={setting}
						className={({ checked }) =>
							classNames(
								settingIdx === 0 ? "rounded-tl-md rounded-tr-md" : "",
								settingIdx === settings.length - 1
									? "rounded-bl-md rounded-br-md"
									: "",
								checked
									? "bg-indigo-50 border-indigo-200 z-10"
									: "border-gray-200",
								"relative border p-4 flex cursor-pointer focus:outline-none"
							)
						}
					>
						{({ active, checked }) => (
							<>
								<span
									className={classNames(
										checked
											? "bg-indigo-600 border-transparent"
											: "bg-white border-gray-300",
										active ? "ring-2 ring-offset-2 ring-indigo-500" : "",
										"h-4 w-4 mt-0.5 cursor-pointer rounded-full border flex items-center justify-center"
									)}
									aria-hidden="true"
								>
									<span className="rounded-full bg-white w-1.5 h-1.5" />
								</span>
								<div className="ml-3 flex flex-col">
									<RadioGroup.Label
										as="span"
										className={classNames(
											checked ? "text-indigo-900" : "text-gray-900",
											"block font-medium"
										)}
									>
										{setting.name}
									</RadioGroup.Label>
									<RadioGroup.Description
										as="span"
										className={classNames(
											checked ? "text-indigo-700" : "text-gray-500",
											"block"
										)}
									>
										{setting.description}
									</RadioGroup.Description>
								</div>
							</>
						)}
					</RadioGroup.Option>
				))}
			</div>
		</RadioGroup>
	);
}
