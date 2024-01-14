import { QueryClient } from "@tanstack/react-query";

// Declare the queryClient property on the window object
declare global {
	interface Window {
		queryClient: QueryClient;
	}
}
