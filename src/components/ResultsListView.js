import React from 'react';
import { ListGroup } from 'react-bootstrap';

import { ResultsListItem } from './ResultsListItem.js';

const listStyle = {
	border: '1px solid #243743',
	maxHeight: 425,
	color: '#243743',
	borderRadius: 0
};

const containerStyle = {
	background: '#243743',
	color: 'white',
	borderRadius: 2,
	padding: 0
};

const ResultsListView = ({ results, addToCollection, maxResults }) => {
	const slice = results.slice(0, maxResults);
	const list = slice.map((r, i) => (
		<ResultsListItem
			key={i}
			set={r}
			addToCollection={addToCollection}
			index={i}
		/>
	));
	const message = results.length > maxResults ?
		`Showing ${maxResults} of ${results.length} matches.`
		: results.length === 1 ? '1 match found.'
		: `${results.length} matches found.`;

	return(
		<div style={containerStyle}>
			<p style={{padding: '3px 0 0 8px', margin: 0}}>{message}</p>
			<ListGroup style={listStyle} className="scroll-y">
				{list}
			</ListGroup>
		</div>
	);
};

export default ResultsListView;
