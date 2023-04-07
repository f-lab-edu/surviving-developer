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
          'style-loader',
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
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'), //dart-sass 적용
            },
          },
        ],
      },
    ],
  },
  plugins: [new Dotenv({ path: './env/.env.development' })],
};
