import React, { Component } from 'react';
import { FormGroup, HelpBlock, Button, Modal, ControlLabel, Col, Row, Image } from 'react-bootstrap';
import Autocomplete from 'react-autocomplete';

import { titleCase } from '../utils/parser.js';
import { EquipmentCard, WeaponCard } from './SetCards.js';
import { getArmourIcon, getWeaponIcon } from '../utils/imagePaths.js';

export default class SearchPanel extends Component {
	constructor() {
		super();
		this.state = {
			message: '',
			nameFilter: '',
			skillFilters: [],
			results: []
		};
	}

	componentWillReceiveProps() {
		this.setState({ nameFilter: '', message: '', results: [] });
	}

	componentWillMount() {
		this.setState({ message: 'Loading...' });
	}

	search = () => {
		this.setState({ results: [], message: 'Searching...' });
		fetch(`https://mhw-db.com/armor?q={"name":{"$like":"${this.state.nameFilter}%"},"type":"${this.props.type}","rank":"high"}`)
		.then(res => {
			if (res.ok) return res.json();
			throw new Error('Request failed.');
		})
		.then(results => {
			const message = results.length === 1 ? `1 match found.` : `${results.length} matches found.`;
			this.setState({ results, message });
		})
		.catch(err => {
			console.log(err);
		});
	};

	onNameChange = (e) => {
		this.setState({ nameFilter: e.target.value });
	};

	onNameSelect = (value) => {
		this.setState({ nameFilter: value });
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.search();
	};

	render() {
		const { nameFilter, skillFilters, results } = this.state;

		const resultsView = results.map((r, i) => {
			return <EquipmentCard key={i} armour={r} placeholder={false}/>
		});

		return (
			<Modal
				{...this.props}
				bsSize="large"
				dialogClassName="search-modal"
			>
				<Modal.Header closeButton>
					<div className="icon-border-md" style={{ background: 'orange' }}>
						<Image src={getArmourIcon(this.props.type)} className="icon-md" />
					</div>
					<Modal.Title id="contained-modal-title-lg">Equipment Finder : {titleCase(this.props.type)}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form>
						<FormGroup controlId="searchPanel" className="search-panel">
							<Row>
								<Col xs={6} md={4}>
									<NameFilter
										query={nameFilter}
										type={this.props.type}
										handleChange={this.onNameChange}
										handleSelect={this.onNameSelect}
									/>
								</Col>
								<Col xs={6} md={4}>

									Attack Boost, Artillery
								</Col>

								<Col xs={6} md={4}>

								</Col>
							</Row>

							<Row>
								<Col xs={12} md={12} className="center-button">
									<Button className="btn-go" type="submit" onClick={this.handleSubmit}>Search</Button>
									<HelpBlock>{this.state.message}</HelpBlock>
								</Col>
							</Row>
						</FormGroup>
						<div className="scroll-view">
							{resultsView}
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<Button onClick={this.props.onHide}>Close</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

class SkillFilter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			autocomplete: []
		}
	}

	componentWillMount() {
		fetch(`https://mhw-db.com/skills`)
		.then(res => {
			if (res.ok) return res.json();
			throw new Error('Request failed.');
		})
		.then(results => {
			let autocomplete = [];
			results.forEach(x => {
				const levels = x.ranks.length;
				let ids = [];
				for (let i = 0; i < levels; i++) {
					ids[i] = x.ranks[i].id;
				}
				autocomplete.push({ name: x.name, skillIds: ids });
			});
			this.setState({ autocomplete });
		})
		.catch(err => {
			console.log(err);
		});
	}
}

class NameFilter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			autocomplete: []
		}
	}

	componentWillMount() {
		fetch(`https://mhw-db.com/armor`)
		.then(res => {
			if (res.ok) return res.json();
			throw new Error('Request failed.');
		})
		.then(results => {
			let autocomplete = [];
			results.forEach(r => {
				autocomplete.push({ name: r.name, type: r.type, id: r.id });
			});
			this.setState({ autocomplete });
		})
		.catch(err => {
			console.log(err);
		});
	}

	handleChange = e => {
		this.props.handleChange(e);
	}

	handleSelect = val => {
		this.props.handleSelect(val);
	}

	render() {
		const { autocomplete } = this.state;
		const { query, type } = this.props;

		return(
			<div>
				<ControlLabel className="filter-label">Name</ControlLabel>
				<Autocomplete
					inputProps={{ className: 'form-control text-input' }}
					wrapperStyle={{ position: 'relative', display: 'inline-block' }}
					value={query}
					getItemValue={(item) => item.name}
					items={autocomplete}
					shouldItemRender={(item, value) => (
						query.length > 1
						&& item.type === type
						&& item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
					)}
					renderItem={(item, isHighlighted) => (
						<div key={item.id}
							className="autocomplete-item"
							style={{ background: isHighlighted ? 'lightgray' : '#F4F4F4' }}
						>
							{item.name}
						</div>
					)}
					renderMenu={children => (
						<div className="autocomplete">
							{children}
						</div>
					)}
					onChange={this.handleChange}
					onSelect={this.handleSelect}
				/>
			</div>
		);
	}
}
