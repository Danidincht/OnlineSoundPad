import { React } from 'react';

function Pad(props) {
	return (
	<div>
		{props.text}
		<audio src={props.sound} controls></audio>
		<br></br>
	</div>
)};

export default Pad;