import React from "react";
import ReactDOM from "react-dom";
import "../tailwind.css";
import Sidebar from "./components/Sidebar.jsx";

browser.windows.getCurrent({ populate: true }).then((windowInfo) => {
	browser.theme.getCurrent().then((styles) => {
		console.log(styles.colors);
		if (styles.colors) {
			document.body.style = `background: ${styles.colors.sidebar}; color: ${styles.colors.sidebar_text}; border-color: ${styles.colors.sidebar_border}`;
			// TODO: respect color from styles.colors.icons for icons
		}
	});
	var appElement = document.createElement("div");
	document.body.appendChild(appElement);
	ReactDOM.render(
		<Sidebar tab={windowInfo.tabs.find((tab) => tab.active)} />,
		appElement
	);
});
