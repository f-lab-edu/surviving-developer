const postcssPresetEnv = require('postcss-preset-env');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {},
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: 'style-loader',
            options: { injectType: 'singletonStyleTag' },
          },
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
  plugins: [new Dotenv({ path: './env/.env.development' })],
};
