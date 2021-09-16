import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../tailwind.css";
import Sidebar from "./Sidebar.jsx";

console.log("starting sidebar...");
// browser.runtime.onMessage.addListener(async (msg) => {
// 	if ((msg && msg.type === "NEW_QUOTE") || msg.type == "QUOTE_DELETED") {
// 		// for now, redraw content
// 		updateContent();
// 	}
// });

/*
When the sidebar loads, get the ID of its window,
and update its content.
*/
browser.windows.getCurrent({ populate: false }).then((windowInfo) => {
	ReactDOM.render(
		<Sidebar windowId={windowInfo.id} />,
		document.getElementById("app")
	);
});
