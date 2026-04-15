module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['eslint:recommended', 'google'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'require-jsdoc': 'off',
  },
  overrides: [
    {
      files: ['cypress/e2e/**/*.cy.js'],
      globals: {
        cy: 'readonly',
        describe: 'readonly',
        it: 'readonly',
        beforeEach: 'readonly',
      },
    },
  ],
};
