module.exports = {
  'env': {
    'mocha': true,
    'browser': true,
    'commonjs': true,
    'node': true,
    'es2021': true,
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 12,
    'sourceType': 'module',
  },
  'rules': {
    'indent': [
      'error',
      2,
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    'quotes': [
      'error',
      'single',
    ],
    'semi': [
      'error',
      'always',
    ],
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
  },
};
