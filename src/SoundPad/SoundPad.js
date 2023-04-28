import './SoundPad.css';
import PadItem from '#c/PadItem';

function SoundPad() {
	const items = [
		createPadItemContent('PadItem1', 'https://www.sousound.com/music/healing/healing_01.mp3'),
		createPadItemContent('PadItem2', 'https://www.sousound.com/music/healing/healing_02.mp3')
	];
	return (
		<div>
			Sound Pad Online
			{
				items.map((item, index) => (
					<PadItem
						key={index}
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
