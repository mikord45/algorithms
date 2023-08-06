const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index:'./src/index.ts',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  devtool: 'eval-source-map',
  module: {
    rules:[{
      test: /\.(?:js|ts)$/,
      exclude: /node_modules/,
      use: [
        {
        loader: 'babel-loader',
        options: {
          presets: [
            // babel/preset-env - allows to transform all newest features of JS
            // target: defaults - transoforms it into JS compatible with browsers, that have more than 0,5% of market share
            ['@babel/preset-env', { targets: "defaults" }]
          ]
        }
      },
      // I know that, using both ts-loader and babel-loader at the same time might be redundant, but I wanted to do it just for learning purposes
      {
        loader: 'ts-loader'
      }
    ]
    }]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '..', 'dist'),
    clean: true
  },
};