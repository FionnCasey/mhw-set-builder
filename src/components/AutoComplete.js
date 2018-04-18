import React, { Component } from 'react';
import Autocomplete from 'react-autocomplete';
import { ControlLabel } from 'react-bootstrap';
import { parseArmourName } from '../utils/parser.js';

export default class AutoComplete extends Component {
	handleChange = e => {
		this.props.handleChange(e);
	}

	handleSelect = val => {
		this.props.handleSelect(val);
	}

	render() {
		const { query, type, list, label = 'Name' } = this.props;

		return(
			<div>
				<ControlLabel className="filter-label">{label}</ControlLabel>
				<Autocomplete
					inputProps={{ className: 'form-control text-input' }}
					wrapperStyle={{ position: 'relative', display: 'inline-block' }}
					value={query}
					getItemValue={(item) => item.name}
					items={list}
					shouldItemRender={(item, value) => {
						if (type !== 'skill') {
							return(
								query.length > 1
								&& (item.type === type || type === 'weapon' || type === 'charm')
								&& item.name.toLowerCase().indexOf(value.toLowerCase()) > -1
							);
						}
						else {
							return query.length > 1 && item.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
						}
					}}
					renderItem={(item, isHighlighted) => (
						<div key={item.id}
							className="autocomplete-item"
							style={{ background: isHighlighted ? '#E7E7E7' : 'white' }}
						>
							{parseArmourName(item.name)}
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
