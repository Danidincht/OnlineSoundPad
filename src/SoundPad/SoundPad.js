import './SoundPad.css';
import { useState, useEffect, useRef } from 'react';
import { getItemsNode, saveItem } from './GunJSHelper';
import PadItem from '#c/PadItem';
import PadEditor from '#c/PadEditor';
import { } from 'gun/lib/open';

function SoundPad() {
	const [itemMap, setItemMap] = useState(new Map()),
		fileReader = new FileReader(),
		roomName = 'AAAG';
	var itemsNode = useRef(null);

	useEffect(() => {
		if(!itemsNode.current) {
			itemsNode.current = getItemsNode(roomName);

			itemsNode.current
				.open((data) => {
					if(data !== null) {
						setItemMap(data);
					}
				});
		}
	}, [itemsNode]);

	const handleOnSubmit = ({title, audio}) => {
		fileReader.onload = () => {
			saveItem(roomName , {
				title,
				audio: {
					file: fileReader.result
				}
			});
		};

		fileReader.readAsDataURL(audio);
	};

	return (
		<div>
			Sound Pad Online
			<PadEditor onsubmit={handleOnSubmit}/>
			{
				[...Object.keys(itemMap)].map((key, index) =>
					<PadItem
						key={index}
						title={itemMap[key].title}
						audio={itemMap[key].audio}
					/>
			)
			}
		</div>
	);
}

export default SoundPad;
