jest.mock('../GunJSHelper');

import React, { useState as useStateMock } from 'react';
import { render } from '@testing-library/react';
import SoundPad from '../SoundPad';
import { getItemsNode, saveItem } from '../GunJSHelper';
import {} from 'gun/lib/open';

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useState: jest.fn()
}));
const setItemMapMock = jest.fn();

const mockPadEditor = jest.fn();
jest.mock('#c/PadEditor', () => (props) => {
	mockPadEditor(props);
	return (
		<div>PadEditorMockComponent</div>
	);
});
jest.mock('#c/PadItem');

beforeEach(() => {
	useStateMock.mockImplementation((init) => [init, setItemMapMock]);
	getItemsNode.mockReturnValue({
		open: jest.fn()
	});
});

afterEach(jest.clearAllMocks);

describe('SoundPad', () => {
	const roomName = 'AAAG';

	it('renders basic Sound Pad layout', () => {
		// Given - When
		const page = render(<SoundPad />).baseElement;

		// Then
		expect(page).toMatchSnapshot();
	});

	it('renders items from GunJS', () => {
		// Given
		var items = {
			1: {text: 'text1', audio: {}},
			2: {text: 'text2', audio: {}}
		};
		useStateMock.mockImplementation(() => [items, setItemMapMock]);

		// When
		const page = render(<SoundPad />).baseElement;

		// Then
		expect(page).toMatchSnapshot();
		expect(getItemsNode).toBeCalledTimes(1);
		expect(getItemsNode).toBeCalledWith(roomName);
	});

	describe('itemsNode on function callback', () => {
		let gunJSOnCallback;
		beforeEach(() => {
			gunJSOnCallback = undefined;
			getItemsNode.mockReturnValue({
				open: (cb) => {
						gunJSOnCallback = cb;
					}
				});
		});

		it('Adds items to itemMap to render if data is not null', () => {
			// Given
			render(<SoundPad />).baseElement;

			// When
			gunJSOnCallback('non-null object');

			// Then
			expect(setItemMapMock).toBeCalledTimes(1);
		});

		it('Does not add item to itemMap to render if data is null', () => {
			// Given
			render(<SoundPad />).baseElement;

			// When
			gunJSOnCallback(null);

			// Then
			expect(gunJSOnCallback).toBeDefined();
			expect(setItemMapMock).toBeCalledTimes(0);
		});
	});

	describe('PadEditor onSubmit handler', () => {
		const fakeAudioAsDataURL = 'audioAsDataUrl',
			fakeSaveEventData = {
				title: 'fakeTitle',
				audio: {
					file: fakeAudioAsDataURL
				}
			};

		const mockFileReader = (result) => {
			const mockOnLoadFileReader = jest.fn(),
				fileReader = {
					readAsDataURL: mockOnLoadFileReader,
					onloadRef: undefined,
					result
				};
				
			Object.defineProperty(fileReader, 'onload', {
				get() {
					return this._onload;
				},
				set(onload) {
					fileReader.onloadRef = onload;
					this._onload = onload;
				}
			});
			
			jest.spyOn(window, 'FileReader').mockImplementation(() => fileReader);
			
			return fileReader;
		};

		it('reads audio file as data url and sets onload function', () => {
			// Given
			const fileReader = mockFileReader();

			render(<SoundPad />);
			const saveFn = mockPadEditor.mock.calls[0][0]['onsubmit'];

			// When
			saveFn(fakeSaveEventData);

			// Then
			expect(fileReader.readAsDataURL).toBeCalledTimes(1);
			expect(fileReader.onloadRef).toBeDefined();
		});

		it('calls gunJsHelper saveItem with processed data', () => {
			// Given
			const fileReader = mockFileReader(fakeAudioAsDataURL);

			render(<SoundPad />);
			const saveFn = mockPadEditor.mock.calls[0][0]['onsubmit'];
			saveFn(fakeSaveEventData);
			
			// When
			fileReader.onloadRef(fakeSaveEventData);

			// Then
			expect(saveItem).toBeCalledTimes(1);
			expect(saveItem).toBeCalledWith(roomName, fakeSaveEventData);
		});

	});
});