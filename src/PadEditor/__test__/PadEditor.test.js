import React, { useState as useStateMock } from 'react';
import { createEvent, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PadEditor from '../PadEditor';

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useState: jest.fn()
}));
const setTitleInputValueMock = jest.fn(),
	setAudioInputValueMock = jest.fn();

const selector = {
	titleInputSelector: 'input[name=title]',
	audioInputSelector: 'input[name=audio]'
};

describe('PadEditor', () => {
	let container,
		titleInput,
		audioInput;

	beforeEach(() => {
		useStateMock
			.mockImplementationOnce((init) => [init, setTitleInputValueMock])
			.mockImplementationOnce((init) => [init, setAudioInputValueMock]);

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

		it('onChange event saves input value', () => {
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
			expect(setAudioInputValueMock).not.toBeCalled();
			
			expect(setTitleInputValueMock).toBeCalledTimes(1);
			expect(setTitleInputValueMock).toBeCalledWith(newValue);

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

		it('onChange event saves input value', () => {
			// Given
			const newFile = {
					name: 'fileName',
					type: 'audio/mpeg'
				},
				eventData = {
					target: {
						files: [newFile]
					}
				},
				changeEvent = createEvent.change(audioInput, eventData);

			// When;
			fireEvent(audioInput, changeEvent);

			// Then
			expect(setTitleInputValueMock).not.toBeCalled();

			expect(setAudioInputValueMock).toBeCalledTimes(1);
			expect(setAudioInputValueMock).toBeCalledWith(newFile);
		});

		it('onChange event does not save non-audio files', () => {
			// Given
			const newFile = {
					name: 'fileName',
					type: 'image/mpeg'
				},
				eventData = {
					target: {
						files: [newFile]
					}
				},
				changeEvent = createEvent.change(audioInput, eventData);

			// When;
			fireEvent(audioInput, changeEvent);

			// Then
			expect(setTitleInputValueMock).not.toBeCalled();
			expect(setAudioInputValueMock).not.toBeCalled();
		});

		it('onChange event does not save null files', () => {
			// Given
			const newFile = null,
				eventData = {
					target: {
						files: [newFile]
					}
				},
				changeEvent = createEvent.change(audioInput, eventData);

			// When;
			fireEvent(audioInput, changeEvent);

			// Then
			expect(setTitleInputValueMock).not.toBeCalled();
			expect(setAudioInputValueMock).not.toBeCalled();
		});


	});
});