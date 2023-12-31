import React, { ReactNode, useCallback, useEffect, useState } from "react";
import tabContext from "contexts/tabContext";
type Props = { children: ReactNode; tab: browser.tabs.Tab };
// TODO: need to set an event listener for <link/> canonical change.. also probably for tab's url change
const TabProvider = ({ tab: initialTab, ...props }: Props) => {
	const [tab, setTab] = useState<TabWithCanonical>(() => {
		const canonical =
			(document.querySelector('link[rel="canonical"]') as HTMLLinkElement)
				?.href ||
			initialTab?.url ||
			"";
		return { ...initialTab, canonical };
	});

	const handleActiveTabChange = useCallback(
		(activeInfo: browser.tabs._OnActivatedActiveInfo) => {
			console.debug("handleActiveTabChange", activeInfo);
			if (activeInfo.windowId === tab.windowId) {
				browser.tabs.get(activeInfo.tabId).then((tab) => {
					const canonical =
						(document.querySelector('link[rel="canonical"]') as HTMLLinkElement)
							?.href ||
						initialTab?.url ||
						"";
					setTab({ ...tab, canonical });
				});
			}
		},
		[tab]
	);
	const handleOnUpdated = useCallback(
		(
			tabId: number,
			changeInfo: browser.tabs._OnUpdatedChangeInfo,
			tab: browser.tabs.Tab
		) => {
			console.debug("handleOnUpdated", tab);
			if (tab.windowId === tab.windowId) {
				const canonical =
					(document.querySelector('link[rel="canonical"]') as HTMLLinkElement)
						?.href ||
					initialTab?.url ||
					"";
				setTab({ ...tab, canonical });
			}
		},
		[tab]
	);

	useEffect(() => {
		browser.tabs.onUpdated.addListener(handleOnUpdated, {
			windowId: tab.windowId,
			properties: ["url"],
		});
		browser.tabs.onActivated.addListener(handleActiveTabChange);

		return () => {
			browser.tabs.onUpdated.removeListener(handleOnUpdated);
			browser.tabs.onActivated.removeListener(handleActiveTabChange);
		};
	}, []);
	//--
	const [value, setValue] = useState({ tab });
	const { Provider } = tabContext;

	useEffect(() => {
		setValue({ tab });
	}, [tab]);

	return <Provider value={value} {...props} />;
};

export default TabProvider;
