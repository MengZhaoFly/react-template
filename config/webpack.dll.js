const webpack = require('webpack');
const path = require('path');
module.exports = {
  mode: 'production',
  entry: {
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.join(__dirname, '../dist/dll'),
    filename: '[name].dll.js', //打包文件的名字
    library: "[name]_[hash]" //可选 暴露出的全局变量名
    // vendor.dll.js中暴露出的全局变量名。
  },
  plugins: [
    //清单文件
    new webpack.DllPlugin({
      path: path.join(__dirname, "../dist/dll", "[name]-manifest.json"),
      name: "[name]_[hash]"
    })

  ]
}