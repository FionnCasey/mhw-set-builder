import React, { Component } from 'react';
import { FormGroup, HelpBlock, Modal, Col, Row, Image } from 'react-bootstrap';

import { titleCase } from '../utils/parser.js';
import { ArmourDisplay, WeaponDisplay } from './EquipmentDisplay.js';
import { getArmourIcon, getWeaponIcon } from '../utils/imagePaths.js';
import { getDbCategory } from '../store/db.js';
import AutoComplete from './AutoComplete.js'
import { filterListByName } from '../utils/searchFilter.js';
import { BtnPrimary, BtnSecondary } from '../utils/customStyles.js';
import SkillFilter from './SkillFilters.js';
import { WeaponDropdown } from './WeaponDropdown.js';

export default class SearchPanel extends Component {
	constructor() {
		super();
		this.state = {
			message: '',
			nameFilter: '',
			skillFilters: [],
			weaponCategory: 'all',
			results: [],
			maxResults: 50
		};
	}

	componentWillReceiveProps() {
		this.setState({ nameFilter: '', message: '', results: [], skillFilters: [] });
	}

	onNameChange = (e) => {
		this.setState({ nameFilter: e.target.value });
	};

	onNameSelect = (value) => {
		this.setState({ nameFilter: value });
	};

	addFilter = skill => {
		let { skillFilters } = this.state;
		skillFilters.push(skill);
		this.setState({ skillFilters });
	}

	handleSubmit = () => {
		const type = this.props.type === 'weapon' || this.props.type === 'charm' ? '' : this.props.type;
		const results = filterListByName(getDbCategory(this.props.type), this.state.nameFilter, type);

		let filteredResults = results.slice(0, this.state.maxResults);
		let matches = results.length;

		if (this.props.type !== 'weapon' && this.state.skillFilters.length > 0) {
			filteredResults = results.filter(r => {
				let match = false;
				this.state.skillFilters.forEach(f => {
					if (r.skills.find(s => s.skill === f.id)) match = true;
				})
				return match;
			});
			matches = filteredResults.length;
			filteredResults.slice(0, this.state.maxResults);
		}
		else if (this.props.type === 'weapon' && this.state.weaponCategory !== 'all') {
			filteredResults = results.filter(r => r.type === this.state.weaponCategory);
			matches = filteredResults.length;
			filteredResults.slice(0, this.state.maxResults);
		}

		const message = matches > this.state.maxResults ?
			`Showing ${this.state.maxResults} of ${matches} matches found.` : `${matches} matches found.`;

		this.setState({ results: filteredResults, message });
	};

	selectWeaponType = type => {
		this.setState({ weaponCategory: type });
	};

	startSearch = e => {
		e.preventDefault();
		this.setState({ message: 'Searching...' });
	};

	changeEquipment = (type, equip) => {
		this.props.activeset.changeEquipment(type, equip);
		this.props.onHide();
	};

	removeFilter = id => {
		let skillFilters = this.state.skillFilters.filter(f => f.id !== id);
		this.setState({ skillFilters });
	};

	render() {
		const { message, nameFilter, skillFilters } = this.state;
		const { type } = this.props;
		const list = getDbCategory(type);

		const results = this.state.results.map((r, i) => {
			if (!r.attributes) return <ArmourDisplay key={i} armour={r} type={type} edit={this.changeEquipment} />;

			const element = r.attributes.attack ?
							<WeaponDisplay key={i} weapon={r} edit={this.changeEquipment} /> :
							<ArmourDisplay key={i} armour={r} type={r.type} edit={this.changeEquipment} />;
			return element;
		});

		return (
			<Modal
				{...this.props}
				dialogClassName="search-modal"
			>
				<Modal.Header closeButton>
					<div className="icon-border-md" style={{ background: '#f44f5a' }}>
						{
							type === 'weapon' ?
								<Image src={getWeaponIcon('greatsword')} className="icon-md" /> :
								<Image src={getArmourIcon(type)} className="icon-md" />
						}
					</div>
					<Modal.Title className="search-title" id="contained-modal-title-lg">Equipment Finder : {titleCase(type)}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form onSubmit={(e) => {this.startSearch(e); this.handleSubmit()}}>
						<FormGroup controlId="searchPanel" className="search-panel">
							<Row>
								<Col xs={6} md={4}>
									<AutoComplete
										query={nameFilter}
										type={type}
										list={list}
										handleChange={this.onNameChange}
										handleSelect={this.onNameSelect}
									/>
								</Col>
								<Col xs={6} md={4}>
									{
										type === 'weapon' ?
											<WeaponDropdown
												select={this.selectWeaponType}
												current={this.state.weaponCategory}
											/>
											:
											<SkillFilter
												filters={skillFilters}
												addFilter={this.addFilter}
												removeFilter={this.removeFilter}
											/>
									}
								</Col>

								<Col xs={6} md={4} style={{ paddingTop: 22 }}>
									{BtnSecondary('Search', this.handleSubmit, 'small')}
								</Col>
							</Row>

							<Row style={{ marginTop: 5, marginBottom: -10 }}>
								<Col xs={12} md={12}>
									<HelpBlock>{message}</HelpBlock>
								</Col>
							</Row>
						</FormGroup>
						<div>
							{results}
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					{BtnPrimary('Close', this.props.onHide, 'small')}
				</Modal.Footer>
			</Modal>
		);
	}
}
