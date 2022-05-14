import { React, useState } from 'react';

const ItemInput = (props) => {
	const reader = new FileReader();
	const [inputValue, setInputValue] = useState("");
	const [fileValue, setFileValue] = useState("");

	reader.onload = () => {
		setFileValue(reader.result);
	};

	function handleSubmit(e) {
		e.preventDefault();
		props.itemsNode.set({text: inputValue, file: fileValue});
	};

	function handleTextChange(e) {
		setInputValue(e.target.value);
	}

	function handleFileChange(e) {
		reader.readAsDataURL(e.target.files[0]);
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
