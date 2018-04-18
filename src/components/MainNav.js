import React, { Component } from 'react';
import { Navbar, NavItem, Nav, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Login from './Login.js';

export default class MainNav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loginOpen: false
		};
	}

	openLogin = () => {
		this.setState({ loginOpen: true });
	}

	render() {
		const { user, logout, login } = this.props;
		let closeLogin = () => this.setState({ loginOpen: false });

		return(
			<Navbar staticTop collapseOnSelect className="bg-dark" style={{ height: '100%' }}>
				<Navbar.Header>
					<Navbar.Brand>
						<Image src="/icons/logo.png" responsive className="icon-md"
							style={{ marginTop: 9, marginLeft: 10, marginRight: 10, padding: 0 }}
						/>
					</Navbar.Brand>
					<Navbar.Text style={{ color: '#E7E7E7', display: 'inline-block' }}>MHW Fashionista</Navbar.Text>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav pullRight className="nav-links">
						<LinkContainer to="/generate">
							<NavItem>Generate</NavItem>
						</LinkContainer>
						<LinkContainer to="/collection">
							<NavItem>Collection</NavItem>
						</LinkContainer>
						{
							user.loggedIn ?
								<NavItem onClick={() => logout()}>
									Logout
								</NavItem> :
								<NavItem onClick={() => this.openLogin()}>Login</NavItem>
						}
					</Nav>
				</Navbar.Collapse>
				<Login
					show={this.state.loginOpen}
					onHide={closeLogin}
					login={login}
					user={user}
				/>
			</Navbar>
		);
	}
}
