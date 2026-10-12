// ESLint flat config (ESM file because the project itself compiles to CommonJS).
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

export default tseslint.config(
  { ignores: ['dist/', 'coverage/', 'reports/', 'node_modules/'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.node },
    },
    rules: {
      // Allow intentionally unused parameters such as `_req` in Express handlers.
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    files: ['tests/**/*.ts'],
    languageOptions: {
      globals: { ...globals.jest },
    },
  },
  {
    // Config files that run as CommonJS.
    files: ['**/*.js'],
    languageOptions: { sourceType: 'commonjs' },
  },
  // Must stay last: turns off formatting rules that would conflict with Prettier.
  prettier,
);
