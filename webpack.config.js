const merge =  require('webpack-merge');
const browserSync = require('browser-sync-webpack-plugin');
const devConfig = require('./resources/build/webpack.dev.conf');

const config = merge(devConfig, {
  plugins: [
    new browserSync({
      proxy: 'icpayment'
    })
  ]
})

module.exports = config
