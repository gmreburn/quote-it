import quoteContext from "contexts/quoteContext";
import { useCallback, useContext, useEffect } from "react";

function useQuote() {
	const context = useContext(quoteContext);

	if (!context) {
		throw new Error("useQuote must be used within a QuoteProvider");
	}

	return context;
}
export default useQuote;
