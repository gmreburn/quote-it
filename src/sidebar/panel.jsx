import React from "react";
import ReactDOM from "react-dom";
import "../tailwind.css";
import Sidebar from "./components/Sidebar.jsx";

browser.windows.getCurrent({ populate: true }).then((windowInfo) => {
	console.debug(
		"wininfo",
		windowInfo.tabs.find((tab) => tab.active)
	);
	ReactDOM.render(
		<Sidebar tab={windowInfo.tabs.find((tab) => tab.active)} />,
		document.body
	);
});
