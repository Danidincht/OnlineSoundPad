/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './PadEditor.css';

function PadEditor ({onsave}) {
	const [titleInputValue, setTitleInputValue] = useState(''),
		[audioInputValue, setAudioInputValue] = useState(null);

	const handleTitleChange = (event)  => {
		event.preventDefault();
		setTitleInputValue(event.target.value);
	};

	const handleFileChange = (event) => {
		var file = event.target.files[0];
		if(file && file.type.startsWith('audio')) {
			setAudioInputValue(file);
		}
	};

	const handleSubmitForm = (e) => {
		e.preventDefault();
		onsave({
			title: titleInputValue,
			audio: audioInputValue
		});
		return;
	};


	return (
		<div className='PadEditor'>
			<form onSubmit={handleSubmitForm}>
				<input name='title' type='text' placeholder='Pad title' onChange={handleTitleChange} value={titleInputValue}/>
				<input name='audio' type='file' accept='audio/*' onChange={handleFileChange}/>
				<button type='submit'>Save</button>
			</form>
		</div>
	);
}

export default PadEditor;
