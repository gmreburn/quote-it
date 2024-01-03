import React, { ReactNode, useCallback, useEffect, useState } from "react";
import tabContext, { TabContext } from "contexts/tabContext";
type Props = { children: ReactNode; tab: browser.tabs.Tab };
// TODO: need to set an event listener for <link/> canonical change..
const TabProvider = ({ tab: initialTab, ...props }: Props) => {
	const [tab, setTab] = useState<browser.tabs.Tab>(initialTab);

	const handleActiveTabChange = useCallback(
		(activeInfo: browser.tabs._OnActivatedActiveInfo) => {
			console.debug("handleActiveTabChange", activeInfo);

			if (tab && activeInfo.windowId === tab.windowId) {
				browser.tabs.get(activeInfo.tabId).then(async (tab) => {
					if (tab.id) {
						console.debug("handlingActiveTabChange", tab);
						setTabAsync(tab.id, tab);
					}
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
			console.debug("handleOnUpdated", tabId, tab.id);
			if (tab.windowId === tab.windowId && tabId) {
				console.debug("handlingOnUpdated", tabId, tab.id);
				setTabAsync(tabId, tab);
			}
		},
		[tab]
	);
	async function setTabAsync(tabId: number, tab: browser.tabs.Tab) {
		let url = tab.url;
		try {
			url = await browser.tabs.sendMessage(tabId, {
				action: "getCanonicalURL",
			});
		} catch {
		} finally {
			setTab({ ...tab, url });
		}
	}
	useEffect(() => {
		browser.tabs.onUpdated.addListener(handleOnUpdated, {
			windowId: initialTab.windowId,
			properties: ["url"],
		});
		browser.tabs.onActivated.addListener(handleActiveTabChange);

		return () => {
			browser.tabs.onUpdated.removeListener(handleOnUpdated);
			browser.tabs.onActivated.removeListener(handleActiveTabChange);
		};
	}, [initialTab]);

	//--
	const [value, setValue] = useState<TabContext>({ tab });
	const { Provider } = tabContext;

	useEffect(() => {
		setValue({ tab });
	}, [tab]);

	return <Provider value={value} {...props} />;
};

export default TabProvider;
