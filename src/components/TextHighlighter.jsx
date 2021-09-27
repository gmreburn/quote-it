import React from "react";
import classNames from "../util/classNames";

function TextHighlighter({ children, color }) {
	return (
		<span
			className={classNames(
				color === "yellow" && "bg-yellow-300", // class name expanded for minifier
				color === "green" && "bg-green-300",
				color === "pink" && "bg-pink-300"
			)}
		>
			{children}
		</span>
	);
}

export default TextHighlighter;
