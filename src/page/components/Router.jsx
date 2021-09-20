import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import usePageMetadata from "../hooks/usePageMetadata";
import EditElement from "./EditElement.jsx";
import ViewPageMetadata from "./ViewPageMetadata.jsx";

function router({ tab }) {
	const [pageMetadata] = usePageMetadata(tab);
	console.log("pageMetadata", pageMetadata);

	return (
		<Router>
			<Switch>
				<Route path="/edit" component={EditElement} />
				<Route path="/">
					<ViewPageMetadata tab={tab} />
				</Route>
			</Switch>
		</Router>
	);
}

export default router;
