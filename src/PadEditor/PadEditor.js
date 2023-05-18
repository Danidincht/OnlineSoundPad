import React, { useState } from 'react';
import './PadEditor.css';

function PadEditor () {
	const handleTitleChange = (event)  => {
		event.preventDefault();
		setItemInputValue(event.target.value);
	};

	const [titleInputValue, setItemInputValue] = useState('');

	return (
		<div className='PadEditor'>
			<form>
				<input name='title' type='text' placeholder='Pad title' onChange={handleTitleChange} value={titleInputValue}/>
				<input name='audio' type='file' accept='audio/*'/>
			</form>
		</div>
	);
}

export default PadEditor;
