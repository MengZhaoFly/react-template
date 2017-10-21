// webpack.config.js
const webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PROJECT_ROOT = path.resolve(__dirname, './');

module.exports = {
  entry: {
    index: './src/index.js',
    vendor: ['react']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash:4].js',
    chunkFilename: '[name].[chunkhash:4].child.js', //按需加载
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        use: 'babel-loader',
        include: PROJECT_ROOT,
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new webpack.optimize.UglifyJsPlugin(),
    // 业务代码和第三方包的代码中很多时候需要判断 process.env.NODE_ENV 来做不同处理，而在生产环境中我们显然不需要非 production 的处理部分 
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'runtime'], // 和entry关联 runtime是模块之间的映射 把它单独抽离出来 防止vendor的hash一直变化
      minChunks: Infinity, // 防止其他代码被打包进来
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "commons",
      filename: "commons.[chunkhash:4].js",
      // (模块必须被 2个 入口共享)
      minChunks: 2
    }),
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      async: true,
      minChunks: 2,
    })
  ],
  resolve: {
    alias: {
        Component: './src/component'
    }
  },
};