const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack-common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: '../dist',
		open: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
	],
	module: {
		rules: [
			{
				test: /\.scss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: (loader) => [
								require('autoprefixer'),
							],
						}
					},
					{
						loader: 'sass-loader',
					}, {
						loader: 'sass-resources-loader',
						options: {
							resources: [
								//This is a list of all files that will be added to every entrypoint. This replaces the need to @import 'required' in scss files. You may add or remove as necessary for your project. This list exists in multiple config files. You must change it in all of them.
								require.resolve('bootstrap/scss/_functions.scss'),
								path.resolve(__dirname, '../src/scss/partials/_custom.scss'),
								require.resolve('bootstrap/scss/_variables.scss'),
								require.resolve('bootstrap/scss/_mixins.scss'),
							]
						},
					}
				]
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
							context: 'src'
						}
					}
				]
			},
		],
	},
});