import { createContext } from "react";

export type TabContext = {
	tab: TabWithCanonical;
};

const tabContext = createContext<TabContext>({
	tab: {
		index: 0,
		highlighted: false,
		pinned: false,
		incognito: false,
		active: false,
		canonical: "",
	},
});

export default tabContext;
