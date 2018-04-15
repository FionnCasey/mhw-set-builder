const checkDone = (data, onDone) => {
	if (data.hasOwnProperty('weapon')
		&& data.hasOwnProperty('head')
		&& data.hasOwnProperty('chest')
		&& data.hasOwnProperty('gloves')
		&& data.hasOwnProperty('waist')
		&& data.hasOwnProperty('legs')
		&& data.hasOwnProperty('charm')) {

			onDone(data);
		}
};

const fetchData = onDone => {
	let data = {};

	// Weapon
	fetch(`https://mhw-db.com/weapons/719`)
	.then(res => {
		if (res.ok) return res.json();
		throw new Error('Request failed.');
	})
	.then(results => {
		data.weapon = results;
		checkDone(data, onDone);
	})
	.catch(err => {
		console.log(err);
	});

	// Head
	fetch(`https://mhw-db.com/armor/650`)
	.then(res => {
		if (res.ok) return res.json();
		throw new Error('Request failed.');
	})
	.then(results => {
		data.head = results;
		checkDone(data, onDone);
	})
	.catch(err => {
		console.log(err);
	});

	// Chest
	fetch(`https://mhw-db.com/armor/396`)
	.then(res => {
		if (res.ok) return res.json();
		throw new Error('Request failed.');
	})
	.then(results => {
		data.chest = results;
		checkDone(data, onDone);
	})
	.catch(err => {
		console.log(err);
	});

	// Gloves
	fetch(`https://mhw-db.com/armor/600`)
	.then(res => {
		if (res.ok) return res.json();
		throw new Error('Request failed.');
	})
	.then(results => {
		data.gloves = results;
		checkDone(data, onDone);
	})
	.catch(err => {
		console.log(err);
	});

	// Waist
	fetch(`https://mhw-db.com/armor/398`)
	.then(res => {
		if (res.ok) return res.json();
		throw new Error('Request failed.');
	})
	.then(results => {
		data.waist = results;
		checkDone(data, onDone);
	})
	.catch(err => {
		console.log(err);
	});

	// Legs
	fetch(`https://mhw-db.com/armor/399`)
	.then(res => {
		if (res.ok) return res.json();
		throw new Error('Request failed.');
	})
	.then(results => {
		data.legs = results;
		checkDone(data, onDone);
	})
	.catch(err => {
		console.log(err);
	});

	// Charm
	fetch(`https://mhw-db.com/charms/1`)
	.then(res => {
		if (res.ok) return res.json();
		throw new Error('Request failed.');
	})
	.then(results => {
		data.charm = results;
		checkDone(data, onDone);
	})
	.catch(err => {
		console.log(err);
	});
};

const userDb = [
	{ name: 'fionn', password: 'pass' }
];

export { fetchData, userDb };
