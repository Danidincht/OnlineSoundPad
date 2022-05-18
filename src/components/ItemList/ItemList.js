import React from 'react';
import Pad from '../Pad/Pad';
import { useState, useEffect } from 'react';

function ItemList(props) {
	const [itemMap, setItemMap] = useState(new Map());

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
		{
			[...itemMap.keys()].map((key) =>
				<div key={key}>
					{itemMap.get(key).text} | 
					<Pad 
						id={key}
						padNode={props.itemsNode}>
					</Pad>
				</div>
			)
		}
	</div>
)};

export default ItemList;