import './App.css';
import ItemInput from './components/ItemInput/ItemInput';
import ItemList from './components/ItemList/ItemList';
import { useState } from 'react';

function App() {
	var [itemList, setItemList] = useState([]);
	function handleSubmit(itemValue) {
		itemList.push(itemValue);
		setItemList([...itemList]);
	}

	return (
	<div className="App">
		<ItemInput handleSubmit={handleSubmit}></ItemInput>
		<ItemList itemList={itemList}></ItemList>
	</div>
	);
}

export default App;
