const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: {
    main: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js',
    assetModuleFilename: 'assets/[name]_[contenthash:8][ext]',
    clean: true,
  },
  devtool: devMode ? 'eval-source-map' : 'source-map', // 디버깅을 위한 소스맵
  devServer: {},
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode
            ? {
                loader: 'style-loader',
                options: { injectType: 'singletonStyleTag' },
              }
            : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                // autoprefix를 사용하기 위한 플러그인
                plugins: [postcssPresetEnv()],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpe?g|gif|webp)$/i,
        // 기본적으로 8kb 이하라면 url-loader로, 이상이면 file-loader로 동작
        type: 'asset',
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
  optimization: {
    // minimize: true, // 개발 환경에서도 적용할 것인지
    minimizer: [new CssMinimizerPlugin()],
    runtimeChunk: 'single',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ].concat(
    devMode
      ? []
      : [
          new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css',
          }),
        ],
  ),
  stats: {
    preset: 'minimal',
    moduleTrace: true, // 종속성 경고/에러 표시
    errorDetails: true, // 에러 세부 정보
    chunks: true,
  },
};
