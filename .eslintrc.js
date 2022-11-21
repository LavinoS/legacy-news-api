module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:promise/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    node: true,
    browser: true,
    jest: true,
    es6: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true, // only single quotes instead of double
        endOfLine: 'auto',
        trailingComma: 'all',
        arrowParens: 'always',
      },
    ],
    'no-constant-condition': ['error', { checkLoops: false }],
    'react/prop-types': 'off',
    'react/display-name': 0,
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/restrict-template-expressions': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    'react/jsx-filename-extension': 'off',
    'import/no-cycle': 'off',
    'import/first': 'error',
    'import/order': 'off',
    'import/newline-after-import': 'error',
    'class-methods-use-this': 0,
    'no-console': 'off',
    '@typescript-eslint/no-var-requires': 0,
  },
};
