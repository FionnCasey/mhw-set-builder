import React from 'react';
import { Image, ListGroupItem, Popover, OverlayTrigger } from 'react-bootstrap';

import { getArmourIcon } from '../utils/imagePaths.js';
import { parseArmourName } from '../utils/parser.js';
import { SkillLevels } from './Indicators.js';
import { db } from '../store/db.js';
import { titleCase } from '../utils/parser.js';

const icon = type => (
	<Image
		src={getArmourIcon(type)}
		className="icon-sm"
		style={{ padding: 0 }}
	/>
);

const rowStyle = {
	cursor: 'pointer',
	borderRadius: 0
};

const addedPopover = (
	<Popover id="added-popover">
		<strong>Added to Collection</strong>
	</Popover>
);

const ResultsListItem = ({ set, addToCollection }) => {
	const { head, chest, gloves, waist, legs } = set.equipment;

	set.updateSkills();
    const skills = set.skills.map((x, i) => {
        const maxLvl = db.skills ? db.skills.find(y => y.id === x.id).ranks.length : x.level;
        return (
            <SkillLevels
                key={i}
                name={titleCase(x.name)}
                lvl={x.level}
                maxLvl={maxLvl}
            />
        );
    });

	return (
		<OverlayTrigger trigger="click" rootClose placement="left" overlay={addedPopover}>
		<ListGroupItem style={rowStyle} onClick={() => addToCollection(set)}className="results-group">
			<ul className="result-list">
				<li>{icon('head')}{' '}{head ? parseArmourName(head.name) : 'None'}</li>
				<li>{icon('chest')}{' '}{chest ? parseArmourName(chest.name) : 'None'}</li>
				<li>{icon('gloves')}{' '}{gloves ? parseArmourName(gloves.name) : 'None'}</li>
				<li>{icon('waist')}{' '}{waist ? parseArmourName(waist.name) : 'None'}</li>
				<li>{icon('legs')}{' '}{legs ? parseArmourName(legs.name) : 'None'}</li>
				<li>{icon('charm')}{' '}None</li>
			</ul>
			<div style={{display: 'inline-block', float: 'right'}}>
				{skills}
			</div>
		</ListGroupItem>
		</OverlayTrigger>
	);
};

export { ResultsListItem };
