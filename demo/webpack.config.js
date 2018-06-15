/* eslint-env node */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const LodashWebpackPlugin = require('lodash-webpack-plugin');

const BUILD_PATH = 'live';
let dllFiles;

if (process.env.NODE_ENV === 'production') {
  dllFiles = fs.readdirSync(path.resolve(__dirname, `./${BUILD_PATH}/dll/`)).map((file) => {
    if (file.indexOf('dll.') >= 0) {
      return `dll/${file}`;
    }
    return null;
  }).filter(Boolean);
}

module.exports = function entry() {
  let config = {
    entry: {
      index: './app/index',
    },
    context: path.resolve(__dirname, './src'),
    output: {
      filename: 'static/[name].[chunkhash:7].js',
      path: path.resolve(__dirname, BUILD_PATH),
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.(sc|c|sa)ss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader' },
              'sass-loader',
            ],
          }),
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                limit: 100,
                name: '[name].[hash:7].[ext]',
                outputPath: 'static',
                publicPath: '/static',
              },
            },
          ],
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                limit: 100,
                name: '[name].[hash:7].[ext]',
                outputPath: 'static',
                publicPath: '/static',
              },
            },
          ],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    plugins: [
      new webpack.EnvironmentPlugin(['NODE_ENV']),
      new ExtractTextPlugin('static/[name].[chunkhash:7].css'),
    ],
  };

  if (process.env.NODE_ENV === 'production') {
    config = merge(config, {
      plugins: [
        new LodashWebpackPlugin({
          collections: true,
          shorthands: true,
        }),

        new CleanWebpackPlugin([
          '*.html', 'static/*.*',
        ], { root: path.join(__dirname, BUILD_PATH) }),

        new webpack.DllReferencePlugin({
          context: '.',
          // eslint-disable-next-line
          manifest: require(`./${BUILD_PATH}/dll/ashim-manifest.json`),
        }),
        new webpack.DllReferencePlugin({
          context: '.',
          // eslint-disable-next-line
          manifest: require(`./${BUILD_PATH}/dll/react-manifest.json`),
        }),
        new webpack.DllReferencePlugin({
          context: '.',
          // eslint-disable-next-line
          manifest: require(`./${BUILD_PATH}/dll/vendor-manifest.json`),
        }),

        new HtmlWebpackPlugin({
          template: './templates/index.ejs',
          dllFiles,
          filename: 'index.html',
        }),

        new UglifyJsPlugin({
          parallel: true,
          cache: true,
        }),
      ],
    });
  } else {
    config = merge(config, {
      devtool: '#eval-source-map',
      devServer: {
        port: 9910,
        inline: false,
        hot: false,
        contentBase: path.resolve(__dirname, 'div'),
        host: '0.0.0.0',
        disableHostCheck: true,
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './templates/index.html',
          filename: 'index.html',
        }),
      ],
    });
  }

  return config;
};
