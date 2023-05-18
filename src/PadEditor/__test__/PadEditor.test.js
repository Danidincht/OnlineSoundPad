import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PadEditor from '../PadEditor';

const selectors = {
	titleInput: 'input[name=title]'
};

describe('PadEditor', () => {
	it('it should render the PadEditor component', () => {
		// Given
		const component = (<PadEditor />);

		// When
		const page = render(component).baseElement;

		// Then
		expect(page).toMatchSnapshot();
	});

	describe('Title input', () => {
		let titleInput;
		beforeEach(() => {
			const {container} = render(<PadEditor />);
			titleInput = container.querySelector(selectors.titleInput);
		});
		it('Has expected properties', () => {
			// Given - When - Then
			expect(titleInput.getAttribute('placeholder')).toEqual('Pad title');
			expect(titleInput.getAttribute('type')).toEqual('text');
			expect(titleInput.getAttribute('name')).toEqual('title');
			expect(titleInput.getAttribute('value')).toEqual('');
		});

	});
});