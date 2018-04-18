import React, { Component } from 'react';
import { Modal, Button, ButtonGroup, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';

import { userDb } from '../store/dummyDB.js';
import CustomSet from '../store/sets.js';

export default class Login extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			username: '',
			password: '',
			message: ''
		}
	}

	componentWillReceiveProps() {
		this.setState({ username: '', password: '', message: '' });
	}

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	};

	login = () => {
		let message;
		userDb.forEach((u, i) => {
			if (u.name === this.state.username) {
				if (u.password === this.state.password) {
					let sets = [];
					u.sets.forEach(s => {
						sets.push(CustomSet.createSetFromIds(s));
					});
					this.props.login({
						id: '',
						name: u.name,
						sets: sets,
						loggedIn: true
					});
					message = 'Login successful.';
					this.props.onHide();
				}
				message = 'Invalid password.';
			}
			message = 'Invalid username.';
		});
		this.setState({ message });
	};

	register = () => {
		const user = {
			name: this.state.username,
			password: this.state.password,
			sets: this.props.user.sets,
			loggedIn: true
		};
		userDb.push(user);
		this.props.login(user);
		this.setState({ message: 'Account created.' });
		this.props.onHide();
	};

	render() {
		const { username, password, message } = this.state;

		return(
			<Modal
		        {...this.props}
		        bsSize="small"
      		>
        		<Modal.Header closeButton>
          			<Modal.Title>Login or Create an Account</Modal.Title>
        		</Modal.Header>
        		<Modal.Body>
				<form onSubmit={this.login}><FormGroup>
					<ControlLabel>Username</ControlLabel>
				    <FormControl
						type="text"
						name="username"
						value={username}
						onChange={this.handleChange}
				    />
					<ControlLabel>Password</ControlLabel>
					<FormControl
						type="password"
						name="password"
						value={password}
						onChange={this.handleChange}
				    />
					<HelpBlock>{message}</HelpBlock>
					<ButtonGroup style={{ paddingLeft: 35 }}>
						<Button className="login" onClick={this.login}>Login</Button>
						<Button className="register" onClick={this.register}>Register</Button>
					</ButtonGroup>
				</FormGroup></form>
        		</Modal.Body>
      		</Modal>
		);
	}
}
