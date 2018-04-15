import { getSkillMaxLevel } from './db.js';

export default class CustomSet {
	constructor(count = '') {
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
		let skills = [];
		let keys = [];
		for (var key in this.equipment) {
			if (this.equipment.hasOwnProperty(key)) keys.push(key);
		}

		for (let i = 0; i < keys.length; i++) {
			if (keys[i] === 'weapon' || !this.equipment[keys[i]]) continue;

			this.equipment[keys[i]].skills.forEach(skill => {
				const name = skill.slug.substring(0, skill.slug.length - 7).split('-').join(' ');
				const i = skills.findIndex(e => e.name === name);

				if (i > -1) {
					skills[i].level += parseInt(skill.level, 10);
				}
				else {
					skills.push({
						id: skill.skill,
						name,
						level: parseInt(skill.level, 10),
						maxLvl: getSkillMaxLevel(skill.skill)
					 });
				}
			});
		}
		this.skills = skills.sort((a, b) => {
			if (a.level === b.level) {
				if (a.level === a.maxLevel || a.maxLvl >= b.maxLvl) {
					return -1;
				}
				return 1;
			}
			else if (a.level >= b.level) {
				return -1;
			}
			return 1;
		});
	}

	changeEquipment(type, equip) {
		this.equipment[type] = equip;
	}

	changeName(name) {
		this.name = name;
	}

	getSlots() {
		let slots = [];
		return slots;
	}

	static createSetFromData(data, count = '') {
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
