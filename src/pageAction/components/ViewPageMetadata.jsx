import React from "react";
import usePageMetadata from "../hooks/usePageMetadata";
import Metadata from "./Metadata.jsx";

function ViewPageMetadata({ tab }) {
	const [pageMetadata] = usePageMetadata(tab);
	console.log("pageMetadata", pageMetadata);

	return (
		<div className="w-96 select-none divide-y">
			<div className="flex justify-center m-4">
				<h1 className="leading-6 font-bold text-gray-900">Page metadata</h1>
			</div>
			<Metadata label="Article title" data={pageMetadata.articleTitle} />
			<Metadata label="Website title" data={pageMetadata.websiteTitle} />
			<Metadata label="Publisher" data={pageMetadata.publisher} />
			<Metadata label="Canonical address" data={pageMetadata.url} />
			<Metadata label="Publish date" data={pageMetadata.published} />
			<Metadata label="Contributors" data={pageMetadata.contributors} />
		</div>
	);
}

export default ViewPageMetadata;
