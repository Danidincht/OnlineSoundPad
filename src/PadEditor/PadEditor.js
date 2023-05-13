import React from 'react';
import './PadEditor.css';

const PadEditor = () => (
	<div className='PadEditor'>
		<form>
			<input name='title' type='text' placeholder='Pad title' onChange={handleTitleChange}/>
		</form>
		PadEditor Component
	</div>
);

export default PadEditor;
