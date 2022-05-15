import React from 'react';
import ItemInput from '../ItemInput/ItemInput';
import ItemList from '../ItemList/ItemList';

function SoundPad() {
	const GUN = require('gun');
	var gun = GUN('https://gun-manhattan.herokuapp.com/gun');
	var roomNode = gun.get('AAAC');
	var soundPadNode = roomNode.get('soundPad');
	var itemsNode = soundPadNode.get('items');

	return (
	<div>
		<ItemInput itemsNode={itemsNode}></ItemInput>
		<ItemList itemsNode={itemsNode}></ItemList>
	</div>
)};

export default SoundPad;