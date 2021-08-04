// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,

  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },

  env: {
    browser: true,
    es6: true,
  },

  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'standard',
    '@vue/typescript',
  ],

  // required to lint *.vue files
  plugins: [
    'vue',
    'eslint-plugin-import',
    '@typescript-eslint',
    '@typescript-eslint/tslint',
  ],

  rules: {
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    'object-property-newline': 'error',
    'lines-between-class-members': ['error', 'always'],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: ['block', 'block-like'], next: '*' },
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var', 'if'],
      },
      { blankLine: 'always', prev: 'directive', next: '*' },
      { blankLine: 'any', prev: 'directive', next: 'directive' },
    ],
    curly: 'error',
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-mixed-operators': 'off',
    'no-useless-escape': 'off',
    'no-async-promise-executor': 'off',
    // Vue-specific
    'vue/no-use-v-if-with-v-for': 'off',
    'vue/no-v-html': 'off',
    'comma-dangle': 'off',
    'space-before-function-paren': 'off',
    semi: 'off',

    '@typescript-eslint/array-type': [
      'error',
      {
        default: 'array',
      },
    ],
    '@typescript-eslint/consistent-type-definitions': 'error',
    '@typescript-eslint/explicit-member-accessibility': [
      'error',
      {
        accessibility: 'explicit',
      },
    ],
    '@typescript-eslint/member-ordering': 'error',
    '@typescript-eslint/no-dynamic-delete': 'error',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-namespace': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-require-imports': 'warn',
    '@typescript-eslint/no-shadow': [
      'warn',
      {
        hoist: 'all',
      },
    ],
    '@typescript-eslint/no-this-alias': 'error',
    '@typescript-eslint/no-unused-expressions': 'error',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/promise-function-async': 'off',
    '@typescript-eslint/unified-signatures': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    'constructor-super': 'error',
    'eol-last': 'error',
    eqeqeq: ['error', 'smart'],
    'guard-for-in': 'error',
    'id-blacklist': 'off',
    'id-match': 'off',
    'import/no-deprecated': 'warn',
    'import/order': 'error',
    'max-len': [
      'warn',
      {
        code: 120,
        ignoreStrings: true,
        ignoreTemplateLiterals: true
      },
    ],
    'no-bitwise': 'error',
    'no-caller': 'error',
    'no-cond-assign': 'error',
    'no-console': [
      'error',
      {
        allow: [
          'log',
          'warn',
          'info',
          'debug',
          'dir',
          'timeLog',
          'assert',
          'clear',
          'count',
          'countReset',
          'group',
          'groupEnd',
          'table',
          'dirxml',
          'error',
          'groupCollapsed',
          'Console',
          'profile',
          'profileEnd',
          'timeStamp',
          'context',
        ],
      },
    ],
    'no-duplicate-case': 'error',
    'no-duplicate-imports': 'error',
    'no-empty': 'off',
    'no-empty-function': 'off',
    'no-eval': 'error',
    'no-fallthrough': 'error',
    'no-magic-numbers': [
      'warn', // TODO: label numbers and into error quickly
      {
        ignore: [-1, 0, 1],
      },
    ],
    'no-new-wrappers': 'error',
    'no-param-reassign': 'error',
    'no-sequences': 'error',
    'no-shadow': 'warn',
    'no-sparse-arrays': 'error',
    'no-template-curly-in-string': 'error',
    'no-throw-literal': 'error',
    'no-undef-init': 'error',
    'no-underscore-dangle': 'off',
    'no-unused-expressions': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-template': 'error',
    radix: 'error',
  },
}
