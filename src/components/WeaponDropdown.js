import React from 'react';
import { DropdownButton, MenuItem, Image } from 'react-bootstrap';

import { getWeaponIcon } from '../utils/imagePaths.js';
import { titleCase } from '../utils/parser.js';

const types = [
	'all', 'bow', 'charge blade', 'dual blades', 'greatsword',
	'gunlance', 'hammer', 'heavy bowgun', 'hunting horn',
	'insect glaive', 'lance', 'light bowgun', 'longsword',
	'switch axe', 'sword and shield'
];

const WeaponDropdown = ({ current, select }) => {
	const elements = types.map((t, i) => (
		<MenuItem
			key={i}
			eventKey={i}
			onSelect={() => select(t.split(' ').join('-'))}
		>
			{
				t !== 'all' ?
				<Image
					src={getWeaponIcon(t.split(' ').join(''))}
					className="icon-sm"
					style={{ margin: '-5px 10px 0px 0px', padding: 0 }}
				/>
				: null
			}
			{titleCase(t)}
		</MenuItem>
	));

	return (
		<div>
			<p>Weapon Type</p>
			<div style={{ display: 'inline-block' }}>
				<DropdownButton
					bsStyle="dropdown"
					title=""
					id="weapon-dropdown"
				>
					{elements}
				</DropdownButton>
				{titleCase(current.split('-').join(' '))}
				{
					current !== 'all' ?
						<Image
							src={getWeaponIcon(current.split('-').join(''))}
							className="icon-sm"
							style={{ margin: '0 10px 15px 0px' }}
						/>
						: null
				}
			</div>
		</div>
	);
};

export { WeaponDropdown };
