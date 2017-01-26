const autoprefixer = require('autoprefixer');
const smartImport = require("postcss-import");
const customMedia = require("postcss-custom-media");
const cssNesting = require('postcss-nesting');
const precss = require('precss');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const getClientEnvironment = require('./env');
const paths = require('./paths');

const path = require('path')

const publicPath = '/';
const publicUrl = '';
const env = getClientEnvironment(publicUrl);

const common = {
  devtool: 'cheap-module-source-map',
  debug: true,
  // watch: true,
  resolve: {
    fallback: paths.nodePaths,
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', ''],
    root: [
      path.resolve('./')
    ],
    alias: {
      'react-native': 'react-native-web'
    }
  },

  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint',
        include: paths.appSrc,
      }
    ],
    loaders: [

      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.(ts|tsx)$/,
          /\.css$/,
          /\.json$/,
          /\.svg$/
        ],
        loader: 'url',
        query: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },

      {
        test: /\.tsx$/,
        include: paths.appSrc,
        loader: 'ts-loader?sourceMap',
        exclude: [
          '*.spec*'
        ]
      },

      {
        test: /\.ts$/,
        include: paths.appSrc,
        loader: 'ts-loader?sourceMap',
        exclude: [
          '*.spec*'
        ]
      },

      {
        test: /\.(js|jsx)$/,
        include: paths.appSrc,
        loader: 'babel?sourceMap',
        query: {
          cacheDirectory: true
        }
      },

      {
        test: /\.css$/,
        loaders: [
          'style?sourceMap',
          'css-loader?modules&importLoaders=1&localIdentName=[path]_[name]_[local]_[hash:base64:6]',
          'postcss-loader'
        ]
      },

      {
        test: /\.scss$/,
        loaders: [
          'style?sourceMap',
          'css-loader?modules&importLoaders=2&localIdentName=[path]_[name]_[local]_[hash:base64:5]',
          'postcss-loader',
          'sass'
        ]
      },

      {
        test: /\.json$/,
        loader: 'json'
      },

      {
        test: /\.svg$/,
        loader: 'file',
        query: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ]
  },

  plugins: [
    // new InterpolateHtmlPlugin({
    //   PUBLIC_URL: publicUrl
    // }),
    // new HtmlWebpackPlugin({
    //   inject: true,
    //   template: paths.appHtml,
    // }),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin(env),
    new CaseSensitivePathsPlugin(),
    new WatchMissingNodeModulesPlugin(paths.appNodeModules)
  ],

  externals: {
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  },

  postcss: function (webpack) {
    return [
      smartImport({
        addDependencyTo: webpack,
        path: [paths.appSrc]
      }),
      precss(),
      customMedia(),
      cssNesting(),
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ]
      })
    ];
  },

  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true
  }
}

const frontend = {
  entry: {
    client: [
      paths.appIndexJs
    ]
  },
  output: {
    path: paths.appPublic,
    pathinfo: true,
    filename: '/js/[name].js',
    // publicPath: publicPath
  },
}

const backend = {
  entry: {
    server: [
      paths.serverIndex
    ]
  },
  output: {
    path: paths.appBuild,
    pathinfo: true,
    filename: '/js/[name].js',
    publicPath: publicPath
  },

  target: 'node',
}

module.exports = [
  Object.assign({}, common, frontend),
  Object.assign({}, common, backend)
]
