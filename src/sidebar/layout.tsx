import RootLayout from "layout";
import React, { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
	return (
		<RootLayout>
			<div className='bg-slate-100 dark:bg-slate-900 h-screen overflow-y-auto dark:text-slate-100'>
				{children}
			</div>
		</RootLayout>
	);
}

export default Layout;
