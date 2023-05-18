/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './PadEditor.css';

function PadEditor () {
	const [titleInputValue, setItemInputValue] = useState(''),
		[audioInputValue, setAudioInputValue] = useState(null);

	const handleTitleChange = (event)  => {
		event.preventDefault();
		setItemInputValue(event.target.value);
	};

	const handleFileChange = (event) => {
		var file = event.target.files[0];
		if(file && file.type.startsWith('audio')) {
			setAudioInputValue(file);
		}
	};


	return (
		<div className='PadEditor'>
			<form>
				<input name='title' type='text' placeholder='Pad title' onChange={handleTitleChange} value={titleInputValue}/>
				<input name='audio' type='file' accept='audio/*' onChange={handleFileChange}/>
			</form>
		</div>
	);
}

export default PadEditor;
