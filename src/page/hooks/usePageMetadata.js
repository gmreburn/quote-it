import { useEffect, useState } from "react";
import PageMetadataAPI from "../api/PageMetadataAPI.js";

function usePageMetadata(tab) {
	const [pageMetadata, setPageMetadata] = useState({});
	const api = PageMetadataAPI(tab.url);

	useEffect(() => {
		Promise.all([
			browser.tabs
				.executeScript({
					file: `../contentScripts/meta-reader.js`,
				})
				.then((result) => result[0])
				.then((metadata) => ({
					articleTitle: metadata.headline || metadata.title || "",
					websiteTitle: metadata?.isPartOf?.name || "",
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
				.then((newMetadata) => api.save("page", newMetadata)),
			api.get("user"),
		])
			.then((values) => {
				console.log("values", values);
				return Object.assign({}, ...values);
			})
			.then((pageMetadata) => {
				console.log("metadata from webpage", pageMetadata);

				return pageMetadata;
			})
			.then(setPageMetadata);
	}, [tab]);

	return [pageMetadata, api];
}

export default usePageMetadata;
