// React imports:
import React from 'react';
import Contacts from './componenets/Contacts';
import Header from './componenets/Header';
import { Provider } from './context';
// Style imports:
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
	return (
		<Provider>
			<div className="App">
				<Header branding="Contact Manager" />
				<div className="container">
					<Contacts />
				</div>
			</div>
		</Provider>
	);
}

export default App;
