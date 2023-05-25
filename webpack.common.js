const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './index.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.join(__dirname, 'dist'),
  },
  devtool: 'eval-cheap-module-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.json'],
  },
  module: {
    rules: [
      {
        test: /(\.js|\.jsx|\.ts|\.tsx)$/i,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
        exclude: [/node_modules/],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico|eot|ttf|woff|woff2)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'aigc',
      template: './public/index.html',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: 1,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
