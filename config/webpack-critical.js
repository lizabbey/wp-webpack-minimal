const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack-prod.js');
const CriticalCssPlugin = require('critical-css-webpack-plugin');


module.exports = merge(common, {
	plugins: [
		new CriticalCssPlugin({
			base: './src/html/',
			src: 'front-page.html',
			dest: '../../dist/critical/front-page.css',
			inline: false,
			extract: false,
			width: 1200,
  			height: 565,
		}),
	],
});