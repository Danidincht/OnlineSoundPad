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

Pad.propTypes = {};
Pad.defaultProps = {};

export default Pad;