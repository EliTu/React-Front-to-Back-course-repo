import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Contact extends Component {
	state = {
		isContactOpen: false,
	};

	handleOpenClick = () => {
		this.setState({
			isContactOpen: !this.state.isContactOpen,
		});
	};

	// handleDeleteClick = () => {
	// 	this.props.handleDeleteClick();
	// };

	render() {
		const {
			contact: { name, email, phone },
			handleDeleteClick,
		} = this.props;
		const { isContactOpen } = this.state;

		return (
			<div className="card card-body mb-3">
				<h4>
					{name}{' '}
					<i
						onClick={this.handleOpenClick}
						className="fas fa-sort-down"
						style={{ cursor: 'pointer', marginLeft: '0.5rem' }}
					/>
					<i
						className="fas fa-times"
						style={{
							cursor: 'pointer',
							float: 'right',
							color: 'tomato',
						}}
						onClick={() => handleDeleteClick()}
					/>
				</h4>{' '}
				{isContactOpen && (
					<ul className="list-group">
						<li className="list-group-item">Email: {email}</li>
						<li className="list-group-item">Phone: {phone}</li>
					</ul>
				)}
			</div>
		);
	}
}

Contact.propTypes = {
	contact: PropTypes.object.isRequired,
	handleDeleteClick: PropTypes.func.isRequired,
};

export default Contact;
