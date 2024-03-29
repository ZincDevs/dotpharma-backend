module.exports = {
  root: true,
  extends: ['airbnb-base'],
  env: {
    node: true,
    es6: true,
    mocha: true
  },
  rules: {
    'one-var': 0,
    'one-var-declaration-per-line': 0,
    'new-cap': 0,
    'consistent-return': 0,
    'no-param-reassign': 0,
    'comma-dangle': 0,
    curly: ['error', 'multi-line'],
    'import/no-unresolved': [2, { commonjs: true }],
    'no-shadow': ['error', { allow: ['req', 'res', 'err'] }],
    'valid-jsdoc': ['error', {
      requireReturn: true,
      requireReturnType: true,
      requireParamDescription: false,
      requireReturnDescription: true
    }],
    'jsx-a11y/anchor-is-valid': 'off',
    'require-jsdoc': ['error', {
      require: {
        FunctionDeclaration: true,
        MethodDefinition: true,
        ClassDeclaration: true
      }
    }],
    'linebreak-style': 0
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true
  }
};
