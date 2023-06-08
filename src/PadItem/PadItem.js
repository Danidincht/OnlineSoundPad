function PadItem(props) {
	return(
	<div>
		{props.title}
		<audio
			src={props.audio.file}
			controls={true}
		></audio>
	</div>
	);
}

export default PadItem;