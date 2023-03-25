module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['eslint:recommended', 'eslint-config-airbnb', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // 화살표 함수 매개변수 1개일 때 괄호 빼줌.
    'arrow-parens': ['error', 'as-needed'],
  },
};      
       