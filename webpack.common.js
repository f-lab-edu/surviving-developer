const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js',
    clean: true,
  },
  devServer: {},
  module: {
    rules: [
      {
        test: /\.(png|svg|jpe?g|gif|webp)$/i,
        // 기본적으로 8kb 이하라면 url-loader로, 이상이면 file-loader로 동작
        type: 'asset',
        generator: {
          filename: 'assets/images/[name]_[contenthash:8][ext]',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ],
  stats: {
    preset: 'minimal',
    moduleTrace: true, // 종속성 경고/에러 표시
    errorDetails: true, // 에러 세부 정보
    chunks: true,
  },
};
