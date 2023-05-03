const react = require('eslint-plugin-react');

module.exports = [{
	rules: {
		quotes: ['error', 'single'],
		'jsx-quotes': ['error', 'prefer-single']
	},
	languageOptions: {
		parserOptions: {
			ecmaFeatures: {
				jsx: true,
			},
		},
	},
	plugins: [react],
}];