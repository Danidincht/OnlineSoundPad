import Gun from 'gun';
import 'gun/lib/radix';
import 'gun/lib/radisk';
import 'gun/lib/store';
import 'gun/lib/rindexed';

export function getGunInstance() {
	return Gun({
		peers: 'https://gun-manhattan.herokuapp.com/gun',
		localStorage: false
	});
}

export function getItemsNode(roomName) {
	return getGunInstance().get(roomName)
		.get('soundPad')
		.get('items');
}

export function saveItem() {}