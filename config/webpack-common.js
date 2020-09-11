const path = require('path');
const webpack = require('webpack');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname, '../'),
	entry: {
		//Add entry points here as you need them
		theme: './src/js/theme.js',
		// frontpage: './src/front-page.js',
		// critical_fp: './src/scss/critical-fp.scss', //CSS ONLY OUTPUT
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'js/[name].js',
	},
	plugins: [
		new webpack.ProvidePlugin({
			SVGInjector: 'svg-injector-2'
		}),
		new WebpackBuildNotifierPlugin({
			suppressCompileStart: true
		}),
		new SVGSpritemapPlugin('./src/image/icons/**/*.svg', {
			output: {
				//CHANGE THIS IF YOUR ICONS FOLDER IS DIFFERENT
				filename: 'image/spritemap.svg',
				svgo: true,
			},
		})
	],
	externals: {
		jquery: 'jQuery'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}]
			},
			{
				test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
				exclude: /image/,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'fonts/',
							name: (resourcePath) => {
								if (/node_modules/.test(resourcePath)) {
									return '[name].[ext]';
								}
								return '[path][name].[ext]';
							}
						}
					}
				]
			}
		]
	}
};
