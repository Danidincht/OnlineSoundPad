const react = require('eslint-plugin-react');
const jest = require('eslint-plugin-jest');
const recommended = require('@eslint/js/src/configs/eslint-recommended');

const globals = require('globals');

// const recommended = require('eslint-config-recommended');

module.exports = [
	{
		files: ['src/**/*.{js,jsx,mjs,cjs,ts,tsx}'],
		rules: {
			// Extension rules
			...recommended.rules,
			quotes: ['error', 'single'],

			// Plugins rules 
			'jsx-quotes': ['error', 'prefer-single'],
			'react/jsx-uses-react': 'error',
			'react/jsx-uses-vars': 'error',

			// Added rules
			'semi-style': ['error', 'last'],
			'semi': ['error', 'always', {}]
		},
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				...globals.browser,
				...jest.environments.globals.globals
			}
		},
		plugins: {
			react,
			jest
		}
	}
];
