import React, { Component } from 'react';
import { Image, ListGroup, ListGroupItem, Glyphicon } from 'react-bootstrap';

import { getArmourIcon, getWeaponIcon } from '../utils/imagePaths.js';
import { rarityColours } from '../utils/colours.js';
import { SkillLevels, SharpnessBar } from './Indicators.js';
import { parseSkills, titleCase } from '../utils/parser.js';
import SearchPanel from './Search.js';

const EquipmentCard = ({ equip, type, skillDB, onClick }) => {
	const name = equip.name.replace('Alpha', '\u03B1').replace('Beta', '\u03B2');
	const t = type === 'charm' ? 'charm' : equip.type;

	const skills = parseSkills(equip).map((x, i) => {
		const maxLvl = skillDB ? skillDB.find(y => y.id === x.id).ranks.length : x.level;
		return <SkillLevels key={i} name={titleCase(x.name)} lvl={x.level} maxLvl={maxLvl}/>;
	});
	const bgColour = rarityColours[equip.rarity];

	return (
		<ListGroupItem style={{ paddingBottom: 5 }} onClick={() => onClick(type)}>
			<div className="icon-border-md" style={{ background: bgColour }}>
				<Image src={getArmourIcon(t)} className="icon-md" />
			</div>
			<div style={{ display: 'inline-block', paddingLeft: 15, paddingTop: 10 }}>
				<p className="bold">{name}</p>
			</div>
			<div style={{ display: 'inline-block', float: 'right', marginTop: 5 }}>
				<ul>{skills}</ul>
			</div>
		</ListGroupItem>
	);
};

const WeaponCard = ({ weapon }) => {
	const name = weapon.name.replace('1', 'I')
		.replace('2', 'II')
		.replace('3', 'III')

	return (
		<ListGroupItem style={{ paddingBottom: 5 }} onClick={() => console.log('click')}>
			<div className="icon-border-md" style={{ background: rarityColours[weapon.rarity - 1] }}>
				<Image src={getWeaponIcon(weapon.type)} className="icon-md" />
			</div>
			<div style={{ display: 'inline-block', paddingLeft: 15, paddingTop: 10 }}>
				<h4>{name}</h4>
			</div>
			<div style={{ display: 'inline-block', float: 'right', marginTop: -10 }}>
				<SharpnessBar weapon={weapon} />
			</div>
		</ListGroupItem>
	);
};

const EquipmentPlaceholder = ({ type, onClick }) => (
	<ListGroupItem onClick={() => onClick(type)}>
		<div className="icon-border-md">
			<Image src={getArmourIcon(type)} className="icon-md" />
		</div>
		<p style={{ display: 'inline-block' }}>Click to add equipment.</p>
	</ListGroupItem>
);

const WeaponPlaceholder = ({ onClick }) => (
	<ListGroupItem onClick={() => onClick}>
		<div className="icon-border-md">
			<Image src={getWeaponIcon('greatsword')} className="icon-md" />
		</div>
		<p style={{ display: 'inline-block' }}>Click to add weapon.</p>
	</ListGroupItem>
);

class SetCard extends Component {
	constructor() {
		super();
		this.state = {
			showSearch: false,
			searchType: ''
		};
	}

	editEquip = type => {
		this.setState({ showSearch: true, searchType: type });
	};

	hideSearch = () => {
		this.setState({ showSearch: false });
	};

	render() {
		const { set, editEquip, skillDB, editName, setActiveIndex } = this.props;

		if (!set) return null;

		return(
			<ListGroup style={{ border: '1px solid #243743', borderRadius: 5, marginTop: 10 }}>
				{
					this.state.showSearch ?
						<SearchPanel
							type={this.state.searchType}
							onHide={this.hideSearch}
							skillDB={skillDB}
						/>
						: null
				}
				<div style={{ background: '#243743', color: 'white', padding: '5px 5px 5px 10px' }}>
					{
						set.equipment.weapon ?
							<Image
								src={getWeaponIcon(set.equipment.weapon.type)}
								className="icon-sm"
								style={{ margin: '-5px 10px 0px 0px', padding: 0 }} />
							:
							<Image
								src={getWeaponIcon('greatsword')}
								className="icon-sm"
								style={{ margin: '-5px 10px 0px 0px', padding: 0 }} />
					}
					{set.name}
					<Glyphicon glyph="trash" onClick={editName} className="glyph-dark icon-right" style={{ marginRight: 2 }}/>
					<Glyphicon glyph="remove" onClick={() => setActiveIndex(-1)} className="glyph-dark icon-right"/>
					<Glyphicon glyph="pencil" onClick={editName} className="glyph-dark icon-right"/>
				</div>

				{set.equipment.weapon ? <WeaponCard weapon={set.equipment.weapon} onClick={editEquip}/>
				: <WeaponPlaceholder Click={editEquip} />}

				{set.equipment.head ? <EquipmentCard equip={set.equipment.head} skillDB={skillDB} onClick={editEquip}/>
				: <EquipmentPlaceholder type="head" onClick={editEquip} />}

				{set.equipment.chest ? <EquipmentCard equip={set.equipment.chest} skillDB={skillDB} onClick={editEquip}/>
				: <EquipmentPlaceholder type="chest" onClick={editEquip} />}

				{set.equipment.gloves ? <EquipmentCard equip={set.equipment.gloves} skillDB={skillDB} onClick={editEquip}/>
				: <EquipmentPlaceholder type="gloves" onClick={editEquip} />}

				{set.equipment.waist ? <EquipmentCard equip={set.equipment.waist} skillDB={skillDB} onClick={editEquip}/>
				: <EquipmentPlaceholder type="waist" onClick={editEquip} />}

				{set.equipment.legs ? <EquipmentCard equip={set.equipment.legs} skillDB={skillDB} onClick={editEquip}/>
				: <EquipmentPlaceholder type="legs" onClick={editEquip} />}

				{set.equipment.charm ? <EquipmentCard type="charm" equip={set.equipment.charm} skillDB={skillDB} onClick={editEquip}/>
				: <EquipmentPlaceholder type="charm" onClick={editEquip} />}
			</ListGroup>
		);
	}
}

const SetPreview = ({ set, index, activeIndex, setActiveIndex, deleteSet, setHoverIndex }) => {
	const className = index === activeIndex ? 'hover-hl selected' : 'hover-hl';

	return (

		<ListGroupItem
			style={{ padding: 0, minHeight: 35 }}
			className={className}
		>
			<div style={{ borderRadius: 5, padding: 7}}>
				{
					set.equipment.weapon ?
						<Image
							src={getWeaponIcon(set.equipment.weapon.type)}
							className="icon-sm"
							style={{ margin: '-5px 10px 0px 0px', padding: 0 }} />
						:
						<Image
							src={getWeaponIcon('greatsword')}
							className="icon-sm"
							style={{ margin: '-5px 10px 0px 0px', padding: 0 }} />
				}
				{set.name}
				<Glyphicon glyph="trash"
					onClick={() => deleteSet(index)}
					className="glyph-light icon-right"
					style={{ marginRight: 2 }}
				/>
				<Glyphicon glyph="wrench"
					onClick={() => setActiveIndex(index)}
					className="glyph-light icon-right"
				/>
			</div>
		</ListGroupItem>

	);
};

export { SetCard, SetPreview, EquipmentCard };
