import * as React from "react";
import TextareaAutosize, {
	TextareaAutosizeProps,
} from "react-textarea-autosize";
import { cn } from "lib/utils";

export interface TextareaProps extends TextareaAutosizeProps {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, ...props }, ref) => {
		return (
			<TextareaAutosize
				className={cn(
					"flex w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:placeholder:text-gray-400 dark:focus-visible:ring-gray-300",
					className
				)}
				ref={ref}
				{...props}
				minRows={1}
				maxRows={5}
			/>
		);
	}
);
Textarea.displayName = "Textarea";

export { Textarea };
