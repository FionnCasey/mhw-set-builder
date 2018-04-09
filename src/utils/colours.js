const rarityColours = [
		'#ffffff',
		'#ffffff',
		'#ffffff',
		'#00a056',
		'#00A1D4',
		'#363587',
		'#6512B0',
		'#D6723F'
];

const nameColours = [
	{ name: 'zorah', colour: '#363587' },
	{ name: 'rathalos', colour: '#363587' }
];

const getColourByName = name => {
	let colour = '#ffffff';
	nameColours.forEach(x => {
		if (name.toLowerCase().search(x.name) !== -1) {
			colour = x.colour;
		}
	});
	return colour;
};

export { rarityColours, getColourByName };
