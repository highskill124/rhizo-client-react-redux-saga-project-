module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
        project: './tsconfig.json',
    },
    extends: ['airbnb-typescript/base', 'airbnb/hooks', 'plugin:@typescript-eslint/recommended', 'plugin:jest/recommended', 'prettier', 'prettier/react', 'prettier/@typescript-eslint', 'plugin:prettier/recommended', 'plugin:jsx-a11y/recommended'],

    env: {
        browser: true,
        es6: true,
        jest: true,
    },
    plugins: ['prettier', 'react', '@typescript-eslint', 'jest', 'jsx-a11y'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },

    rules: {
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
        'class-methods-use-this': 'off',
        'no-param-reassign': 'error',
        'import/prefer-default-export': 'off',
        camelcase: 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        // 'no-unused-vars': ['error', { argsIgnorePattern: 'next', vars: 'all', args: 'none', enum: 'none' }],
        'max-classes-per-file': 'off',
        'array-callback-return': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        'global-require': 'off',
        'import/no-dynamic-require': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-empty-interface': 0,
        'no-plusplus': 'off',
        'no-underscore-dangle': 'off',
        'import/extensions': 'off',
        'no-else-return': 'off',
        'consistent-return': 'off',
        'no-return-assign': 'off',
        'import/no-extraneous-dependencies': ['off'],
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['off'],
        '@typescript-eslint/no-use-before-define': ['off'],
        'no-use-before-define': 'off',

        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': ['off'],


        // "@typescript-eslint/ban-types": 'off',
        // "react/prop-types": 0,
        // "jsx-a11y/click-events-have-key-events": 0
    },
};
