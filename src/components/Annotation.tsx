import useQuote from "hooks/useQuote";
import React, { useState } from "react";
import { Textarea } from "./ui/textarea";

function Annotation() {
	const { quote, saveAnnotation } = useQuote();
	const [annotationText, setAnnotationText] = useState<string>(
		quote.annotation?.text || ""
	);
	const onAnnotationBlurred = (quoteText: string) => {
		saveAnnotation(quoteText);
	};

	return (
		<Textarea
			className='mt-2 w-full border border-gray-500 dark:bg-slate-950'
			onBlur={() => onAnnotationBlurred(annotationText)}
			onChange={(e) => setAnnotationText(e.target.value)}
			placeholder={browser.i18n.getMessage("AnnotationPlaceholderText")}
			value={annotationText}
		/>
	);
}

export default Annotation;
