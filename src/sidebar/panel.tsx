import React from "react";
import ReactDOM from "react-dom";
import Sidebar from "./components/Sidebar";
import TabProvider from "providers/TabProvider";
import "tailwind.css";
import Layout from "./layout";

function setSidebarStyle(theme: browser._manifest.ThemeType) {
	console.log("theme info", theme);
	if (theme.colors) {
		document.body.style.cssText = `background: ${theme.colors.frame}; color: ${theme.colors.sidebar_text}; border-color: ${theme.colors.sidebar_border}`;
	} else {
		document.body.style.cssText = ``;
	}
}

browser.tabs
	.query({
		currentWindow: true,
		active: true,
	})
	.then(async function render(tabs: browser.tabs.Tab[]) {
		if (tabs.length === 1) {
			const tab = tabs[0];

			if (tab && tab.id) {
				let url: string;
				try {
					url = await Promise.race([
						browser.tabs.sendMessage(tab.id, {
							action: "getCanonicalURL",
						}),
						new Promise<string>((resolve) =>
							setTimeout(() => resolve(""), 3000)
						),
					]);
				} catch (error) {
					console.error("Error or Timeout:", error);
					url = tab.url || "";
				}

				ReactDOM.render(
					<Layout>
						<TabProvider tab={{ ...tab, url }}>
							<Sidebar />
						</TabProvider>
					</Layout>,
					document.body
				);
			}
		}
	});

browser.windows.getCurrent({ populate: false }).then(async (windowInfo) => {
	if (windowInfo) {
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
	}
});

browser.theme.getCurrent().then(setSidebarStyle);
