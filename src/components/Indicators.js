import React from 'react';
import { Glyphicon } from 'react-bootstrap';

const SkillLevels = ({ name, lvl, maxLvl }) => {
	let icons = [];
	for (let i = 0; i < maxLvl; i++) {
		icons[i] = i < lvl ?
			<li key={i} className="inline-block">
				<Glyphicon glyph="stop" style={{ color: 'orange '}}/>
			</li> :
			<li key={i} className="inline-block">
				<Glyphicon glyph="stop" style={{ color: 'lightgray '}}/>
			</li>;
	}
	return (
		<div style={{ width: 280 }}>
			<div style={{ display: 'inline-block', float:'left', width: 135 }}>{name}</div>
			<ul style={{ display: 'inline-block' }}>
				{icons}
			</ul>
			<div style={{ float: 'right' }}>Level {lvl}</div>
		</div>
	);
};

const SharpnessBar = ({ weapon }) => {
	let total = 0;
	let red, orange, yellow, green, blue, white = null;
	const scale = 1.5;

	if (weapon.attributes.sharpnessRed) {
		total += weapon.attributes.sharpnessRed;
		red = <div className="sharp-left inline-block" style={{
			width: weapon.attributes.sharpnessRed * scale,
			background: '#f44f5a'
		}} />;
	}

	if (weapon.attributes.sharpnessOrange) {
		total += weapon.attributes.sharpnessOrange;
		orange = <div className="inline-block sharp" style={{
			width: weapon.attributes.sharpnessOrange * scale,
			background: 'orange'
		}} />;
	}

	if (weapon.attributes.sharpnessYellow) {
		total += weapon.attributes.sharpnessYellow;
		yellow = <div className="inline-block sharp" style={{
			width: weapon.attributes.sharpnessYellow * scale,
			background: 'yellow'
		}} />;
	}

	if (weapon.attributes.sharpnessGreen) {
		total += weapon.attributes.sharpnessGreen;
		green = <div className="inline-block sharp" style={{
			width: weapon.attributes.sharpnessGreen * scale,
			background: '#6fe060'
		}} />;
	}

	if (weapon.attributes.sharpnessBlue) {
		total += weapon.attributes.sharpnessBlue;
		const c = total === 100 ? 'sharp-right inline-block' : 'sharp inline-block';
		blue = <div className={c} style={{
			width: weapon.attributes.sharpnessBlue * scale,
			background: '#1bb1f7'
		}} />;
	}

	if (weapon.attributes.sharpnessWhite) {
		total += weapon.attributes.sharpnessWhite;
		const c = total === 100 ? 'sharp-right inline-block' : 'sharp inline-block';
		white = <div className={c} style={{
			width: weapon.attributes.sharpnessWhite * scale,
			background: 'white'
		}} />;
	}

	return (
		<div style={{ marginTop: 6, marginRight: 3 }}>
			<p className="txt-light">Sharpness</p>
			<div style={{ padding: 0, maxHeight: 17,
				minWidth: 100 * scale, borderRadius: 5,
				border: '1px solid #243743',
				background: '#243742'
			}}>
				{red}{orange}{yellow}{green}{blue}{white}
			</div>
		</div>
	);
};

export { SkillLevels, SharpnessBar };
