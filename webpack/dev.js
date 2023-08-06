const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index:'./src/index.js',
  },
  devtool: 'eval-source-map',
  module: {
    rules:[{
      test: /\.(?:js|mjs|cjs)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            // babel/preset-env - allows to transform all newest features of JS
            // target: defaults - transoforms it into JS compatible with browsers, that have more than 0,5% of market share
            ['@babel/preset-env', { targets: "defaults" }]
          ]
        }
      }
    }]
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '..', 'dist'),
    clean: true
  },
};