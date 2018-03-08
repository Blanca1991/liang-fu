'use strict'
// Template version: 1.2.6
// see http://vuejs-templates.github.io/webpack for documentation.
const path = require('path')

function getNowDateTime () {
  // 得到当前时间
  var date = new Date()
  // date = date.valueOf()
  var y = date.getFullYear()
  var m = date.getMonth() + 1
  m = m < 10 ? ('0' + m) : m
  var d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  var h = date.getHours()
  h = h < 10 ? ('0' + h) : h
  var minute = date.getMinutes()
  var second = date.getSeconds()
  minute = minute < 10 ? ('0' + minute) : minute
  second = second < 10 ? ('0' + second) : second
  return y + '' + m + '' + d + '' + h + '' + minute + '' + second
}

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'staticV2',
    assetsPublicPath: '/',
    proxyTable: {},

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8075, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: false,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/liangfu' + getNowDateTime() + '/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist/liangfu' + getNowDateTime() ),
    assetsSubDirectory: 'staticV2',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

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
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
