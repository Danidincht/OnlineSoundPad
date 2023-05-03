jest.mock('gun');

import { getGunInstance, getItemsNode } from "../GunJSHelper";
import Gun from "gun";

afterEach(jest.resetModules);

describe('getGunInstance', () => {
	it('creates a GunJS instance', () => {
		// Given - When
		getGunInstance();
		
		// Then
		expect(Gun).toBeCalledTimes(1);
	});
});

describe('getItemsNode', () => {
	it('gets items node of current room', () => {
		// Given
		var gunMock = {
			get: jest.fn(x => gunMock)
		},
		roomName = 'roomName';
		Gun.mockReturnValue(gunMock);

		// When
		getItemsNode(roomName);

		// Then
		expect(gunMock.get).toBeCalledTimes(3);
		expect(gunMock.get.mock.calls[0][0]).toBe(roomName);
		expect(gunMock.get.mock.calls[1][0]).toBe('soundPad');
		expect(gunMock.get.mock.calls[2][0]).toBe('items');
	});
});