import { React, useState } from 'react';

const ItemInput = (props) => {
	const [inputValue, setInputValue] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		props.handleSubmit(inputValue);
	};

	function handleChange(e) {
		setInputValue(e.target.value);
	}

	return (
	<div>
		<form onSubmit={handleSubmit}>
			<input id="itemInput" onChange={handleChange}/>
			<button type='submit'>Submit</button>
		</form>
	</div>
)};

export default ItemInput;
