import React, { ReactNode } from "react";

function Layout({ children }: { children: ReactNode }) {
	return (
		<div className='bg-slate-100 dark:bg-slate-900 h-screen overflow-y-auto dark:text-slate-100'>
			{children}
		</div>
	);
}

export default Layout;
