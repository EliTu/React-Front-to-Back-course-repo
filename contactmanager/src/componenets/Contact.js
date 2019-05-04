import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Contact extends Component {
	state = {
		isContactOpen: false,
	};

	handleClick = () => {
		this.setState({
			isContactOpen: !this.state.isContactOpen,
		});
	};

	render() {
		const { name, email, phone } = this.props.contact;
		const { isContactOpen } = this.state;

		return (
			<div className="card card-body mb-3">
				<h4>
					{name}{' '}
					<i
						onClick={this.handleClick}
						className="fas fa-sort-down"
					/>
				</h4>{' '}
				{isContactOpen && (
					<ul className="list-group">
						<li className="list-group-item">{email}</li>
						<li className="list-group-item">{phone}</li>
					</ul>
				)}
			</div>
		);
	}
}

Contact.propTypes = {
	contact: PropTypes.object.isRequired,
};

export default Contact;
