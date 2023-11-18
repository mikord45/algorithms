import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const setup = {
  mode: 'production',
  entry: {
    index:'./src/index.ts',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
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
            // targets: defaults - transoforms it into JS compatible with browsers, that have more than 0,5% of market share
            ['@babel/preset-env', { targets: "node 18.15.0" }]
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

export default setup