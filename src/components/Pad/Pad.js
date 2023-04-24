import { React, useEffect, createRef } from 'react';

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
		}, true);

	function onPlay(e) {
		e.preventDefault();
		props.padNode.get(props.id).put({audio: { isPlaying: true }});
	}

	function onPause(e) {
		e.preventDefault();
		props.padNode.get(props.id).put({audio: { isPlaying: false }});
	}

	function onCan(e) {
		e.preventDefault();
		if(isPlaying) e.target.play();
	}

	return (
	<span>
		{String(isPlaying)}
		<audio 
			// crossorigin="anonymous"
			controls
			ref={audioElementRef}
			src={file}
			onPlay={onPlay}
			onPause={onPause}
			onCanPlay={onCan}
		></audio>
	</span>
)};

export default Pad;