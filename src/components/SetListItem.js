import React from 'react';
import { ListGroupItem, Image, Glyphicon } from 'react-bootstrap';

import { getWeaponIcon } from '../utils/imagePaths.js';

const SetListItem = ({ set, index, activeIndex, setActiveIndex, deleteSet }) => {
	const className = index === activeIndex ? 'hover-hl selected' : 'hover-hl';

	return (
		<ListGroupItem
			style={{ padding: 0, minHeight: 35, direction: 'ltr' }}
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

export { SetListItem };
