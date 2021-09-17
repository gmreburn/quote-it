const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
	mode: "development", // production - see https://webpack.js.org/configuration/devtool/
	devtool: "cheap-module-source-map",
	entry: {
		background: "./src/background.js",
		sidebar: {
			import: "./src/sidebar/index.jsx",
			filename: "sidebar/panel.js",
		},
		homepage: "./src/index.jsx",
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist"),
		clean: true,
	},
	devServer: {
		static: "./dist",
		inject: "body",
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Quote Explorer",
			chunks: ["homepage"],
			inject: "body",
			meta: {
				viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
			},
		}),
		new HtmlWebpackPlugin({
			title: "Quote Sidebar",
			filename: "sidebar/panel.html",
			chunks: ["sidebar"],
			inject: "body",
			meta: {
				viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
			},
		}),
		new CopyPlugin({
			patterns: [
				{ from: "src/icons", to: "icons" },
				{ from: "src/_locales", to: "_locales" },
				{ from: "src/manifest.json", to: "manifest.json" },
			],
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				exclude: /node_modules/,
				use: [
					"style-loader",
					"css-loader",
					// {
					// 	loader: "css-loader",
					// 	options: {
					// 		importLoaders: 1,
					// 	},
					// },
					"postcss-loader",
				],
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
