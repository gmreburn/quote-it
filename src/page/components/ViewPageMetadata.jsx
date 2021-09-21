import React from "react";
import usePageMetadata from "../hooks/usePageMetadata";
import Metadata from "./Metadata.jsx";
import ThemeContext from "../../components/ThemeContext.js";

function ViewPageMetadata({ tab }) {
	const [pageMetadata] = usePageMetadata(tab);
	console.log("pageMetadata", pageMetadata);

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
						<Metadata
							label={browser.i18n.getMessage("Article title")}
							data={pageMetadata.articleTitle}
						/>
						<Metadata
							label={browser.i18n.getMessage("Website title")}
							data={pageMetadata.websiteTitle}
						/>
						<Metadata
							label={browser.i18n.getMessage("Publisher")}
							data={pageMetadata.publisher}
						/>
						<Metadata
							label={browser.i18n.getMessage("Canonical address")}
							data={pageMetadata.url}
						/>
						<Metadata
							label={browser.i18n.getMessage("Publish date")}
							data={pageMetadata.published}
						/>
						<Metadata
							label={browser.i18n.getMessage("Contributors")}
							data={pageMetadata.contributors}
						/>
					</div>
				</div>
			)}
		</ThemeContext.Consumer>
	);
}

export default ViewPageMetadata;
