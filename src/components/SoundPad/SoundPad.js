import React from 'react';
import ItemInput from '../ItemInput/ItemInput';
import ItemList from '../ItemList/ItemList';
import Gun from 'gun';
import 'gun/lib/radix';
import 'gun/lib/radisk';
import 'gun/lib/store';
import 'gun/lib/rindexed';

function SoundPad() {
	var opt = {
		peers: 'https://gun-manhattan.herokuapp.com/gun',
		localStorage: false
	};

	var gun = Gun(opt);
	var soundPadNode = roomNode.get('soundPad');
	var itemsNode = soundPadNode.get('items');

	return (
	<div>
		<ItemInput itemsNode={itemsNode}></ItemInput>
		<ItemList itemsNode={itemsNode}></ItemList>
	</div>
)};

export default SoundPad;