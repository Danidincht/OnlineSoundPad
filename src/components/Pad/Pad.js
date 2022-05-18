import { React } from 'react';

function Pad(props) {
	var file,
		isPlaying,
		audioElementRef = createRef();

	props
		.padNode
		.get(props.id)
		.get('audio')
		.on((data) => {
			file = data.file;
			isPlaying = data.isPlaying;
		});
	return (
	<span>
		<audio 
			controls
			ref={audioElementRef}
			src={file}
		></audio>
	</span>
)};

export default Pad;