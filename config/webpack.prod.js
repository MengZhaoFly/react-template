const webpackMerge = require('webpack-merge');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const baseConfig = require('./webpack.base.js');
const templatePath = path.join(__dirname, '../public/index.html')

module.exports = webpackMerge(baseConfig, {
  mode: 'production',
  entry: [
		path.resolve(__dirname, '../src/pageEntry/index.js')
  ],
  plugins: [
		new HtmlWebPackPlugin({
			template: templatePath
    })
  ]
});