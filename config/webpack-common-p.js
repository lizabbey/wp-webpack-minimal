const merge = require('webpack-merge');
const common = require('./webpack-common.js');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

module.exports = merge(common, {
	mode: 'production',
	devtool: 'source-map',
	plugins: [
		new ImageminPlugin({
			cacheFolder: '../cache',
			pngquant: {
				quality: '95-100'
			},
			mozjpeg: {
				progressive: true,
				quality: 65
			},
			optipng: {
				enabled: true,
			},
			pngquant: {
				quality: '65-90',
				speed: 4
			},
			gifsicle: {
				interlaced: false,
			},
			svgo: null,
			externalImages: {
				context: '../src/image',
				destination: '../dist/image',
				fileName: '[path][name].[ext]'
			}
		}),
	],
	module: {
		rules: [
			{
				test: /\.svg$/i,
				exclude: /image\/icons/,
				use: [
					{
						loader: 'file-loader',
						options: {
							context: 'src',
							name: (resourcePath) => {
								if (/node_modules/.test(resourcePath)) {
									return 'image/[name].[ext]';
								}
								return '[path][name].[ext]';
							},
						},
					},
					{
						loader: 'svgo-loader',
						options: {
							plugins: [
								{ collapseGroups: false },
								{ cleanupIDs: false },
								{ removeViewBox: false },
								{ removeDimensions: true }
							]
						}
					}
				]
			},
			{
				test: /\.(gif|png|jpe?g)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							context: 'src',
							name: (resourcePath) => {
								if (/node_modules/.test(resourcePath)) {
									return 'image/[name].[ext]';
								}
								return '[path][name].[ext]';
							}
						},
					}
				]
			},
		]
	}
});