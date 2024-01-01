const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const pkg = require("./package.json");
const manifest = require("./src/manifest.json");

const manifest_pages = [
	{ sidebar_action: manifest?.sidebar_action?.default_panel },
	{ page_action: manifest?.page_action?.default_popup },
	{ browser_action: manifest?.browser_action?.default_popup },
	{ devtools_page: manifest?.devtools_page?.devtools_page },
	{ background_page: manifest?.background?.page },
].filter((manifest_page) => {
	const file = manifest_page[Object.keys(manifest_page)[0]];
	return file && fs.existsSync(path.resolve(__dirname, "src", file));
});

// Creates HTML pages from TSX files located in ./src/pages
const pages_path = path.resolve(__dirname, "./src/pages");
if (fs.existsSync(pages_path)) {
	manifest_pages.push(
		...fs
			.readdirSync(pages_path)
			.filter((path) => path.endsWith(".tsx"))
			.map((page_path) => ({
				[path.parse(page_path).name]: path.join("pages", page_path),
			}))
	);
}

const tsxEntries = manifest_pages
	.filter((page) => path.extname(page[Object.keys(page)[0]]) === ".tsx")
	.map((page) => {
		const key = Object.keys(page)[0];

		return {
			[key]: {
				import: path.resolve(__dirname, "src", page[key]),
				filename: `${page[key]
					.replace(path.win32.sep, path.posix.sep)
					.substr(0, page[key].length - 4)}.js`,
			},
		};
	});

// Assuming manifest has a 'content_scripts' property
const content_scripts = manifest.content_scripts || [];

const csEntries = content_scripts.map((resource) => {
	if (resource.js && resource.js.length > 0) {
		// Assuming there's only one JS file in the array, you might need to adjust if there are multiple
		const jsFileName = resource.js[0];
		const key = path.parse(jsFileName).name;

		return {
			[key]: path.resolve(__dirname, "./src", jsFileName),
		};
	}

	return {};
});

module.exports = {
	mode: process.env.npm_package_config_mode, // development - see https://webpack.js.org/configuration/devtool/
	devtool:
		process.env.npm_package_config_mode === "production"
			? false
			: "cheap-module-source-map",
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
		modules: [path.resolve(__dirname, "src"), "node_modules"],
	},
	entry: Object.assign(
		{},
		...tsxEntries,
		...csEntries,
		...(manifest["background"] &&
			Array.isArray(manifest["background"].scripts) &&
			manifest["background"].scripts.map((script, i) => ({
				[path.parse(script).name]: path.resolve(__dirname, "./src", script),
			})))
	),
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "addon"),
		clean: true,
	},
	plugins: [
		...manifest_pages
			.filter((manifest_page) => {
				const file = manifest_page[Object.keys(manifest_page)[0]];
				return path.extname(file) === ".tsx";
			})
			.map((page) => {
				const key = Object.keys(page)[0];

				return new HtmlWebpackPlugin({
					title: manifest[key]?.default_title || key,
					filename: page[key].replace(".tsx", ".html"),
					chunks: [key],
					inject: "body",
					meta: {
						viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
					},
				});
			}),
		new CopyPlugin({
			patterns: [
				{ from: "src/icons", to: "icons" },
				{ from: "src/_locales", to: "_locales" },
				{
					from: "src/manifest.json",
					to: "manifest.json",
					transform: (content) => {
						const manifest = JSON.parse(content.toString());
						manifest.version = pkg.version;

						if (Array.isArray(manifest.background.scripts)) {
							manifest.background.scripts = manifest.background.scripts.map(
								(script) => script.replace(".ts", ".js")
							);
						}
						if (Array.isArray(manifest.content_scripts)) {
							manifest.content_scripts = manifest.content_scripts.map((cs) => ({
								...cs,
								js: cs.js.map((script) => script.replace(".ts", ".js")),
							}));
						}

						manifest_pages.forEach((page) => {
							const key = Object.keys(page)[0];

							switch (key) {
								case "background":
									// TODO: need to test this, I don't need it so not testing it
									manifest[key].page = page[key].replace(".tsx", ".html");
									break;

								case "sidebar_action":
								case "devtools_page":
									manifest[key].default_panel = page[key].replace(
										".tsx",
										".html"
									);
									break;

								case "page_action":
								case "browser_action":
									manifest[key].default_popup = page[key].replace(
										".tsx",
										".html"
									);

									break;
							}
						});

						return JSON.stringify(manifest);
					},
				},
				{
					from: "src/pages/**/*",
					to: "pages",
					noErrorOnMissing: true,
					globOptions: {
						ignore: ["**/*.tsx"],
					},
				},
				...manifest_pages
					.filter((manifest_page) => {
						const file = manifest_page[Object.keys(manifest_page)[0]];
						return path.extname(file) === ".html";
					})
					.map((page) => {
						const key = Object.keys(page)[0];
						return {
							from: path.resolve(__dirname, "src", page[key]),
							to: page[key],
						};
					}),
			],
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				exclude: /node_modules/,
				use: ["style-loader", "css-loader", "postcss-loader"],
			},
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							"@babel/preset-env",
							"@babel/preset-react",
							"@babel/preset-typescript",
						],
						cacheDirectory: true,
					},
				},
			},
		],
	},
};
