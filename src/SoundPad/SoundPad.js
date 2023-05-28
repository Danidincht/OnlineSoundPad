import './SoundPad.css';
import { useState, useEffect, useRef } from 'react';
import { getItemsNode, saveItem } from './GunJSHelper';
import PadItem from '#c/PadItem';
import PadEditor from '#c/PadEditor';

function SoundPad() {
	const [itemMap, setItemMap] = useState(new Map());
	var itemsNode = useRef(null);

	useEffect(() => {
		if(!itemsNode.current) {
			itemsNode.current = getItemsNode('AAAF');

			itemsNode.current
				.map()
				.on((data, key) => {
					if(data !== null) {
						setItemMap(prevState => new Map(prevState).set(key, data));
					}
				});
		}
	}, [itemsNode]);

	const handleOnSave = (event) => {
		saveItem(event);
	};

	return (
		<div>
			Sound Pad Online
			<PadEditor onsave={handleOnSave}/>
			{
				[...itemMap.keys()].map((key, index) =>
					<PadItem
						key={index}
						title={itemMap.get(key).text}
						audio={itemMap.get(key).audio}
					/>
			)
			}
		</div>
	);
}

export default SoundPad;
