jest.mock('../GunJSHelper');

import React, { useState as useStateMock } from 'react';
import { render } from '@testing-library/react';
import SoundPad from '../SoundPad';
import { getItemsNode } from '../GunJSHelper';

jest.mock('react', () => ({
	...jest.requireActual('react'),
	useState: jest.fn()
}))
const setItemMapMock = jest.fn()


beforeEach(() => {
	useStateMock.mockImplementation((init) => [init, setItemMapMock])
});

it('renders basic Sound Pad layout', () => {
	// Given
	getItemsNode.mockReturnValue({
		map: () => ({
			on: jest.fn()
		})
	});

	// When
	const page = render(<SoundPad />).baseElement;

	// Then
	expect(page).toMatchSnapshot();
});

it('renders items from GunJS', () => {
	// Given
	var items = new Map([
		[1, {text: 'text1', audio: {}}],
		[2, {text: 'text2', audio: {}}]
	]);
	useStateMock.mockImplementation(() => [items, setItemMapMock])
	getItemsNode.mockReturnValue({
		map: () => ({
			on: jest.fn()
		})
	});

	// When
	const page = render(<SoundPad />).baseElement;

	// Then
	expect(page).toMatchSnapshot();
});

it('Adds items to itemMap to render if data is not null', () => {
	// Given
	var gunJSOnCallback;
	getItemsNode.mockReturnValue({
		map: () => ({
			on: (cb) => {
				gunJSOnCallback = cb;
			}
		})
	});
	render(<SoundPad />).baseElement;

	// When
	gunJSOnCallback('non-null object');

	// Then
	expect(setItemMapMock).toBeCalledTimes(1);
});

it('Does not add item to itemMap to render if data is null', () => {
	// Given
	var gunJSOnCallback;
	getItemsNode.mockReturnValue({
		map: () => ({
			on: (cb) => {
				gunJSOnCallback = cb;
			}
		})
	});
	render(<SoundPad />).baseElement;

	// When
	gunJSOnCallback(null);

	// Then
	expect(setItemMapMock).toBeCalledTimes(0);
});
