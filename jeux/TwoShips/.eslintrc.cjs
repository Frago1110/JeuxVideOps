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
    'camelcase': 'off', // convention mathématique intentionnelle (vec3_X, mat4_create...)
    'no-unused-vars': 'off', // variables inutilisées ignorées (code original js13k)
    'max-len': 'off', // lignes légèrement trop longues (81-86 chars)
    'no-var': 'off',
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
