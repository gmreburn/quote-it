import useQuote from "hooks/useQuote";
import React, { useState } from "react";

function Annotation({
	showAnnotationInput,
	setShowAnnotationInput,
}: {
	showAnnotationInput: boolean;
	setShowAnnotationInput: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	const {
		quote: { annotation },
		saveAnnotation,
	} = useQuote();
	const [annotationText, setAnnotationText] = useState<string>(
		annotation?.text || ""
	);
	const onAnnotationBlurred = (quoteText: string) => {
		saveAnnotation(quoteText);
		setShowAnnotationInput(false);
	};

	if (showAnnotationInput) {
		return (
			<textarea
				rows={5}
				className='mt-2 w-full border border-gray-500 dark:bg-slate-950'
				ref={(input) => input && input.focus()}
				onBlur={() => onAnnotationBlurred(annotationText)}
				onChange={(e) => setAnnotationText(e.target.value)}
				value={annotationText}
			/>
		);
	} else if (annotation) {
		return (
			<div className='mt-2' onClick={() => setShowAnnotationInput(true)}>
				&mdash; {annotation.text}
			</div>
		);
	} else {
		return null;
	}
}

export default Annotation;
