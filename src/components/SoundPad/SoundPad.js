import React from 'react';
import ItemInput from '../ItemInput/ItemInput';
import ItemList from '../ItemList/ItemList';
function SoundPad() {
	const GUN = require('gun');

	return (
	<div>
		<ItemInput></ItemInput>
		<ItemList itemList={state.itemList}></ItemList>
	</div>
)};

export default SoundPad;