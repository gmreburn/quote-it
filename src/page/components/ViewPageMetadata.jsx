import React from "react";
import usePageMetadata from "../hooks/usePageMetadata";
import Metadata from "./Metadata.jsx";
import ThemeContext from "../../components/ThemeContext.js";

const metadataKeys = [
	"articleTitle",
	"websiteTitle",
	"publisher",
	"url",
	"published",
	"contributors",
];

function ViewPageMetadata({ tab }) {
	const [pageMetadata] = usePageMetadata(tab);
	// console.log("pageMetadata", pageMetadata);

	return (
		<ThemeContext.Consumer>
			{({ colors }) => (
				<div className="w-96 select-none divide-y">
					<div className="flex justify-center m-4">
						<h1 className="leading-6 font-bold">
							{browser.i18n.getMessage(
								"MetadataForHostname",
								new URL(tab.url).hostname
							)}
						</h1>
					</div>
					<div className="pt-2" style={{ borderColor: colors?.popup_border }}>
						{metadataKeys.map((metadataKey) => (
							<Metadata
								key={metadataKey}
								label={metadataKey}
								data={pageMetadata[metadataKey]}
								url={tab.url}
							/>
						))}
					</div>
				</div>
			)}
		</ThemeContext.Consumer>
	);
}

export default ViewPageMetadata;
