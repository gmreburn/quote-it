import React, { useState } from "react";
import useQuotes from "../hooks/useQuotes";

function Annotation({ quote, showAnnotationInput, setShowAnnotationInput }) {
	const { annotation, url } = quote;
	const [quotes, saveAnnotation, saveHighlighterColor, deleteQuote] =
		useQuotes(url);
	const [annotationText, setAnnotationText] = useState(
		quote.annotation?.text || ""
	);

	if (showAnnotationInput) {
		return (
			<textarea
				rows='5'
				className='mt-2 w-full border border-gray-500'
				ref={(input) => input && input.focus()}
				onBlur={() => {
					setShowAnnotationInput(false);
					saveAnnotation(quote, annotationText);
				}}
				onChange={(e) => setAnnotationText(e.target.value)}
				value={annotationText}
			/>
		);
	} else if (annotation && annotation.text) {
		return (
			<div className='mt-2' onClick={() => setShowAnnotationInput(true)}>
				&mdash; {annotation?.text}
			</div>
		);
	} else {
		return null;
	}
}

export default Annotation;
