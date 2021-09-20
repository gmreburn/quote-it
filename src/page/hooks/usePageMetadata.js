import { useEffect, useState } from "react";

function usePageMetadata(tab) {
	const [pageMetadata, setPageMetadata] = useState({});
	const [pageMetadataFromUser, setPageMetadataFromUser] = useState({});
	const url = new URL(tab.url);
	const id = `${url.hostname}${url.pathname}`;

	useEffect(() => {
		Promise.all([
			Promise.all([
				browser.storage.local
					.get(`page-${id}`)
					.then((storedInfo) => storedInfo[Object.keys(storedInfo)[0]]),
				browser.tabs
					.executeScript({
						file: `../contentScripts/meta-reader.js`,
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
					})),
			]).then((values) => Object.assign({}, ...values)),
			browser.storage.local
				.get(`user-${id}`)
				.then((storedInfo) => storedInfo[Object.keys(storedInfo)[0]])
				.then(setPageMetadataFromUser),
		])
			.then((values) => Object.assign({}, ...values))
			.then((pageMetadata) => {
				// if (
				// 	pageMetadata.published &&
				// 	!(pageMetadata.published instanceof Date)
				// ) {
				// 	pageMetadata.published2 = pageMetadata.published;
				// 	pageMetadata.published = new Date(pageMetadata.published);
				// }
				return pageMetadata;
			})
			.then(setPageMetadata);
	}, [tab]);

	return [pageMetadata, pageMetadataFromUser];
}

export default usePageMetadata;
