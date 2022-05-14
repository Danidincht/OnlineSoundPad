import React from 'react';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';


function ItemList(props) {
	function renderList() {
		return props.itemList.map((item, index) => <li key={index}>{item}</li>);
	}

	return (
	<div>
		<ul>
			{renderList()}
		</ul>
	</div>
)};

ItemList.propTypes = {};
ItemList.defaultProps = {};

export default ItemList;