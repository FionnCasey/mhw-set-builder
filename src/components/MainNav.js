import React, { Component } from 'react';
import { Navbar, NavItem, Nav, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class MainNav extends Component {
	render() {
		return(
			<Navbar staticTop collapseOnSelect className="bg-dark">
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
						<LinkContainer to="/browse">
							<NavItem>Browse</NavItem>
						</LinkContainer>
						<LinkContainer to="/generate">
							<NavItem>Generate</NavItem>
						</LinkContainer>
						<LinkContainer to="/collection">
							<NavItem>Collection</NavItem>
						</LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}
