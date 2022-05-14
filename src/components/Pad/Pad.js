import React from 'react';

function Pad(props) {
	function onPadClick() {
		console.log(props.sound);
		var audio = new Audio(props.sound);
		audio.controls = true;
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