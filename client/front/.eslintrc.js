module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard',
        //'@vue/prettier'
    ],
    rules: {

        // "no-else-return": "error",
        // "no-multi-spaces": "error",
        // "indent": ["error", 4, {
        //   "SwitchCase": 1
        // }],
        // "quotes": [
        //   "error",
        //   "single"
        // ],
        // "semi": [
        //   "error",
        //   "always"
        // ],
        "space-before-function-paren": 0,
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        indent: ['error', 4]
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
