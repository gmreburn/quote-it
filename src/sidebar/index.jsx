import React, { useState } from "react";
import ReactDOM from "react-dom";
import "../tailwind.css";
import Sidebar from "./components/Sidebar.jsx";

browser.windows.getCurrent({ populate: false }).then((windowInfo) => {
	ReactDOM.render(<Sidebar windowId={windowInfo.id} />, document.body);
});
