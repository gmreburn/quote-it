import { createContext } from "react";

export type TabContext = {
	tab: browser.tabs.Tab;
};

const tabContext = createContext<TabContext>({} as TabContext);

export default tabContext;
