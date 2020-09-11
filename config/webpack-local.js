const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack-common-p.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MediaQueryPlugin = require('media-query-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

//CHANGE TO THE CURRENT .local SITE
const proxyUrl = 'http://starter-test-site.local';

module.exports = merge(common, {
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
			publicPath: '../'
		}),
		new BrowserSyncPlugin({
			proxy: proxyUrl, 
			files: [
				'wp-content/themes/**/*.css',
				'wp-content/themes/**/*.js',
				{
					match: ['../**/*.php'],
				}
			]
		})
	],

	module: {
		rules: [{
			test: /\.scss$/i,
			use: [{
					loader: MiniCssExtractPlugin.loader,
					options: {
						publicPath: '../',
					}
				},
				{
					loader: 'css-loader',
					options: {
						sourceMap: true,
					}
				},
				//This will create files for a specified media query to increase optimization
				MediaQueryPlugin.loader,
				{
					loader: 'postcss-loader',
					options: {
						plugins: (loader) => [
							require('autoprefixer'),
						],
						sourceMap: true
					}
				},
				{
					loader: 'sass-loader',
					options: {
						sourceMap: true,
					}
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
		}, ]
	}
});