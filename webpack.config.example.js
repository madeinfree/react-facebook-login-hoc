var webpack = require('webpack')

module.exports = {
  entry: [ './example/index.react.js' ],
  output: {
    filename: 'build/bundle.js'
  },
  devtool: 'eval',
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
