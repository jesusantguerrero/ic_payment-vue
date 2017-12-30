const merge =  require('webpack-merge');
const browserSync = require('browser-sync-webpack-plugin');
const devConfig = require('./webpack/build/webpack.dev.conf');

const config = merge(devConfig, {
  plugins: [
    new browserSync({
      proxy: 'localhost/icpayment'
    })
  ]
})

module.exports = config
