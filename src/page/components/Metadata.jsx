import React, { useState } from "react";
import { Link } from "react-router-dom";
import ThemeContext from "../../components/ThemeContext.js";

function Metadata({ label, data, url }) {
	const [isActive, setIsActive] = useState(false);
	return (
		<ThemeContext.Consumer>
			{({ colors }) => (
				<div className="mx-3 py-2">
					<div className="ml-2 mb-1">{browser.i18n.getMessage(label)}</div>
					<Link
						className="flex justify-between rounded p-2"
						to={{ pathname: "/edit", state: { label, data, url } }}
						state={{ label, data }}
						style={{
							background:
								isActive && (colors?.popup_highlight || "rgba(229, 231, 235)"),
						}}
						onMouseOver={() => setIsActive(true)}
						onMouseOut={() => setIsActive(false)}
					>
						<div>
							{Array.isArray(data) && data.length > 0
								? data.join(", ")
								: (!Array.isArray(data) && data) ||
								  browser.i18n.getMessage("NotSpecified")}
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
			)}
		</ThemeContext.Consumer>
	);
}

export default Metadata;
