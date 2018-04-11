import React from 'react';
import { ListGroupItem, Image, Glyphicon } from 'react-bootstrap';

import { getWeaponIcon } from '../utils/imagePaths.js';

const SetListItem = ({ set, index, activeIndex, setActiveIndex, deleteSet }) => {
	const className = index === activeIndex ? 'hover-hl selected' : 'hover-hl';

	return (
		<ListGroupItem onClick={() => setActiveIndex(index)}
			style={{ borderRadius: 0, padding: 0, minHeight: 35, direction: 'ltr' }}
			className={className}
		>
			<div style={{ padding: 7, borderRadius: 0}}>
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
					onClick={(e) => {e.stopPropagation(); deleteSet(index)}}
					className="glyph-light icon-right"
					style={{ marginRight: 2 }}
				/>
			</div>
		</ListGroupItem>
	);
};

export { SetListItem };
