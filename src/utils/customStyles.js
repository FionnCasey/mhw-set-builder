import { Button, Glyphicon } from 'react-bootstrap';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';
import React from 'react';

bootstrapUtils.addStyle(Button, 'primary');
bootstrapUtils.addStyle(Button, 'secondary');
bootstrapUtils.addStyle(Button, 'glyph');
bootstrapUtils.addStyle(Button, 'dropdown');

const BtnPrimary = (text, onClick, size = 'small', float = 'right') => (
	<div style={{ display: 'inline-block', float: float }}>
	    <style type="text/css">{`
	    .btn-primary {
	        background-color: #f44f5a !important;
	        color: white;
			border: none;
			min-width: 60px;
	    }
		.btn-primary:hover {
	        background-color: #f44f5a;
	        color: white;
	    }
	    `}</style>
	    <Button onClick={(e) => {e.preventDefault(); onClick()}} bsSize={size} bsStyle="primary">{text}</Button>
  	</div>
);

const BtnSecondary = (text, onClick, size = 'small', float = 'right') => (
	<div style={{ display: 'inline-block', float: float }}>
	    <style type="text/css">{`
	    .btn-secondary {
	        background-color: #ffae00 !important;
	        color: white;
			border: none;
			min-width: 60px;
	    }
		.btn-secondary:hover {
	        background-color: #ffae00;
	        color: white;
	    }
	    `}</style>
	    <Button onClick={(e) => {e.preventDefault(); onClick()}} bsSize={size} bsStyle="secondary">{text}</Button>
  	</div>
);

const BtnGlyph = (glyph, onClick, text = '', size = 'xsmall', float = 'none') => (
	<div style={{ display: 'inline-block', float: float }}>
	    <style type="text/css">{`
	    .btn-glyph {
	        background-color: #243743 !important;
	        color: white;
			border: none;
			border-radius: 50%;
			width: 20px;
			height: 20px;
			padding: 1px;
	    }
		.btn-glyph:hover {
	        background-color: #243743;
	        color: white;
	    }
	    `}</style>
		<Button onClick={() => onClick()} bsSize={size} bsStyle="glyph">
			{text}
			<Glyphicon glyph={glyph} style={{ color: 'white' }}/>
		</Button>
  	</div>
);

export { BtnPrimary, BtnSecondary, BtnGlyph };
