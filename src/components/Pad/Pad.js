import React from 'react';

function Pad(props) {
	var audio = new Audio(props.sound);
	audio.controls = true;

	function onPadClick() {
		audio.play();
	}

	return (
	<div>
		<button onClick={onPadClick}>
			{props.text}
		</button>
		<br></br>
	</div>
)};

export default Pad;