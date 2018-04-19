const webpack = require('webpack')

const uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
  parallel: true,
  sourceMap : true
})

const plugins = []

if (process.env.NODE_ENV === "production") {
  plugins.push(uglifyPlugin)
}

module.exports = {
  module: {
    rules: [
      {
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter')
        },
        test: /\.js$/
      },
      {
        exclude: /node_modules/,
        loaders: ['babel-loader'],
        test: /\.js$/
      }
    ]
  },
  plugins,
  resolve: {
    extensions: ['.js'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': './src'
    }
  }
}
