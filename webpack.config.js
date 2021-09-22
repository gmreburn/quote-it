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
].filter((manifest_page) => {
	const file = manifest_page[Object.keys(manifest_page)[0]];
	return file && fs.existsSync(path.resolve(__dirname, "src", file));
});

// Creates HTML pages from JSX files located in ./src/pages
const pages_path = path.resolve(__dirname, "./src/pages");
if (fs.existsSync(pages_path)) {
	manifest_pages.push(
		...fs
			.readdirSync(pages_path)
			.filter((path) => path.endsWith(".jsx"))
			.map((page_path) => ({
				[path.parse(page_path).name]: path.join("pages", page_path),
			}))
	);
}

const jsxEntries = manifest_pages
	.filter((page) => path.extname(page[Object.keys(page)[0]]) === ".jsx")
	.map((page) => {
		const key = Object.keys(page)[0];

		return {
			[key]: {
				import: path.resolve(__dirname, "src", page[key]),
				filename: `${page[key].substr(0, page[key].length - 4)}.js`,
			},
		};
	});

module.exports = {
	mode: "production", // development - see https://webpack.js.org/configuration/devtool/
	devtool: "cheap-module-source-map",
	entry: Object.assign(
		{},
		...jsxEntries,
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
				return path.extname(file) === ".jsx";
			})
			.map((page) => {
				const key = Object.keys(page)[0];

				return new HtmlWebpackPlugin({
					title: manifest[key]?.default_title || key,
					filename: page[key].replace(".jsx", ".html"),
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
						manifest_pages.forEach((page) => {
							const key = Object.keys(page)[0];
							console.log(key);

							switch (key) {
								case "sidebar_action":
									manifest[key].default_panel = page[key].replace(
										".jsx",
										".html"
									);
									break;

								case "devtools_page":
									manifest[key].default_panel = page[key].replace(
										".jsx",
										".html"
									);
									break;

								case "page_action":
								case "browser_action":
									manifest[key].default_popup = page[key].replace(
										".jsx",
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
						ignore: ["**/*.jsx"],
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
				test: /\.m?jsx?$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
					},
				},
			},
		],
	},
};
