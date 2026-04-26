module.exports = {
  root: true,
  env: { node: true, es2022: true },
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  ignorePatterns: ['dist/', '.next/', 'node_modules/'],
  extends: ['eslint:recommended'],
  rules: {
    'no-console': 'off',
  },
};
