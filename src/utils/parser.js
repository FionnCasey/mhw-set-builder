const parseSkills = equipment => {
	let skills = [];
	equipment.skills.forEach(skill => {
		const name = skill.slug.substring(0, skill.slug.length - 7).split('-').join(' ');
		const i = skills.findIndex(e => e.name === name);
		if (i > -1) {
			skills[i].level += parseInt(skill.level, 10);
		}
		else {
			skills.push({ name, level: parseInt(skill.level, 10), id: skill.skill });
		}
	});
	return skills;
};

const titleCase = str => {
	return str.toLowerCase().split(' ').map(w => {
		return w.charAt(0).toUpperCase() + w.slice(1);
	}).join(' ');
};

export { parseSkills, titleCase };
