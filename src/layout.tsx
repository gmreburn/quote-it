import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactNode, useEffect, useState } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
	const [queryClient, setQueryClient] = useState<QueryClient>();

	useEffect(() => {
		const fetchQueryClient = async () => {
			const backgroundPage = await browser.runtime.getBackgroundPage();
			setQueryClient(backgroundPage.window.queryClient);
		};

		fetchQueryClient();
	}, []); // Empty dependency array to run the effect only once on mount

	// TODO: show loading component?
	if (!queryClient) return null;
	return (
		// Provide the client to your App
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
