module.exports = {
  root: true,
  env: {
    es2022: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: ['standard', 'prettier'],
  plugins: ['import', 'mocha', 'node', 'promise'],
  rules: {
    'no-confusing-arrow': [
      'error',
      {
        allowParens: true,
      },
    ],
    'node/no-unsupported-features/es-syntax': 'off',
    'no-console': 0,
    'node/no-unpublished-require': 'off',
    'max-len': [
      'error',
      120,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      },
    ],
    'arrow-parens': ['error', 'always'],
    'no-use-before-define': [
      'error',
      {
        functions: false,
      },
    ],
    'lines-around-comment': [
      'error',
      {
        allowBlockStart: true,
        allowBlockEnd: true,
        allowObjectStart: true,
        allowObjectEnd: true,
        allowArrayStart: true,
        allowArrayEnd: true,
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.tests.js'],
      env: {
        mocha: true,
      },
    },
  ],
};
