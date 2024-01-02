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
						const url = await browser.tabs.sendMessage(tab.id, {
							action: "getCanonicalURL",
						});

						if (url) {
							setTab({ ...tab, url });
						}
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
			console.debug("handleOnUpdated", tab);
			if (tab.windowId === tab.windowId && tab.id) {
				getCanonicalURL();
			}
		},
		[tab]
	);
	async function getCanonicalURL() {
		if (initialTab.id) {
			const url = await browser.tabs.sendMessage(initialTab.id, {
				action: "getCanonicalURL",
			});
			if (url) {
				setTab({ ...initialTab, url });
			}
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
