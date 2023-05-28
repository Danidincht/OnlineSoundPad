jest.mock('gun');

import * as gunJsHelper from '../GunJSHelper';
import Gun from 'gun';

afterEach(jest.resetModules);

describe('GunJSHelper', () => {
	describe('getGunInstance', () => {
		it('creates a GunJS instance', () => {
			// Given - When
			gunJsHelper.getGunInstance();
			
			// Then
			expect(Gun).toBeCalledTimes(1);
			expect(Gun).toBeCalledWith(expect.objectContaining({
				peers: 'https://gun-manhattan.herokuapp.com/gun',
				localStorage: false
			}));
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
			gunJsHelper.getItemsNode(roomName);

			// Then
			expect(Gun).toBeCalledTimes(1);
			expect(gunMock.get).toBeCalledTimes(3);
			expect(gunMock.get.mock.calls[0][0]).toBe(roomName);
			expect(gunMock.get.mock.calls[1][0]).toBe('soundPad');
			expect(gunMock.get.mock.calls[2][0]).toBe('items');
		});
	});

	describe('saveItem', () => {
		it('saves items to GunJS', () => {
			// Given - When
			expect(gunJsHelper.saveItem).toBeDefined();
		});
	});
});