const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const commonConfig = {
  mode: process.env.NODE_ENV || 'development',
  node: {
    __dirname: false,
    __filename: false,
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', 'tsx'],
  },
  module: {
    rules: [
      {
        // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap'],
      },
      {
        test: /\.(jpg|png|svg|ico|icns)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
    ],
  },
};

const mainConfig = Object.assign({}, commonConfig, {
  target: 'electron-main',
  entry: './src/main/main.ts',
  output: {
    filename: 'main.bundle.js',
    path: __dirname + '/dist',
  },
});

const rendererConfig = Object.assign({}, commonConfig, {
  target: 'electron-renderer',
  entry: './src/renderer/renderer.ts',
  output: {
    filename: 'renderer.bundle.js',
    path: __dirname + '/dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/renderer/index.html'),
    }),
  ],
});

module.exports = [mainConfig, rendererConfig];
