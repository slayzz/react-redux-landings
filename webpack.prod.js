const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const extractCss = new ExtractTextPlugin({
  filename: '[name].css',
  allChunks: true,
});

const serverConfig = env => ({
  mode: 'production',
  entry: {
    server: ['babel-polyfill', `./src/landings/${env.LAND_NAME}/server.js`],
  },
  output: {
    path: path.resolve(__dirname, `src/landings/${env.LAND_NAME}/dist`),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  target: 'node',
  externals: nodeExternals(),
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'isomorphic-style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: ['src/styles/variables/_variables.scss'],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'isomorphic-style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.LAND_NAME': JSON.stringify(env.LAND_NAME),
    }),
  ],
  resolve: {
    extensions: ['.js', '.json'],
    modules: ['node_modules', 'src'],
  },
});

const clientConfig = env => ({
  entry: {
    polyfills: './src/polyfills.js',
    client: `./src/landings/${env.LAND_NAME}/client.js`,
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, `src/landings/${env.LAND_NAME}/dist`),
    chunkFilename: '[name].bundle.js',
  },
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: ['babel-loader', { loader: 'eslint-loader', options: { fix: true } }],
      },
      {
        test: /\.scss$/,
        use: extractCss.extract({
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
            },
            {
              loader: 'sass-resources-loader',
              options: {
                resources: ['./src/styles/variables/_variables.scss'],
              },
            },
          ],
        }),
      },
      {
        test: /\.css$/,
        use: extractCss.extract({
          use: ['css-loader'],
        }),
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([`src/landings/${env.LAND_NAME}/dist`]),
    new HtmlWebpackPlugin({
      title: env.LAND_NAME,
      filename: 'index.template.html',
      template: './src/index.html',
    }),
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    extractCss,
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  resolve: {
    extensions: ['.js', '.json'],
    modules: ['node_modules', 'src'],
  },
});

module.exports = [clientConfig, serverConfig];
