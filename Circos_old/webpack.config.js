const path = require('path');
module.exports = {
  context: __dirname,
  entry: './lib/main.js',
  output: {
    path: "./lib",
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: [ 'react', 'es2015']
        }
      }
    ]
  },
  devtool: 'source-maps'
};
