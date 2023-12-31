import React, { MouseEventHandler, ReactNode } from "react";
import clsx, { ClassValue } from "clsx";

interface Props {
	onClick?: MouseEventHandler<HTMLButtonElement>;
	children: ReactNode;
	title: string;
	className?: ClassValue;
	type?: "button" | "submit" | "reset";
}

function Button({
	onClick,
	children,
	title,
	className,
	type = "button",
}: Props) {
	return (
		<button
			title={title}
			type={type}
			className={clsx("hover:text-gray-600", className)}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default Button;
