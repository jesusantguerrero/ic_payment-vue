// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var rootDir = path.resolve(__dirname, '../../')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: `${rootDir}/application/views/layouts/index.php`,
    assetsRoot:`${rootDir}/`,
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/icpayment/',

    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: false
  }
}
