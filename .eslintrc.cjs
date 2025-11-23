module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:astro/recommended',
    'plugin:prettier/recommended'
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint']
    },
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro']
      },
      rules: {
        'astro/no-set-html-directive': 'off'
      }
    }
  ],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'prettier/prettier': [
      'error',
      {
        useTabs: false,
        tabWidth: 2
      }
    ]
  }
};
