import { React, useState } from 'react';

const ItemInput = (props) => {
	const [inputValue, setInputValue] = useState("");
	const [fileValue, setFileValue] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		props.handleSubmit({text: inputValue, file: fileValue});
	};

	function handleTextChange(e) {
		setInputValue(e.target.value);
	}

	function handleFileChange(e) {
		setFileValue(e.target.value);
	}

	return (
	<div>
		<form onSubmit={handleSubmit}>
			<input type='text' onChange={handleTextChange}/>
			<input type='file' onChange={handleFileChange}/>
			<button type='submit'>Submit</button>
		</form>
	</div>
)};

export default ItemInput;
