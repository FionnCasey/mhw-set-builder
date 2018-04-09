export default class CustomSet {
	constructor(count) {
		this.equipment = {
			weapon: null,
			head: null,
			chest: null,
			gloves: null,
			waist: null,
			legs: null,
			charm: null
		};
		this.skills = [];
		this.decorations = [];
		this.name = 'New Set ' + (count + 1);
	}

	updateSkills() {
		this.skills = [];
		let keys = [];
		for (var key in this.equipment) {
			if (this.equipment.hasOwnProperty(key)) keys.push(key);
		}

		for (let i = 0; i < keys.length; i++) {
			if (keys[i] === 'weapon' || !this.equipment[keys[i]]) continue;

			this.equipment[keys[i]].skills.forEach(skill => {
				const name = skill.slug.substring(0, skill.slug.length - 7).split('-').join(' ');
				const i = this.skills.findIndex(e => e.name === name);

				if (i > -1) {
					this.skills[i].level += parseInt(skill.level, 10);
				}
				else {
					this.skills.push({
						id: skill.skill,
						name,
						level: parseInt(skill.level, 10),
					 });
				}
			});
		}
	}

	getSlots() {
		let slots = [];
		return slots;
	}

	static createSetFromData(data, count) {
		let set = new CustomSet(count);
		set.equipment.weapon = data.weapon;
		set.equipment.head = data.head;
		set.equipment.chest = data.chest;
		set.equipment.gloves = data.gloves;
		set.equipment.waist = data.waist;
		set.equipment.legs = data.legs;
		set.equipment.charm = data.charm;
		return set;
	}
}
