import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../context';

class Contact extends Component {
	state = {
		isContactOpen: false,
	};

	handleOpenClick = () => {
		this.setState({
			isContactOpen: !this.state.isContactOpen,
		});
	};

	handleDeleteClick = (id, dispatch) => {
		dispatch({
			type: 'DELETE_CONTACT',
			payload: id,
		});
	};

	render() {
		const {
			contact: { name, email, phone, id },
		} = this.props;
		const { isContactOpen } = this.state;

		return (
			<Consumer>
				{value => {
					const { dispatch } = value;
					return (
						<div className="card card-body mb-3">
							<h4>
								{name}{' '}
								<i
									onClick={this.handleOpenClick}
									className="fas fa-sort-down"
									style={{
										cursor: 'pointer',
										marginLeft: '0.5rem',
									}}
								/>
								<i
									className="fas fa-times"
									style={{
										cursor: 'pointer',
										float: 'right',
										color: 'tomato',
									}}
									onClick={() =>
										this.handleDeleteClick(id, dispatch)
									}
								/>
							</h4>{' '}
							{isContactOpen && (
								<ul className="list-group">
									<li className="list-group-item">
										Email: {email}
									</li>
									<li className="list-group-item">
										Phone: {phone}
									</li>
								</ul>
							)}
						</div>
					);
				}}
			</Consumer>
		);
	}
}

Contact.propTypes = {
	contact: PropTypes.object.isRequired,
};

export default Contact;
