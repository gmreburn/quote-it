import React from "react";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

function Button({ onClick, children, title, className, type = "button" }) {
	return (
		<button
			title={title}
			type={type}
			className={classNames("hover:text-gray-600", className)}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default Button;
