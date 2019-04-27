import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Contact from './componenets/Contact';
import Header from './componenets/Header';

function App() {
	return (
		<div className="App">
			<Header branding="Contact Manager" />
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
	);
}

export default App;
