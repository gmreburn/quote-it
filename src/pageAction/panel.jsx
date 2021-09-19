import React from "react";
import ReactDOM from "react-dom";
import "../tailwind.css";
import EditPageMetadata from "./components/EditPageMetadata.jsx";

browser.windows.getCurrent({ populate: true }).then((windowInfo) => {
	console.debug(
		"page_action",
		windowInfo.tabs.find((tab) => tab.active)
	);
	ReactDOM.render(
		<EditPageMetadata tab={windowInfo.tabs.find((tab) => tab.active)} />,
		document.body
	);
});
