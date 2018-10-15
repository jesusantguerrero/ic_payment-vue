// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var rootDir = path.resolve(__dirname, '../../')

module.exports = {
  build: {
    env: require('./dev.env'),
    index: `${rootDir}/application/views/layouts/index.php`,
    assetsRoot:`${rootDir}/public`,
    assetsSubDirectory: 'assets',
    assetsPublicPath: '/',

    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: false
  }
}
