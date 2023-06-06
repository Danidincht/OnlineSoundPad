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
	titleInput: 'input[name=title]',
	audioInput: 'input[name=audio]',
	submitButton: 'button[type=submit]',
	editorForm: 'form'
};


describe('PadEditor', () => {
	let container;

	const getTitleInput = () => container.querySelector(selector.titleInput);
	const getAudioInput = () => container.querySelector(selector.audioInput);

	const mockUseState = (titleMock, audioMock) => {
		useStateMock
			.mockImplementationOnce((init) => [titleMock || init, setTitleInputValueMock])
			.mockImplementationOnce((init) => [audioMock || init, setAudioInputValueMock]);
	};

	it('it should render the PadEditor component', () => {
		// Given
		mockUseState(null, null);
		({container} = render(<PadEditor />));

		// When - Then
		expect(container).toMatchSnapshot();
	});

	describe('Title input', () => {
		let titleInput;
		beforeEach(() => {
			mockUseState(null, null);
			({container} = render(<PadEditor />));
			titleInput = getTitleInput();
		});
		
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
			expect(setTitleInputValueMock).toBeCalledTimes(1);
			expect(setTitleInputValueMock).toBeCalledWith(newValue);

			expect(changeEvent.preventDefault).toBeCalledTimes(1);
		});
	});

	describe('Audio input', () => {
		let audioInput;
		beforeEach(() => {
			mockUseState(null, null);
			({container} = render(<PadEditor />));
			audioInput = getAudioInput();
		});

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
				changeEvent = createFileEvent(newFile);

			// When;
			fireEvent(audioInput, changeEvent);

			// Then
			expect(setAudioInputValueMock).toBeCalledTimes(1);
			expect(setAudioInputValueMock).toBeCalledWith(newFile);
		});

		it('onChange event does not save non-audio files', () => {
			// Given
			const newFile = {
					name: 'fileName',
					type: 'image/mpeg'
				},
				changeEvent = createFileEvent(newFile);

			// When;
			fireEvent(audioInput, changeEvent);

			// Then
			expect(setAudioInputValueMock).not.toBeCalled();
		});

		it('onChange event does not save null files', () => {
			// Given
			const changeEvent = createFileEvent(null);

			// When;
			fireEvent(audioInput, changeEvent);

			// Then
			expect(setAudioInputValueMock).not.toBeCalled();
		});

		const createFileEvent = (newFile) => {
			return createEvent.change(audioInput, {
				target: {
					files: [newFile]
				}
			});
		};
	});

	describe('Save button', () => {
		it('fires onSubmit event', () => {
			// Given
			mockUseState('', '');
			({container} = render(<PadEditor onsubmit={() => {}}/>));

			const form = container.querySelector(selector.editorForm),
				submitButton = container.querySelector(selector.submitButton),
				submitMock = jest.fn();

			form.addEventListener('submit', () => {
				submitMock();
			});

			// When
			fireEvent.click(submitButton);

			// Then
			expect(submitMock).toBeCalledTimes(1);
		});
	});

	describe('onSubmit event', () => {
		it('Calls method passed with form data as argument on click', () => {
			// Given			
			const fakeTitle = 'fakeTitle',
				fakeAudio = {
					name: 'fileName',
					type: 'audio/mpeg'
				},
				onSubmitMock = jest.fn();

			mockUseState(fakeTitle, fakeAudio);

			({container} = render(<PadEditor onsubmit={onSubmitMock}/>));

			let editorForm = container.querySelector(selector.editorForm);
			let submitEvent = createEvent.submit(editorForm, {});
			submitEvent.preventDefault = jest.fn();

			// When 
			fireEvent(editorForm, submitEvent);

			// Then
			expect(submitEvent.preventDefault).toBeCalledTimes(1);

			expect(onSubmitMock).toBeCalledTimes(1);
			expect(onSubmitMock).toBeCalledWith({
				title: fakeTitle,
				audio: fakeAudio
			});
		});
	});
});