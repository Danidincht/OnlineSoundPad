import Gun from 'gun';

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