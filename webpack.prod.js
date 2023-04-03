const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
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
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name]_[contenthash:8].css',
    }),
    new Dotenv({ path: './env/.env.production' }),
  ],
  optimization: {
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
    runtimeChunk: 'single',
  },
};
