import React from "react";
import ReactDOM from "react-dom";
import "./tailwind.css";

const pages = [
	{
		name: "Sidebar",
		description: "",
		href: "sidebar.html",
	},
];

ReactDOM.render(
	<>
		<ul role="list" className="divide-y divide-gray-200">
			{pages.map((page) => (
				<li key={page.name} className="py-4 flex">
					<div className="ml-3">
						<p className="text-sm font-medium text-gray-900">
							<a href={page.href}>{page.name}</a>
						</p>
						<p className="text-sm text-gray-500">{page.description}</p>
					</div>
				</li>
			))}
		</ul>
	</>,
	document.body
);
