import React from "react";

function Input({ id, name, type, autoComplete, className }) {
	const handleBlur = (e) => {
		// TODO: save to local storage using [name]
		console.log(e.target.value);
	};
	return (
		<input
			id={id}
			name={name}
			type={type}
			autoComplete={autoComplete}
			className={className}
			onBlur={handleBlur}
		/>
	);
}

export default Input;
