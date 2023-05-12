module.exports = {
    extends: [
        '@nuxtjs/eslint-config-typescript',
    ],
    rules: {
        indent: [0, 'tab',],
        'no-tabs': 0,
        'comma-dangle': ['error', {
            arrays: 'always',
            objects: 'always',
            imports: 'never',
            exports: 'never',
            functions: 'never',
        },],
        'vue/no-multiple-template-root': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/no-setup-props-destructure': 'off',
    },
}
