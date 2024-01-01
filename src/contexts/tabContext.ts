import { createContext } from "react";

export type TabContext =
	| undefined
	| {
			tab: TabWithCanonical;
	  };

const tabContext = createContext<TabContext>(undefined);

export default tabContext;
