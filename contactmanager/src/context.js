import React, { Component } from 'react';

const Context = React.createContext();

const reducer = (state, action) => {
	switch (action.type) {
		case 'DELETE_CONTACT':
			return {
				...state,
				contacts: state.contacts.filter(
					contact => contact.id !== action.payload
				),
			};
		default:
			return state;
	}
};

export class Provider extends Component {
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

		dispatch: action => this.setState(state => reducer(state, action)),
	};

	render() {
		return (
			<Context.Provider value={this.state}>
				{this.props.children}
			</Context.Provider>
		);
	}
}

export const Consumer = Context.Consumer;
