import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function calculateRelativeTime(timestamp: number | string): string {
	const now = new Date();
	const createdDate = new Date(timestamp);

	const elapsedMilliseconds = now.getTime() - createdDate.getTime();
	const seconds = Math.floor(elapsedMilliseconds / 1000);

	const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

	if (seconds < 60) {
		return rtf.format(-seconds, "second");
	} else if (seconds < 3600) {
		const minutes = Math.floor(seconds / 60);
		return rtf.format(-minutes, "minute");
	} else if (seconds < 86400) {
		const hours = Math.floor(seconds / 3600);
		return rtf.format(-hours, "hour");
	} else {
		const days = Math.floor(seconds / 86400);
		return rtf.format(-days, "day");
	}
}
