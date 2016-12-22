const paths = require('./paths');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.dev');
webpackConfig.entry = {};

process.NODE_ENV = 'test'

module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    reporters: ['progress'],
    port: 9876,
    colors: false,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    autoWatchBatchDelay: 300,

    files: [
      paths.appIndexJs,
      `${paths.appSrc}/**/*.spec.tsx`
    ],
    preprocessors: {
      [paths.appIndexJs]: ['webpack'],
      [`${paths.appSrc}/**/*.spec.tsx`]: ['webpack']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
      stats: {
        chunks: false
      }
    },
    plugins: [
      require('karma-chrome-launcher'),
      require('karma-jasmine'),
      require('karma-webpack')
    ]
  })
}
