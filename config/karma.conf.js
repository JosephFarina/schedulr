const paths = require('./paths');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.dev');
webpackConfig.entry = {};

process.NODE_ENV = 'test'

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    autoWatchBatchDelay: 300,
    captureTimeout: 60000,
    browserNoActivityTimeout: 60000,
    files: [
      paths.appIndexJs,
      `${paths.appSrc}/**/*.spec.*`
    ],
    preprocessors: {
      [paths.appIndexJs]: ['webpack', 'sourcemap'],
      [`${paths.appSrc}/**/*.spec.*`]: ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
      stats: {
        chunks: false
      }
    },
    mime: {
      'text/x-typescript': ['ts', 'tsx']
    },
    plugins: [
      require('karma-chrome-launcher'),
      require('karma-jasmine'),
      require('karma-webpack'),
      require('karma-sourcemap-loader')
    ]
  })
}
