import React from "react";
import ReactDOM from "react-dom";
import "../tailwind.css";
import Settings from "./components/settings.jsx";

function setSidebarStyle(theme) {
	if (theme.colors) {
		document.body.style = `background: ${theme.colors.frame}; color: ${theme.colors.sidebar_text}; border-color: ${theme.colors.sidebar_border}`;
	} else {
		document.body.style = ``;
	}
}

browser.windows.getCurrent({ populate: true }).then((windowInfo) => {
	var appElement = document.createElement("div");
	document.body.appendChild(appElement);
	ReactDOM.render(
		<Settings tab={windowInfo.tabs.find((tab) => tab.active)} />,
		appElement
	);
	browser.theme.onUpdated.addListener(({ theme, windowId }) => {
		/*
		  Only update theme if it applies to the window the sidebar is in.
		  If a windowId is passed during an update, it means that the theme is applied to that specific window.
		  Otherwise, the theme is applied globally to all windows.
		*/
		if (!windowId || windowId == windowInfo.id) {
			setSidebarStyle(theme);
		}
	});
});

browser.theme.getCurrent().then(setSidebarStyle);
