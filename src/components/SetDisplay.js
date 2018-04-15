import React, { Component } from 'react';
import { ListGroup, Glyphicon, Image, FormControl } from 'react-bootstrap';

import { WeaponDisplay, ArmourDisplay } from './EquipmentDisplay.js';
import { getWeaponIcon } from '../utils/imagePaths.js';

export default class SetDisplay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editName: false,
			nameValue: ''
		};
	}

	componentWillReceiveProps() {
		this.setState({ editName: false });
	}

	openNameInput = () => {
		this.setState({ editName: true, nameValue: this.props.set.name });
	};

	handleChange = e => {
		this.setState({ nameValue: e.target.value });
	};

	handleSubmit = e => {
		if (e) e.preventDefault();
		this.props.editName(this.state.nameValue);
		this.setState({ editName: false, nameValue: '' });
	};

	render() {
		if (!this.props.set) return null;

		const { weapon, head, chest, gloves, waist, legs, charm } = this.props.set.equipment;
		const { setActiveIndex, editEquip, set } = this.props;

		const nameText = this.state.editName ?
			<form onSubmit={this.handleSubmit} className="input-container">
				<FormControl
				className="textinput-basic"
					type="text"
					value={this.state.nameValue}
					placeholder="Enter name."
					onChange={this.handleChange}
				/>
			</form>
			: set.name;

		const editBtn = this.state.editName ? this.handleSubmit : this.openNameInput;

		const weaponIcon = weapon ? getWeaponIcon(weapon.type) : getWeaponIcon('greatsword');

		return(
			<ListGroup style={{ border: '1px solid #243743', borderRadius: 5, marginTop: 0 }}>
				<div style={{ background: '#243743', color: 'white', padding: '5px 5px 5px 10px' }}>
					<Image
						src={weaponIcon}
						className="icon-sm"
						style={{ margin: '-5px 10px 0px 0px', padding: 0 }}
					/>
					{nameText}
					<Glyphicon glyph="trash" onClick={() => console.log('delete set')} className="glyph-dark icon-right" style={{ marginRight: 2 }}/>
					<Glyphicon glyph="remove" onClick={() => setActiveIndex(-1)} className="glyph-dark icon-right"/>
					<Glyphicon glyph="pencil" onClick={() => editBtn()} className="glyph-dark icon-right"/>
				</div>

				<WeaponDisplay weapon={weapon} edit={() => editEquip('weapon')} />
				<ArmourDisplay armour={head} edit={() => editEquip('head')} type="head" />
				<ArmourDisplay armour={chest} edit={() => editEquip('chest')} type="chest" />
				<ArmourDisplay armour={gloves} edit={() => editEquip('gloves')} type="gloves" />
				<ArmourDisplay armour={waist} edit={() => editEquip('waist')} type="waist" />
				<ArmourDisplay armour={legs} edit={() => editEquip('legs')} type="legs" />
				<ArmourDisplay armour={charm} edit={() => editEquip('charm')} type="charm" />
			</ListGroup>
		);
	}
};
