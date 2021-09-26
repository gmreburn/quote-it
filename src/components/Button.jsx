import React from "react";
import classNames from "../util/classNames";

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
