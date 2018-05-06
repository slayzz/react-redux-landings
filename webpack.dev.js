const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = env => ({
  entry: {
    polyfills: './src/polyfills.js',
    client: `./src/landings/${env.LAND_NAME}/client.js`,
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'src/dist'),
    chunkFilename: '[name].bundle.js',
  },
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'src'),
        use: ['babel-loader', { loader: 'eslint-loader' }],
      },
      {
        test: /\.scss/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              includePath: ['src/styles'],
              sourceMap: true,
            },
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
          'style-loader',
          { loader: 'css-loader', options: { srouceMap: true } }],
      },
    ],
  },
  devServer: {
    contentBase: [path.resolve(__dirname, 'src/dist'), 'static'],
    port: 9000,
    clientLogLevel: 'error',
    compress: true,
    hot: true,
    open: true,
    overlay: {
      error: true,
    },
    progress: true,
  },
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
  plugins: [
    new CleanWebpackPlugin(['src/dist']),
    new HtmlWebpackPlugin({
      title: env.LAND_NAME,
      filename: 'index.html',
      template: './src/index.dev.html',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.json'],
    modules: ['node_modules', 'src'],
  },
});
