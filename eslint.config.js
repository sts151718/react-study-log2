import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      eslintConfigPrettier,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // noopener noreferrer なしで target='_blank'を許可するか
      'react/jsx-no-target-blank': 'off',
      // コンポーネントと関数を同じファイルからエクスポートすることを許可するかどうか
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // 利用していない変数を許可するかどうか
      'no-unused-vars': false,
    },
  },
]);
