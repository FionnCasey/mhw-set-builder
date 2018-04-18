import React, { Component} from 'react';
import { Table, DropdownButton, MenuItem } from 'react-bootstrap';

import { BtnSecondary, BtnPrimary } from '../utils/customStyles.js';
import ReqTableRow from './ReqTableRow.js';
import { db, getSkillByName } from '../store/db.js';
import AutoComplete from './AutoComplete.js';

const container = {
	background: 'white',
	borderRadius: 5,
	padding: 0,
	border: '1px solid #243743',
	marginBottom: 20,
	overflow: 'visible'
};

const dropdownStyle = {
	padding: '0 5px 0 5px',
	margin: 0,
	borderRadius: 0
};

export default class Requirements extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'Click to select a skill.',
			lvl: 1,
			allowGreater: false,
			editing: false,
			maxLvl: 3
		};
	}

	addReq = () => {
		const req = getSkillByName(this.state.name);
		if (req) {
			req.allowGreater = this.state.allowGreater;
			req.lvl = this.state.lvl;
			this.props.addReq(req);
			this.setState({ name: 'Click to select a skill.'})
		}
		else {
			this.setState({ name: 'Skill not found.', editing: false });
		}
	};

	removeReq = i => {
		this.props.removeReq(i);
	};

	handleChange = (e) => {
		this.setState({ name: e.target.value });
	};

	handleSelect = (value) => {
		const skill = getSkillByName(value);
		this.setState({
			name: skill.name,
			maxLvl: skill.ranks.length,
			editing: false
		})
	};

	editOperator = e => {
		const allowGreater = e === 2;
		this.setState({ allowGreater });
	};

	editLvl = lvl => {
		this.setState({ lvl });
	};

	openEdit = () => {
		this.setState({ editing: true, name: '' });
	};

	render() {
		const { reqs, removeReq, generate } = this.props;
		const { name, lvl, allowGreater, editing, maxLvl } = this.state;

		let lvlDropdown = [];
		for (let j = 1; j <= maxLvl; j++) {
			lvlDropdown.push(<MenuItem key={j} onSelect={() => this.editLvl(j)} eventKey={j}>Level {j}</MenuItem>)
		}
		const operator = allowGreater ? 'greater or equal' : 'exactly equal';

		const input = editing ?
				<AutoComplete
					query={this.state.name}
					type="skill"
					label=""
					list={db.skills}
					handleChange={this.handleChange}
					handleSelect={this.handleSelect}
				/>
			: name;

		const list = reqs.map((r, i) => (
			<ReqTableRow
				key={r.uniqueId}
				name={r.name}
				lvl={r.lvl}
				allowGreater={r.allowGreater}
				index={i}
				removeReq={removeReq}
			/>
		));

		return(
			<div style={container}>
				<Table style={{ margin: 0 }}>
					<thead>
						<tr>
							<th style={{paddingBottom: 12}}><h4>Skill Requirements</h4></th>
							<th></th>
							<th></th>
							<th>{BtnPrimary('Generate Sets', generate, 'small')}</th>
						</tr>
					</thead>
					<tbody>
						<tr style={{ borderBottom: '2px solid lightgray'}}>
							<td style={{padding: '12px 0 0 10px'}} className="editable" onClick={() => this.openEdit()}>{input}</td>
							<td style={{padding: '10px 0 0 10px'}}>
								<DropdownButton style={dropdownStyle} title={operator} id="operator">
									<MenuItem onSelect={(e) => this.editOperator(e)} eventKey={1}>exactly equal to</MenuItem>
									<MenuItem onSelect={(e) => this.editOperator(e)} eventKey={2}>greater than or equal to</MenuItem>
								</DropdownButton>
							</td>
							<td style={{textAlign:'right', padding: '10px 0 0 10px'}}>
								<DropdownButton style={dropdownStyle} title={`Level ${lvl}`} id="levels">
									{lvlDropdown}
								</DropdownButton>
							</td>
							<td>{BtnSecondary('Add Skill', this.addReq, 'small')}</td>
						</tr>
						{ list.length > 0 ? list : <tr><td>None</td></tr> }
					</tbody>
				</Table>
			</div>
		);
	}
}
