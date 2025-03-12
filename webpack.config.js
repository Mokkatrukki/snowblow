const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Common configuration for both dev and prod
const commonConfig = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};

// Development configuration
const devConfig = {
  ...commonConfig,
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
    hot: true,
    devMiddleware: {
      publicPath: '/',
    }
  },
};

// Production configuration
const prodConfig = {
  ...commonConfig,
  mode: 'production',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
    clean: true,
  },
};

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    return prodConfig;
  }
  return devConfig;
}; 