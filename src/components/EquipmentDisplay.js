import React from 'react';
import { ListGroupItem, Image } from 'react-bootstrap';

import { getArmourIcon, getWeaponIcon } from '../utils/imagePaths.js';
import { rarityColours } from '../utils/colours.js';
import { SkillLevels, SharpnessBar } from './Indicators.js';
import { parseSkills, titleCase } from '../utils/parser.js';
import { db } from '../store/db.js';

const WeaponDisplay = ({ weapon, edit }) => {

	if (weapon) {
		const name = weapon.name.replace('1', 'I')
			.replace('2', 'II')
			.replace('3', 'III');

		const affinity = weapon.attributes.affinity ? weapon.attributes.affinity : 0;
		const element = weapon.attributes.elementDamage ? weapon.attributes.elementDamage : 'None';

		return (
			<ListGroupItem
				style={{ paddingBottom: 5 }}
				onClick={() => edit('weapon', weapon)}
			>
				<div className="icon-border-md"
					style={{
						background: rarityColours[weapon.rarity - 1],
						marginLeft: -5,
						marginTop: -5
					}}>
					<Image src={getWeaponIcon(weapon.type)} className="icon-md" />
				</div>
				<div style={{ display: 'inline-block', paddingLeft: 15, paddingTop: 15, float: 'left', width: 200 }}>
					<h4>{name}</h4>
				</div>
				<ul style={{ display: 'inline-block', fontSize: 12 }}>
					<li>Attack: {weapon.attributes.attack}</li>
					<li>Element: {element}</li>
					<li>Affinity: {affinity}%</li>
				</ul>
				<div style={{ display: 'inline-block', float: 'right', marginTop: -10 }}>
					<SharpnessBar weapon={weapon} />
				</div>
			</ListGroupItem>
		);
	}
	else {
		return (
			<ListGroupItem onClick={() => edit('weapon')}>
				<div className="icon-border-md"
					style={{
						marginLeft: -5,
						marginTop: -5
					}}>
					<Image src={getWeaponIcon('greatsword')} className="icon-md" />
				</div>
				<p style={{
					display: 'inline-block',
					float: 'right',
					marginRight: '36%'
				}}>
					Click to add weapon.
				</p>
			</ListGroupItem>
		);
	}
};

const ArmourDisplay = ({ armour, type, edit }) => {
	if (armour) {
		const name = armour.name.replace('Alpha', '\u03B1').replace('Beta', '\u03B2');

		const skills = parseSkills(armour).map((x, i) => {
			const maxLvl = db.skills ? db.skills.find(y => y.id === x.id).ranks.length : x.level;
			return <SkillLevels key={i} name={titleCase(x.name)} lvl={x.level} maxLvl={maxLvl}/>;
		});

		const bgColour = rarityColours[armour.rarity];

		return (
			<ListGroupItem style={{ paddingBottom: 5 }} onClick={() => edit(type, armour)}>
				<div className="icon-border-md" style={{ background: bgColour, marginLeft: -5, marginTop: -5 }}>
					<Image src={getArmourIcon(type)} className="icon-md" />
				</div>
				<div style={{ display: 'inline-block', paddingLeft: 15, paddingTop: 10 }}>
					<p className="bold">{name}</p>
				</div>
				<div style={{ display: 'inline-block', float: 'right', marginTop: 5 }}>
					<ul>{skills}</ul>
				</div>
			</ListGroupItem>
		);
	}
	else {
		return (
			<ListGroupItem style={{ paddingBottom: 5 }} onClick={() => edit(type)}>
				<div className="icon-border-md" style={{ marginLeft: -5, marginTop: -5 }}>
					<Image src={getArmourIcon(type)} className="icon-md" />
				</div>
				<p style={{
					display: 'inline-block',
					float: 'right',
					marginRight: '33%'
				}}>
					Click to add equipment.
				</p>
			</ListGroupItem>
		);
	}
};

export { WeaponDisplay, ArmourDisplay };
