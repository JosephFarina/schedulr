var paths = require('./paths');

module.exports = {
  // First, run the linter.
  // It's important to do this before Babel processes the JS.
  preLoaders: [
    {
      test: /\.(js|jsx)$/,
      loader: 'eslint',
      include: paths.appSrc,
    }
  ],
  loaders: [
    // Default loader: load all assets that are not handled
    // by other loaders with the url loader.
    // Note: This list needs to be updated with every change of extensions
    // the other loaders match.
    // E.g., when adding a loader for a new supported file extension,
    // we need to add the supported extension to this loader too.
    // Add one new line in `exclude` for each loader.
    //
    // "file" loader makes sure those assets get served by WebpackDevServer.
    // When you `import` an asset, you get its (virtual) filename.
    // In production, they would get copied to the `build` folder.
    // "url" loader works like "file" loader except that it embeds assets
    // smaller than specified limit in bytes as data URLs to avoid requests.
    // A missing `test` is equivalent to a match.
    {
      exclude: [
        /\.html$/,
        /\.(js|jsx)$/,
        /\.(ts|tsx)$/,
        /\.css$/,
        /\.scss$/,
        /\.json$/,
        /\.svg$/
      ],
      loader: 'url',
      query: {
        limit: 10000,
        name: 'static/media/[name].[hash:8].[ext]'
      }
    },
    // Process TS with typescript and Bable

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

    // Process JS with Babel.
    {
      test: /\.(js|jsx)$/,
      include: paths.appSrc,
      loader: 'babel?sourceMap',
      query: {
        cacheDirectory: true
      }
    },
    // "postcss" loader applies autoprefixer to our CSS.
    // "css" loader resolves paths in CSS and adds assets as dependencies.
    // "style" loader turns CSS into JS modules that inject <style> tags.
    // In production, we use a plugin to extract that CSS to a file, but
    // in development "style" loader enables hot editing of CSS.
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
        'sass?includePaths=' + paths.appSrc
      ]
    },

    // JSON is not enabled by default in Webpack but both Node and Browserify
    // allow it implicitly so we also enable it.
    {
      test: /\.json$/,
      loader: 'json'
    },
    // "file" loader for sxvg
    {
      test: /\.svg$/,
      loader: 'file',
      query: {
        name: 'static/media/[name].[hash:8].[ext]'
      }
    }
  ]
}