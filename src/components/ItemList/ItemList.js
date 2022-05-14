import React from 'react';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';


function ItemList(props) {
	function renderList() {
		return props.itemList.map((item, index) => 
			<p key={index}>
				<button>{item}</button>
			</p>
		);
	}

	return (
	<div>
		{renderList()}
	</div>
)};

ItemList.propTypes = {};
ItemList.defaultProps = {};

export default ItemList;