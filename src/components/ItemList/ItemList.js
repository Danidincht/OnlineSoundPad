import React from 'react';
import Pad from '../Pad/Pad';
import { useState, useEffect } from 'react';

function ItemList(props) {
	const [itemMap, setItemMap] = useState(new Map());

	function renderList() {
		return [...itemMap.keys()].map(key => {
			var padItem = itemMap.get(key);
			return <Pad key={key} text={padItem.text} sound={padItem.file}></Pad>
		});
	}


	useEffect(() => {
		var firstRender = true;
		
		props.itemsNode
			.map()
			.on((data, key) => {
				if(data !== null && !firstRender) {
					setItemMap(prevState => new Map(prevState).set(key, data));
				}
				return data;
		});
		firstRender = false;
	}, [props.itemsNode]);

	return (
	<div>
		{renderList()}
	</div>
)};

export default ItemList;