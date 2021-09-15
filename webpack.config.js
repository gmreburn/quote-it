const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	mode: "development", // production - see https://webpack.js.org/configuration/devtool/
	devtool: "cheap-module-source-map",
	entry: {
		background: "./src/background.js",
		sidebar: "./src/sidebar/panel.js",
	},
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "dist"),
		clean: false,
	},
	devServer: {
		static: "./dist",
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Explorer",
		}),
		new HtmlWebpackPlugin({
			title: "Output Management",
			filename: "sidebar.html",
			template: "src/sidebar/panel.html",
			chunks: ["sidebar"],
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
		],
	},
};
