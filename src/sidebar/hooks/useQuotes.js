import { useEffect, useState } from "react";

function useQuotes(url) {
	const [quotes, setQuotes] = useState([]);

	const refresh = () => {
		console.log("refreshing", url);
		browser.storage.local
			.get(url)
			.then((storedInfo) => storedInfo[Object.keys(storedInfo)[0]] || [])
			.then(setQuotes)
			.then(() => console.log("refreshed", quotes));
	};
	useEffect(() => {
		if (!url) return;
		refresh();
	}, [url]);
	// useEffect(() => {
	// 	let contentToStore = {};
	// 	contentToStore[url] = quotes;
	// 	browser.storage.local.set(contentToStore);
	// 	setQuotes(dirtyQuotes);
	// }, [dirtyQuotes]);

	return quotes;
}

export default useQuotes;
