module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:import/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  plugins: ['vue', 'import'],
  rules: {
    // 代码风格规则
    'indent': ['error', 2, { SwitchCase: 1 }],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'no-trailing-spaces': 'error',
    'eol-last': ['error', 'always'],
    'no-multiple-empty-lines': ['error', { max: 2, maxEOF: 1 }],

    // 最佳实践
    'curly': ['error', 'multi-line'],
    'eqeqeq': ['error', 'always'],
    'no-var': 'error',
    'prefer-const': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',

    // Vue 特定规则
    'vue/html-indent': ['error', 2],
    'vue/max-attributes-per-line': ['error', {
      singleline: 3,
      multiline: {
        max: 1,
        allowFirstLine: false
      }
    }],
    'vue/html-self-closing': ['error', {
      html: {
        void: 'always',
        normal: 'never',
        component: 'always'
      },
      svg: 'always',
      math: 'always'
    }],
    'vue/order-in-components': 'error',
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],

    // import 规则
    'import/order': ['error', {
      'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
      'newlines-between': 'always',
      'alphabetize': { order: 'asc', caseInsensitive: true }
    }],
    'import/no-unresolved': 'off', // 如果使用 webpack alias 可能会有问题
    'import/named': 'error',
    'import/default': 'error',
    'import/namespace': 'error',
    'import/no-absolute-path': 'error',
    'import/no-webpack-loader-syntax': 'error',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.vue'],
        moduleDirectory: ['node_modules', 'src/']
      }
    }
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'max-len': 'off' // 在 Vue 文件中允许更长的行
      }
    }
  ]
};