import React from "react";
import ReactDOM from "react-dom";
import "../tailwind.css";
import Router from "./components/Router.jsx";

browser.windows.getCurrent({ populate: true }).then((windowInfo) => {
	ReactDOM.render(
		<Router tab={windowInfo.tabs.find((tab) => tab.active)} />,
		document.body
	);
});
