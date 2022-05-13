import React from 'react';
import PropTypes from 'prop-types';


const ItemInput = () => {
	function handleSubmit(e) {
		e.preventDefault();
	};

  return (
  <div>
	<form onSubmit={handleSubmit}>
		<input id="itemInput"/>
		<button type='submit'>Submit</button>
	</form>
  </div>
)};


ItemInput.propTypes = {};

ItemInput.defaultProps = {};

export default ItemInput;
