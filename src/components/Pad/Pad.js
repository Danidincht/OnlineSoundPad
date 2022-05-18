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
			if(audioElementRef.current != null) {
				if(isPlaying)
					audioElementRef.current.play();
				else
					audioElementRef.current.pause();
			}
		});

	function onPlay(e) {
		e.preventDefault();
		props.padNode.get(props.id).put({audio: { isPlaying: true }})
	}

	function onPause(e) {
		e.preventDefault();
		props.padNode.get(props.id).put({audio: { isPlaying: false }})
	}

	return (
	<span>
		<audio 
			controls
			ref={audioElementRef}
			src={file}
			onPlay={onPlay}
			onPause={onPause}
		></audio>
	</span>
)};

export default Pad;