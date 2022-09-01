module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true
  },
  'extends': 'eslint:recommended',
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest'
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'no-unused-vars': 'warn',
    'linebreak-style': [
      'error',
      'windows'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'always'
    ],
    'no-extra-semi': 'error',
    'max-len': [
      'error',
      100
    ],
    'no-multi-spaces': 'error',
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'comma-spacing': ['error', {
      'before': false,
      'after': true,
    }],
    'key-spacing': 'error',
    'eqeqeq': 'error',
  }
};
