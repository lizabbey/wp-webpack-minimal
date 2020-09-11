const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack-common-p.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MediaQueryPlugin = require('media-query-plugin');

module.exports = merge(common, {
	devtool: 'source-map',
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
			publicPath: '../'
		}),
		new MediaQueryPlugin({
            include: [
                'theme'
            ],
            queries: {
				'(min-width:576px)': 'sm',
				'(min-width:768px)': 'md',
				'(min-width:992px)': 'lg',
				'(min-width:1200px)': 'xl',
			},
        })
	],
	module: {
		rules: [
			{
				test: /\.scss$/i,
				use: [
					{
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
					MediaQueryPlugin.loader,
					{
						loader: 'postcss-loader',
						options: {
							plugins: (loader) => [
								require('autoprefixer'),
								require('postcss-object-fit-images'),
								require('pixrem')({
									atrules: true,
								}),
								require('cssnano')()
							],
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true
						}
					}, {
						loader: 'sass-resources-loader',
						options: {
							resources: [
								require.resolve('bootstrap/scss/_functions.scss'),
								path.resolve(__dirname, '../src/scss/partials/_custom.scss'),
								require.resolve('bootstrap/scss/_variables.scss'),
								require.resolve('bootstrap/scss/_mixins.scss'),
							]
						},
					}
				]
			},
		]
	}
});