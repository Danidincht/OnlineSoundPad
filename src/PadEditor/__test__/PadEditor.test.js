import React, { useState as useStateMock } from 'react';
import { createEvent, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PadEditor from '../PadEditor';

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useState: jest.fn()
}));
const setInputTitleValueMock = jest.fn();

const selector = {
	titleInputSelector: 'input[name=title]',
	audioInputSelector: 'input[name=audio]'
};

describe('PadEditor', () => {
	let container,
		titleInput,
		audioInput;

	beforeEach(() => {
		useStateMock.mockImplementation((init) => [init, setInputTitleValueMock]);
		({container} = render(<PadEditor />));
		titleInput = container.querySelector(selector.titleInputSelector);
		audioInput = container.querySelector(selector.audioInputSelector);
	});

	it('it should render the PadEditor component', () => {
		// Given - When - Then
		expect(container).toMatchSnapshot();
	});

	describe('Title input', () => {
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

	describe('Title input', () => {
		it('Has expected properties', () => {
			// Given - When - Then
			expect(audioInput.getAttribute('type')).toEqual('file');
			expect(audioInput.getAttribute('name')).toEqual('audio');
			expect(audioInput.getAttribute('accept')).toEqual('audio/*');
			expect(audioInput.getAttribute('files')).toEqual(null);
		});
	});
});