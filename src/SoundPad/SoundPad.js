import './SoundPad.css';
import PadItem from '../PadItem/PadItem';

function SoundPad() {
	const items = [
		createPadItemContent('PadItem1', 'https://www.sousound.com/music/healing/healing_01.mp3'),
		createPadItemContent('PadItem2', 'https://www.sousound.com/music/healing/healing_02.mp3')
	];
	return (
		<div>
			Sound Pad Online
			{
				items.map((item) => (
					<PadItem 
						title={item.title}
						audio={item.audio}
					/>
				))
			}
		</div>
	);
}

function createPadItemContent(title, audio) {
	return {
		title,
		audio
	}
}

export default SoundPad;
