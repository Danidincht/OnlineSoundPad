jest.mock('gun');

import * as gunJsHelper from '../GunJSHelper';
import Gun from 'gun';

afterEach(jest.resetModules);

describe('GunJSHelper', () => {
	const fakeRoomName = 'roomName';

	let gunMock;
	beforeEach(() => {
		gunMock = {
			get: jest.fn(() => gunMock),
			set: jest.fn()
		};
		Gun.mockReturnValue(gunMock);
	});
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
			// Given - When
			gunJsHelper.getItemsNode(fakeRoomName);

			// Then
			expect(Gun).toBeCalledTimes(1);
			expect(gunMock.get).toBeCalledTimes(3);
			expect(gunMock.get.mock.calls[0][0]).toBe(fakeRoomName);
			expect(gunMock.get.mock.calls[1][0]).toBe('soundPad');
			expect(gunMock.get.mock.calls[2][0]).toBe('items');
		});
	});

	describe('saveItem', () => {
		it('saves items to GunJS', () => {
			// Given 
			var fakeItemData = {
					text: 'audioTitle'
				};

			// When 
			gunJsHelper.saveItem(fakeRoomName, fakeItemData);

			// Then
			expect(gunMock.get).toBeCalledTimes(3);
			expect(gunMock.get.mock.calls[0][0]).toBe(fakeRoomName);
			expect(gunMock.get.mock.calls[1][0]).toBe('soundPad');
			expect(gunMock.get.mock.calls[2][0]).toBe('items');
			expect(gunMock.set).toBeCalledTimes(1);
			expect(gunMock.set.mock.calls[0][0]).toBe(fakeItemData);
		});
	});
});