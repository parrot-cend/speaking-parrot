module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential', // this is a default sub-set of rules for your .vue files
    '@vue/typescript' // default typescript related rules
  ],
  rules: {
    'vue/no-use-v-if-with-v-for': 'off',
    'vue/no-parsing-error': 'off',
    'vue/no-unused-vars': 'off',
    'no-useless-escape': 'off',
    'no-case-declarations': 'off'
  },
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
