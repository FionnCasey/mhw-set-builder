const db = {
	weapons: null,
	armour: null,
	charms: null,
	skills: null
};

const checkDones = () => (
	db.weapons !== null &&
	db.armour !== null &&
	db.charms !== null &&
	db.skills !== null
);

const loadEquipment = onDone => {
	fetchData('weapons', (results) => {
		db.weapons = results;
		if (checkDones()) onDone();
	});

	fetchData('armor', (results) => {
		db.armour = results;
		if (checkDones()) onDone();
	});

	fetchData('charms', (results) => {
		db.charms = results;
		if (checkDones()) onDone();
	});

	fetchData('skills', (results) => {
		let skills = [];
		results.forEach(x => {
		   skills.push({
			   id: x.ranks[0].skill,
			   name: x.name,
			   ranks: x.ranks
		   });
		});
		db.skills = skills;
		if (checkDones()) onDone();
	});
};

const fetchData = (endpoint, onDone) => {
	fetch(`https://mhw-db.com/${endpoint}`)
	.then(res => {
		if (res.ok) return res.json();
		throw new Error('Request failed.');
	})
	.then(results => {
		onDone(results);
	})
	.catch(err => {
		console.log(err);
	});
};

export { db, loadEquipment };
