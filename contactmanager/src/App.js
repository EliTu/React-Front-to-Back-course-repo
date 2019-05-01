// React imports:
import React from 'react';
import Contacts from './componenets/Contacts';
import Header from './componenets/Header';
// Style imports:
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
	return (
		<div className="App">
			<Header branding="Contact Manager" />
			<div className="container">
				<Contacts />
			</div>
		</div>
	);
}

export default App;
