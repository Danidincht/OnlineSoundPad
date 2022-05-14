import React from 'react';
import Pad from '../Pad/Pad';

function ItemList(props) {
	function renderList() {
		return props.itemList.map((item, index) => 
			<Pad key={index} text={item} sound={"s" + item}></Pad>
		);
	}

	return (
	<div>
		{renderList()}
	</div>
)};

ItemList.propTypes = {};
ItemList.defaultProps = {};

export default ItemList;