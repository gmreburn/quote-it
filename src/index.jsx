import React from "react";
import ReactDOM from "react-dom";
import "./tailwind.css";

ReactDOM.render(
	<>
		<div className="md:flex md:items-center md:justify-between">
			<div className="flex-1 min-w-0">
				<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
					Quote Explorer
				</h2>
			</div>
		</div>
	</>,
	document.body
);
