// React imports:
import React from 'react';
import Contact from './componenets/Contact';
import Header from './componenets/Header';
// Style imports:
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
	return (
		<div className="App">
			<Header branding="Contact Manager" />
			<div className="container">
				<Contact
					name="Aegon Targeryan"
					email="jonsnow@gmail.com"
					phone="123-456-321"
				/>
				<Contact
					name="Arya Stark"
					email="aryas@gmail.com"
					phone="123-456-789"
				/>
			</div>
		</div>
	);
}

export default App;
