import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Contact extends Component {
	state = {};

	handleClick = id => {
		console.log(id);
	};

	render() {
		const { name, email, phone } = this.props.contact;
		return (
			<div className="card card-body mb-3">
				<h4>
					{name}{' '}
					<i
						onClick={this.handleClick}
						className="fas fa-sort-down"
					/>
				</h4>
				<ul className="list-group">
					<li className="list-group-item">{email}</li>
					<li className="list-group-item">{phone}</li>
				</ul>
			</div>
		);
	}
}

Contact.propTypes = {
	contact: PropTypes.object.isRequired,
};

export default Contact;
