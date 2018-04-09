import { Button } from 'react-bootstrap';
import { bootstrapUtils } from 'react-bootstrap/lib/utils';
import React from 'react';

bootstrapUtils.addStyle(Button, 'primary');

const BtnPrimary = (text, onClick, size = 'small') => (
	<div style={{ display: 'inline-block', float: 'right' }}>
	    <style type="text/css">{`
	    .btn-primary {
	        background-color: purple;
	        color: white;
	    }
	    `}</style>
	    <Button onClick={() => onClick()} bsSize={size} bsStyle="primary">{text}</Button>
  	</div>
);


export { BtnPrimary };
