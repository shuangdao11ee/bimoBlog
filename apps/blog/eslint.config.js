'use strict';
const js = require('@eslint/js');

const eslintPluginExample = require('./eslint/eslint-plugin-example');

module.exports = [
  // js.configs.recommended,
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 'latest',
      parser: require('@typescript-eslint/parser') // 使用 TypeScript 解析器
    },
    plugins: {
      example: eslintPluginExample,
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin') // 启用 TypeScript ESLint 插件
    },
    rules: {
      'example/enforce-foo-bar': 'error',
      'example/no-async-and-sync-import': 'error'
    }
  }
];
