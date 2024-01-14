import { useInfiniteQuery } from "@tanstack/react-query";

type PageOfQuotes = {
	results: Quote[];
	nextCursor: number;
};

export default function useInfiniteQuotes() {
	const fetchQuotes = async ({ pageParam = 0 }): Promise<PageOfQuotes> => {
		// TODO: read from local storage via QuoteAPI.ts
		const res = await fetch("/api/quotes?cursor=" + pageParam);
		return res.json();
	};

	return useInfiniteQuery({
		queryKey: ["quotes"],
		queryFn: fetchQuotes,
		initialPageParam: 0,
		getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
	});
}
