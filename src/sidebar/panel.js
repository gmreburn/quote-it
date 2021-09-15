// moz-extension://63d4e716-a90b-4791-ba81-74a0d32e0915/sidebar/panel.html
import "./tailwind.css";
var myWindowId;
const contentBox = document.querySelector("#content");

browser.runtime.onMessage.addListener(async (msg) => {
	if ((msg && msg.type === "NEW_QUOTE") || msg.type == "QUOTE_DELETED") {
		// for now, redraw content
		updateContent();
	}
});

/*
Update the sidebar's content.

1) Get the active tab in this sidebar's window.
2) Get its stored content.
3) Put it in the content box.
*/
function updateContent() {
	browser.tabs
		.query({ windowId: myWindowId, active: true })
		.then((tabs) => {
			const tabUrl = new URL(tabs[0].url);
			const id = tabUrl.hostname + tabUrl.pathname;

			return browser.storage.local.get(id);
		})
		.then((storedInfo) => {
			const quotes = storedInfo[Object.keys(storedInfo)[0]]; // contentBox.textContent=

			// reset content
			var div = document.getElementsByTagName("body")[0];
			div.innerHTML = "";

			if (!quotes || !quotes.length) {
				div.className = "text-center m-3";
				div.innerHTML = `
					<svg class="h-12 w-12 text-gray-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
						<path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
					</svg>
				`;

				let h3 = document.createElement("h3");
				h3.className = "mt-2 font-medium text-gray-900 text-center";
				h3.innerText = browser.i18n.getMessage("NoQuotes");
				let p = document.createElement("p");
				p.className = "mt-1 text-gray-500 text-center";
				p.innerText = browser.i18n.getMessage("NoQuotes_GetStarted");

				div.appendChild(h3);
				div.appendChild(p);

				return;
			}
			div.className = "";

			let ul = document.createElement("ul");
			ul.className = "divide-y divide-gray-200";
			ul.role = "list";

			// for (let quote of quotes) {
			quotes.forEach((quote, i) => {
				let li = document.createElement("li");
				li.className = "relative bg-white py-5 px-4 hover:bg-gray-50";

				let div1 = document.createElement("div");
				div1.className = "flex justify-between space-x-3";
				let div1_1 = document.createElement("div");
				div1_1.className = "min-w-0 flex-1";

				if (quote.author) {
					let div1_1_p = document.createElement("p");
					div1_1_p.className = "font-medium text-gray-900 truncate";
					div1_1_p.innerText = quote.author;
					div1_1.appendChild(div1_1_p);
				}

				let div1_time = document.createElement("time");
				div1_time.datetime = quote.created;
				div1_time.className =
					"flex-shrink-0 whitespace-nowrap text-sm text-gray-500";
				div1_time.innerText = moment(quote.created).fromNow();
				div1.appendChild(div1_1);
				div1.appendChild(div1_time);

				let div2 = document.createElement("div");
				div2.className = "mt-1";

				let quoteLink = document.createElement("button");
				quoteLink.className =
					"block focus:outline-none line-clamp-2 text-gray-600";
				quoteLink.onclick = async function () {
					const finds = await browser.find.find(quote.text, {
						caseSensitive: true,
					});
					if (finds.count > 0) {
						browser.find.highlightResults({ noScroll: false });
					}
				};
				quoteLink.innerText = `"${quote.text}"`;
				div2.appendChild(quoteLink);

				let div3 = document.createElement("div");
				div3.className = "flex justify-between space-x-2";
				let btnDeleteQuote = document.createElement("button");
				btnDeleteQuote.title = browser.i18n.getMessage("btnDeleteQuote");
				btnDeleteQuote.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
			  </svg>`;
				btnDeleteQuote.className =
					"flex justify-center items-center p-2 text-sm font-medium text-gray-700 hover:text-red-800";
				btnDeleteQuote.onclick = function () {
					const pageUrl = Object.keys(storedInfo)[0];
					quotes.splice(i, 1);

					let contentToStore = {};
					contentToStore[pageUrl] = quotes;
					browser.storage.local.set(contentToStore);

					updateContent();
				};
				let btnCopyQuote = document.createElement("button");
				btnCopyQuote.title = browser.i18n.getMessage("btnCopyQuote");
				btnCopyQuote.className =
					"flex justify-center items-center p-2 text-sm font-medium text-gray-700 hover:text-gray-800";
				btnCopyQuote.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
			  </svg>`;
				btnCopyQuote.onclick = () => navigator.clipboard.writeText(quote.text);

				let div3_1 = document.createElement("div");
				div3_1.className = "min-w-0 flex-1";
				div3.appendChild(div3_1);
				div3.appendChild(btnCopyQuote);
				div3.appendChild(btnDeleteQuote);

				li.appendChild(div1);
				li.appendChild(div2);
				li.appendChild(div3);

				ul.appendChild(li);
			});

			div.appendChild(ul);
		});
}

/*
Update content when a new tab becomes active.
*/
browser.tabs.onActivated.addListener(updateContent);

/*
Update content when a new page is loaded into a tab.
*/
browser.tabs.onUpdated.addListener(updateContent);

/*
When the sidebar loads, get the ID of its window,
and update its content.
*/
browser.windows.getCurrent({ populate: true }).then((windowInfo) => {
	myWindowId = windowInfo.id;
	updateContent();
});
