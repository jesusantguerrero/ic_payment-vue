const path = require('path');
const htmlPlugin = require('html-webpack-plugin');
const uglifyjs = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    head: "./assets/js/head.js",
    index: "./assets/js/index.js"
  },
  devtool: 'inline-source-map',
  plugins: [
    new htmlPlugin({
      title: 'Outpage Management'
    }),
    new uglifyjs()
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname,'assets','js','min')
  }
};