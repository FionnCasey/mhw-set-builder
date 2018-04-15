import React, { Component } from 'react';
import { Label, FormControl, Glyphicon } from 'react-bootstrap';

import { BtnGlyph } from '../utils/customStyles.js';
import AutoComplete from './AutoComplete.js';
import { db, getSkillByName } from '../store/db.js';

export default class SkillFilter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query: '',
			inputActive: false
		};
	}

	activateInput = () => {
		this.setState({ inputActive: true });
	};

	onNameChange = (e) => {
		this.setState({ query: e.target.value });
	};

	onNameSelect = (value) => {
		this.props.addFilter(getSkillByName(value));
		this.setState({ inputActive: false, query: '' });
	};

	removeFilter = id => {
		this.props.removeFilter(id);
	};

	render() {
		const filters = this.props.filters.map((r, i) => {
			return (
				<Label key={i} style={{ display: 'inline-block', cursor: 'pointer' }}
					bsStyle="info"
					onClick={() => this.removeFilter(r.id)}
				>
					{r.name}
					<Glyphicon glyph="minus" style={{ marginLeft: 3 }}/>
				</Label>
			);
		});

		const input = this.state.inputActive ?
				<AutoComplete
					query={this.state.query}
					type="skill"
					label=""
					list={db.skills}
					handleChange={this.onNameChange}
					handleSelect={this.onNameSelect}
				/>
			: null;

		return (
			<div>
				<h4>Skill Filters</h4>
				<ul style={{ display: 'inline-block' }}>
					{filters.length > 0 ? filters : 'None'}
					<li style={{ display: 'inline-block' }}>{input}</li>
					<li style={{ display: 'inline-block' }}>{BtnGlyph('plus', this.activateInput)}</li>
				</ul>
			</div>
		);
	}
}
