module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'eslint-config-airbnb-base',
    'eslint-config-prettier',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // 화살표 함수 매개변수 1개일 때 괄호 빼줌.
    'arrow-parens': ['error', 'as-needed'],
    'consistent-return': 'off',
    'lines-between-class-members': 'off',
    'no-new': 'off',
    'class-methods-use-this': 'off',
    'no-plusplus': 'off',
    'no-param-reassign': 'off',
    'prefer-destructuring': 'off',
    'import/prefer-default-export': 'off',
    'no-alert': 'off',
    'no-restricted-syntax': 'off',
  },
};
