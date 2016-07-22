var webpack = require('webpack')

module.exports = {
  entry: [ './src/index.js' ],
  output: {
    filename: 'build/bundle.js'
  },
  output: {
    filename: 'dist/react-facebook-login-hoc.js',
    libraryTarget: 'umd',
    library: 'ReactFacebookLoginHOC',
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ }
    ]
  },
  resolve: {
    extensions: [ '' , '.js' ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ]
}
