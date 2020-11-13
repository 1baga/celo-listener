module.exports = {
  env: {
    jest: true,
    node: true,
    mocha: true,
    es6: true
  },
  extends: [
    'formidable/rules/eslint/best-practices/off',
    'formidable/rules/eslint/es6/on',
    'formidable/rules/eslint/errors/off',
    'formidable/rules/eslint/strict/on',
    'formidable/rules/eslint/node/off',
    'formidable/rules/eslint/style/on',
    'formidable/rules/eslint/variables/on',
    'prettier'
  ],
  rules: {
    'comma-dangle': 0,
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'no-return-assign': 0,
    camelcase: 0
  }
}
