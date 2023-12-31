import React, { ReactNode } from "react";
import clsx from "clsx";

function TextHighlighter({
	children,
	color,
}: {
	children: ReactNode;
	color?: HighlighterColor;
}) {
	return (
		<span
			className={clsx(
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
