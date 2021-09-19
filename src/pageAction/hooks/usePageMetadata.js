import { useEffect, useState } from "react";

function usePageMetadata(tab) {
	const [pageMetadata, setPageMetadata] = useState({});
	const url = new URL(tab.url);
	const id = `meta-${url.hostname}${url.pathname}`;

	const updatePageMetadata = (newPageMetadata) => {
		let contentToStore = {
			[id]: Object.assign({}, pageMetadata, newPageMetadata),
		};

		return browser.storage.local
			.set(contentToStore)
			.then(() => setPageMetadata(contentToStore[id]));
	};

	useEffect(() => {
		browser.storage.local
			.get(id)
			.then((storedInfo) => storedInfo[Object.keys(storedInfo)[0]])
			.then((pageMetadata) => {
				// TODO: send message to fetch metadata from page if we don't have anything stored yet
				console.log("registering content script", JSON.stringify(url));

				browser.tabs
					.executeScript({
						file: `../user_scripts/meta-reader.js`,
					})
					.then((result) => result[0])
					.then((metadata) => ({
						articleTitle: metadata.headline || metadata.title || "",
						websiteTitle: metadata?.isPartOf["name"] || "",
						publisher:
							metadata.publisher?.name ||
							(typeof metadata.publisher === "string" && metadata.publisher) ||
							"",
						url:
							(metadata.mainEntityOfPage &&
								metadata.mainEntityOfPage["@type"] === "WebPage" &&
								metadata.mainEntityOfPage["@id"]) ||
							metadata.url,
						published: metadata.datePublished || metadata.dateCreated || "",
						contributors:
							(Array.isArray(metadata.author) &&
								metadata.author.map((author) => author.name)) ||
							[],
					}))
					.then(setPageMetadata);

				// if (!pageMetadata) {
				// 	return browser.runtime
				// 		.sendMessage("fetchPageMetadata")
				// 		.then(updatePageMetadata);
				// }

				// return setPageMetadata(pageMetadata);
			});
	}, [tab]);

	return [pageMetadata];
}

export default usePageMetadata;
