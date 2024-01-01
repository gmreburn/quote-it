import React, { ReactNode, useCallback, useEffect, useState } from "react";
import tabContext, { TabContext } from "contexts/tabContext";
type Props = { children: ReactNode; tab: browser.tabs.Tab };
// TODO: need to set an event listener for <link/> canonical change..
const TabProvider = ({ tab: initialTab, ...props }: Props) => {
	const [tab, setTab] = useState<TabWithCanonical | undefined>();

	const handleActiveTabChange = useCallback(
		(activeInfo: browser.tabs._OnActivatedActiveInfo) => {
			console.debug("handleActiveTabChange", activeInfo);

			if (tab && activeInfo.windowId === tab.windowId) {
				browser.tabs.get(activeInfo.tabId).then(async (tab) => {
					if (tab.id) {
						const response = await browser.tabs.sendMessage(tab.id, {
							action: "getCanonicalURL",
						});

						if (response && response.canonicalURL) {
							setTab({ ...tab, canonical: response.canonicalURL });
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
			const response = await browser.tabs.sendMessage(initialTab.id, {
				action: "getCanonicalURL",
			});
			if (response && response.canonical) {
				setTab({ ...initialTab, canonical: response.canonical });
			}
		}
	}
	useEffect(() => {
		getCanonicalURL();

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
	const [value, setValue] = useState<TabContext>();
	const { Provider } = tabContext;

	useEffect(() => {
		if (tab) {
			setValue({ tab });
		} else {
			setValue(undefined);
		}
	}, [tab]);

	return <Provider value={value} {...props} />;
};

export default TabProvider;
