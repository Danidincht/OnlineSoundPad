import React, { useState as useStateMock } from 'react';
import { createEvent, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PadEditor from '../PadEditor';

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useState: jest.fn()
}));
const setInputTitleValueMock = jest.fn();

const selectors = {
	titleInput: 'input[name=title]'
};

describe('PadEditor', () => {
	it('it should render the PadEditor component', () => {
		// Given
		useStateMock.mockImplementation((init) => [init, setInputTitleValueMock]);
		const component = (<PadEditor />);

		// When
		const page = render(component).baseElement;

		// Then
		expect(page).toMatchSnapshot();
	});

	describe('Title input', () => {
		let titleInput;
		beforeEach(() => {
			useStateMock.mockImplementation((init) => [init, setInputTitleValueMock]);
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

		it('onChange event saves inputs value', () => {
			// Given
			const newValue = 'new value',
				eventData = {
					target: {
						value: newValue
					}
				},
				changeEvent = createEvent.change(titleInput, eventData);
			
			changeEvent.preventDefault = jest.fn();

			// When;
			fireEvent(titleInput, changeEvent);

			// Then
			expect(setInputTitleValueMock).toBeCalledTimes(1);
			expect(setInputTitleValueMock).toBeCalledWith(newValue);

			expect(changeEvent.preventDefault).toBeCalledTimes(1);
		});
	});
});