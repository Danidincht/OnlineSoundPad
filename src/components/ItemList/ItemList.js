import React from 'react';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';


function ItemList() {
	var list = ['a','b','c','d','e','f'];

	function renderList() {
		return list.map((item) => <li>{item}</li>);
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