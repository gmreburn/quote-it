import React from "react";
import { Link } from "react-router-dom";

function Metadata({ label, data }) {
	return (
		<div className="mx-3 py-4">
			<div className="text-gray-600 ml-2 mb-2">{label}</div>
			<Link
				className="flex justify-between hover:bg-gray-200 rounded p-2"
				to={{ pathname: "/edit", state: { label, data } }}
				state={{ label, data }}
			>
				<div>
					{Array.isArray(data)
						? data.join(", ")
						: data || browser.i18n.getMessage("NotSpecified")}
				</div>
				<div className="self-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M9 5l7 7-7 7"
						/>
					</svg>
				</div>
			</Link>
		</div>
	);
}

export default Metadata;
