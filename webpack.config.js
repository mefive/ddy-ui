const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const LodashWebpackPlugin = require('lodash-webpack-plugin');

module.exports = {
  entry: {
    index: './src/components/index',
  },
  output: {
    libraryTarget: 'umd',
    path: path.join(__dirname, './build'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  externals: ['react', 'react-dom', 'moment', 'highcharts', 'prop-types'],
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    }, {
      test: /\.(sc|c|sa)ss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      }),
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'font/[name].[hash:7].[ext]',
          },
        },
      ],
    }],
  },
  plugins: [
    new LodashWebpackPlugin({
      collections: true,
      shorthands: true,
    }),
    new ExtractTextPlugin('css/[name].[chunkhash:7].css'),
    new CleanWebpackPlugin(['build']),
  ],
};
