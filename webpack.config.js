const merge = require('webpack-merge');
const path = require('path');

module.exports = merge(require('./webpack.base'), {
  context: __dirname,

  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'uam-vuejs-cache',
    libraryTarget: 'umd',
  },

  externals: {
    'pouchdb-browser': 'pouchdb-browser'
  }
})
