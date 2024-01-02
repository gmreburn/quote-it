import tabContext from "contexts/tabContext";
import { useContext } from "react";

function useTab() {
	const context = useContext(tabContext);

	if (!context) {
		throw new Error("useTab must be used within a TabProvider");
	}

	return [context.tab];
}
export default useTab;
