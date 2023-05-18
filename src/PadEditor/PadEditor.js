import React from 'react';
import './PadEditor.css';

function PadEditor () {
	return (
		<div className='PadEditor'>
			<form>
				<input name='title' type='text' placeholder='Pad title' value={titleInputValue}/>
			</form>
			PadEditor Component
		</div>
	);
}

export default PadEditor;
