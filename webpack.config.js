var webpack = require('webpack')

module.exports = {
  entry: [ './src/index.js' ],
  output: {
    filename: 'build/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ }
    ]
  },
  resolve: {
    extensions: [ '' , '.js' ]
  },
  devServer: {
    contentBase: './build'
  }
}
