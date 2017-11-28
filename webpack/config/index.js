// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var rootDir = path.resolve(__dirname, '../../')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: `${rootDir}/application/views/layouts/index.php`,
    assetsRoot:`${rootDir}/`,
    assetsSubDirectory: 'assets',
    assetsPublicPath: './',

    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: false
  }
}