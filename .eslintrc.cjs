import { projectStructureParser, projectStructurePlugin } from 'eslint-plugin-project-structure';

// eslint-disable-next-line no-undef
export default {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:react/recommended', 'prettier'],
  ignorePatterns: ['dist'],
  parser: '@typescript-eslint/parser',
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'prettier/prettier': [
      'error',
      {
        jsxBracketSameLine: false,
        singleQuote: true,
        jsxSingleQuote: true,
        useTabs: false,
        semi: true,
        printWidth: 120,
        tabWidth: 2,
        endOfLine: 'auto',
        trailingComma: 'all',
        bracketSpacing: true,
      },
    ],
    semi: [2, 'always'],
    'linebreak-style': 'off',
    // quotes: 0,
    'max-len': 0,
    indent: 0,
    'react/display-name': 'off',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unknown-property': [
      2,
      {
        ignore: ['jsx', 'global'],
      },
    ],
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'no-control-regex': 0,
  },
};
