import React, { Component } from 'react';
import { ListGroup, Glyphicon, Image } from 'react-bootstrap';

import { WeaponDisplay, ArmourDisplay } from './EquipmentDisplay.js';
import { getWeaponIcon } from '../utils/imagePaths.js';

export default class SetDisplay extends Component {
	constructor(props) {
		super(props);
		this.state = {
			editName: false
		};
	}

	render() {
		if (!this.props.set) return null;
		
		const { weapon, head, chest, gloves, waist, legs, charm } = this.props.set.equipment;
		const { setActiveIndex, editEquip } = this.props;

		const weaponIcon = weapon ? getWeaponIcon(weapon.type) : getWeaponIcon('greatsword');

		return(
			<ListGroup style={{ border: '1px solid #243743', borderRadius: 5, marginTop: 0 }}>
				<div style={{ background: '#243743', color: 'white', padding: '5px 5px 5px 10px' }}>
					<Image
						src={weaponIcon}
						className="icon-sm"
						style={{ margin: '-5px 10px 0px 0px', padding: 0 }}
					/>
					{this.props.set.name}
					<Glyphicon glyph="trash" onClick={() => console.log('delete set')} className="glyph-dark icon-right" style={{ marginRight: 2 }}/>
					<Glyphicon glyph="remove" onClick={() => setActiveIndex(-1)} className="glyph-dark icon-right"/>
					<Glyphicon glyph="pencil" onClick={() => console.log('edit name')} className="glyph-dark icon-right"/>
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
