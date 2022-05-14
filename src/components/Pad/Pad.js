import React from 'react';

function Pad(props) {
	function onPadClick() {
		console.log(props.sound);
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