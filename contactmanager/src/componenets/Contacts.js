import React, { Component } from 'react';
import Contact from './Contact';

export class Contacts extends Component {
	state = {
		contacts: [
			{
				id: 1,
				name: 'Nickolas Cage',
				email: 'nicksc@gmail.com',
				phone: '555-555-5555',
			},
			{
				id: 2,
				name: 'Danny DeVito',
				email: 'dand@gmail.com',
				phone: '555-222-5555',
			},
			{
				id: 3,
				name: 'William DeFoe',
				email: 'willied@gmail.com',
				phone: '555-555-3366',
			},
		],
	};

	render() {
		const { contacts } = this.state;

		return (
			<div>
				{contacts.map(contact => (
					<Contact key={contact.id} contact={contact} />
				))}
			</div>
		);
	}
}

export default Contacts;
