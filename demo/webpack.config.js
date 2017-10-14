/* eslint-env node */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    demo: './demo/index',
  },
  output: {
    filename: '[name].[hash:7].js',
    path: path.resolve(__dirname, '../demo-build'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
              options: {
                data: '@import "' + path.resolve(__dirname, './style/variables') + '";',
              },
            },
          ],
        }),
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(['../demo-build']),
    new ExtractTextPlugin('[name].[chunkhash:7].css'),
    new HtmlWebpackPlugin({
      template: './demo/index.html',
    }),
  ],
};
