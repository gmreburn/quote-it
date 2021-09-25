import React, { useState } from "react";

function Annotation({
	quote,
	showAnnotationInput,
	setShowAnnotationInput,
	onAnnotationBlurred,
}) {
	const { annotation } = quote;
	const [annotationText, setAnnotationText] = useState(
		quote.annotation?.text || ""
	);

	if (showAnnotationInput) {
		return (
			<textarea
				rows="5"
				className="mt-2 w-full border border-gray-500"
				ref={(input) => input && input.focus()}
				onBlur={() => onAnnotationBlurred(annotationText)}
				onChange={(e) => setAnnotationText(e.target.value)}
				value={annotationText}
			/>
		);
	} else if (annotation) {
		return (
			<div className="mt-2" onClick={() => setShowAnnotationInput(true)}>
				&mdash; {annotation?.text}
			</div>
		);
	} else {
		return null;
	}
}

export default Annotation;
