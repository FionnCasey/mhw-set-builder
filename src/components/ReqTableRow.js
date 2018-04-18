import React, { Component } from 'react';

import { BtnGlyph } from '../utils/customStyles.js';

export default class ReqTableRow extends Component {
	render() {
		const { name, lvl, allowGreater, removeReq, index } = this.props;
		const operator = allowGreater ? 'greater or equal' : 'exactly equal';

		return (
			<tr>
				<td>{name}</td>
				<td>{operator}</td>
				<td style={{textAlign:'right'}}>{`Level ${lvl}`}</td>
				<td style={{textAlign: 'right', paddingRight: 10}}>{BtnGlyph('minus',() => removeReq(index))}</td>
			</tr>
		);
	}
}
