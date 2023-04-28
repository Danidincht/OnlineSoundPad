function PadItem(props) {
	return(
	<div>
		{props.title}
		<audio
			src={props.audio}
			controls={true}
		></audio>
	</div>
	);
}

export default PadItem;