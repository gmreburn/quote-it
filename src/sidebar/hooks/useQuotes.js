import { useEffect, useState } from "react";

function useQuotes(url) {
	const [quotes, setQuotes] = useState([]);

	useEffect(() => {
		browser.storage.local
			.get(url)
			.then((storedInfo) => storedInfo[Object.keys(storedInfo)[0]] || [])
			.then(setQuotes);
	}, [url]);

	return [quotes, setQuotes];
}

export default useQuotes;
