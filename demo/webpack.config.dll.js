const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const packageJson = require(`${process.cwd()}/package.json`);

const { buildPath } = packageJson;

module.exports = {
  entry: {
    ashim: [
      'es6-shim',
    ],
    vendor: [
      'moment',
      'highcharts',
    ],
    react: [
      'react',
      'react-dom',
      'prop-types',
      'react-router',
    ],
  },
  output: {
    filename: '[name].[chunkhash].dll.js',
    path: path.join(__dirname, buildPath, 'dll'),
    library: '[name]_lib',
  },
  plugins: [
    new CleanWebpackPlugin([`${buildPath}/dll/*.*`]),
    new webpack.DllPlugin({
      path: path.join(__dirname, buildPath, 'dll', '[name]-manifest.json'),
      name: '[name]_lib',
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
  ],
};
