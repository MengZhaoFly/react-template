const webpackMerge = require('webpack-merge');
const webpack = require('webpack')
const path = require('path');
const fs = require('fs');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const baseConfig = require('./webpack.base.js');

const templatePath = path.join(__dirname, '../public/index.html')
const pageEntry = path.join(__dirname, '../src/pageEntry/');
const pages = fs.readdirSync(pageEntry);
// 页面入口
let webpackPageEntry = {};
// 页面模板 for html-webpack-plugin
let webpackPageHtml = [];
pages.forEach((name) => {
  const filename = name.slice(0, -3);
  webpackPageEntry[filename] = path.join(pageEntry, name);
  webpackPageHtml.push(new HtmlWebPackPlugin({
    minify: { //是对html文件进行压缩
      removeAttributeQuotes: true  //removeAttrubuteQuotes是却掉属性的双引号。
    },
    filename: `${filename}.html`,
    chunks: [filename],
    hash: true, //为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
    template: templatePath //是要打包的html模版路径和文件名称。
  }));
});

module.exports = webpackMerge(baseConfig, {
  entry: {
    ...webpackPageEntry
  },
  plugins: [
    ...webpackPageHtml,
    new webpack.DllReferencePlugin({
      // 描述 react 动态链接库的文件内容
      manifest: require('../dist/dll/vendor-manifest.json'),
    }),
    new AddAssetHtmlPlugin([
      {
        // 要添加到编译中的文件的绝对路径，以及生成的HTML文件。支持globby字符串
        filepath: require.resolve(path.resolve(__dirname, '../dist/dll/vendor.dll.js')),
        // 文件输出目录
        // outputPath: 'vendor',
        // 脚本或链接标记的公共路径
        // publicPath: 'vendor'
      }
    ]),
  ]
});