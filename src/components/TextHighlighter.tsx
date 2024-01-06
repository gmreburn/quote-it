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
				color === "yellow" && "bg-yellow-300 dark:bg-yellow-700", // class name expanded for minifier
				color === "green" && "bg-green-300 dark:bg-green-700",
				color === "pink" && "bg-pink-300 dark:bg-pink-700",
				"px-1",
				color && "dark:text-gray-900"
			)}
		>
			{children}
		</span>
	);
}

export default TextHighlighter;
