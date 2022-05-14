import React from 'react';
import Pad from '../Pad/Pad';

function ItemList(props) {
	function renderList() {
		return props.itemList.map((item, index) => 
			<Pad key={index} text={item.text} sound={item.file}></Pad>
		);
	}

	return (
	<div>
		{renderList()}
	</div>
)};

export default ItemList;