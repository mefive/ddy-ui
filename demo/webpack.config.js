const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const LodashWebpackPlugin = require('lodash-webpack-plugin');

const packageJson = require(`${process.cwd()}/package.json`);

const { buildPath } = packageJson;

const baseConfig = {
  entry: {
    index: './app/index',
  },
  context: path.resolve(__dirname, './src'),
  output: {
    filename: 'static/[name].[chunkhash:7].js',
    path: path.resolve(__dirname, buildPath),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
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
    new MiniCssExtractPlugin({
      filename: 'static/[name].css',
      chunkFilename: 'static/[id].css',
    }),
  ],
};

module.exports = (env, argv) => {
  const { mode } = argv;

  let dllFiles;

  if (mode === 'production') {
    dllFiles = fs.readdirSync(path.resolve(__dirname, `./${buildPath}/dll/`)).map((file) => {
      if (file.indexOf('dll.') >= 0) {
        return `dll/${file}`;
      }
      return null;
    }).filter(Boolean);
  }

  let config = merge(baseConfig, {
    mode,
    module: {
      rules: [
        {
          test: /\.(sc|c|sa)ss$/,
          use: [
            mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'sass-loader',
          ],
        },
      ],
    },
    plugins: [
      new webpack.EnvironmentPlugin({ NODE_ENV: mode }),
    ],
  });

  if (mode === 'production') {
    config = merge(config, {
      plugins: [
        new LodashWebpackPlugin({
          collections: true,
          shorthands: true,
        }),

        new CleanWebpackPlugin([
          '*.html', 'static/*.*',
        ], { root: path.join(__dirname, buildPath) }),

        new webpack.DllReferencePlugin({
          context: '.',
          // eslint-disable-next-line
          manifest: require(`./${buildPath}/dll/ashim-manifest.json`),
        }),
        new webpack.DllReferencePlugin({
          context: '.',
          // eslint-disable-next-line
          manifest: require(`./${buildPath}/dll/react-manifest.json`),
        }),
        new webpack.DllReferencePlugin({
          context: '.',
          // eslint-disable-next-line
          manifest: require(`./${buildPath}/dll/vendor-manifest.json`),
        }),

        new HtmlWebpackPlugin({
          template: './templates/index.ejs',
          dllFiles,
          filename: 'index.html',
        }),
      ],
      optimization: {
        minimize: false,
      },
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
        historyApiFallback: true,
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
