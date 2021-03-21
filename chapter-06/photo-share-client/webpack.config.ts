import path from 'path';
import webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import nodeExternals from 'webpack-node-externals';

const src = path.resolve(__dirname, '.');
const dist = path.resolve(__dirname, 'dist');

const config: webpack.Configuration = {
  target: 'node',
  mode: 'development',
  externals: [nodeExternals()],

  entry: {
    app: src + '/index.ts'
 },

  plugins: [new CleanWebpackPlugin()],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.ts', '.json'],
  },

  output: {
    filename: '[name].js',
    publicPath: dist,
    path: dist,
  },
};

export default config;
