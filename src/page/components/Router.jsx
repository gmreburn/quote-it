import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import EditElement from "./EditElement.jsx";
import ThemeContext from "../../components/ThemeContext.js";
import ViewPageMetadata from "./ViewPageMetadata.jsx";

function router({ tab }) {
	const [theme, setTheme] = useState({
		colors: {
			button_primary: "#0061e0",
			button_primary_color: "rgb(251,251,254)",
		},
		images: {},
		properties: {},
	});
	console.log("router", theme);
	// const handleThemeUpdateEvent = ({ theme, windowId }) => {
	// 	if (!windowId || windowId == windowInfo.id) {
	// 		setTheme(theme);
	// 	}
	// };

	useEffect(() => {
		// browser.theme.onUpdated.addListener(handleThemeUpdateEvent);
		browser.theme.getCurrent().then((browserTheme) => {
			if (browserTheme.colors) {
				setTheme(Object.assign({}, theme, browserTheme));
			}
		});
		return () => {
			// browser.theme.onUpdated.removeListener(handleThemeUpdateEvent);
		};
	}, [tab]);

	document.body.style.backgroundColor = theme?.colors?.popup;
	document.body.style.color = theme?.colors?.popup_text;

	return (
		<ThemeContext.Provider value={theme}>
			<Router>
				<Switch>
					<Route path="/edit" component={EditElement} />
					<Route path="/">
						<ViewPageMetadata tab={tab} />
					</Route>
				</Switch>
			</Router>
		</ThemeContext.Provider>
	);
}

export default router;
