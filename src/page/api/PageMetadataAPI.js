const PageMetadataAPI = function (uri) {
	const url = new URL(uri);
	const id = `${url.hostname}${url.pathname}`;

	const get = (scope) =>
		browser.storage.local
			.get(`${scope}-${id}`)
			.then((storedInfo) => storedInfo[Object.keys(storedInfo)[0]]);

	// scope - user or page
	// newMetadata - object of key(s) to save for the webpage
	// remove - array of keys to remove
	const save = (scope, newMetadata, remove) =>
		get(scope).then((storedPageMetadata) => {
			const key = `${scope}-${id}`;
			const record = {
				[key]: Object.assign({}, storedPageMetadata, newMetadata),
			};
			if (Array.isArray(remove)) {
				remove.forEach((removeKey) => {
					delete record[key][removeKey];
				});
			}
			return browser.storage.local.set(record).then(() => record[key]);
		});
	const exists = (scope, key) =>
		get(scope).then((metadata) => metadata && metadata.hasOwnProperty(key));

	return {
		get,
		save,
		exists,
	};
};
export default PageMetadataAPI;
