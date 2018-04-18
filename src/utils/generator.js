import Combinatorics from 'js-combinatorics';
import _ from 'lodash';

import { filterArmourBySkills } from './searchFilter.js';
import CustomSet from '../store/sets.js';

// Include low rank gear in search.
// TODO: Create UI toggle for this.
const includeLowRank = false;

const getSetsFromRequirements = async (requirements) => {
	return await generateSets(requirements);
};

const generateSets = requirements => {
	// Find all equipment that has any required skill.
	const skillIds = requirements.map((r, i) => r.id);
	const allMatching = filterArmourBySkills(skillIds);

	const equipment = { head: [], chest: [], gloves: [], waist: [], legs: [] };
	let matches = [];

	// Filter equipment by type.
	allMatching.forEach(e => {
		if (includeLowRank || e.rank === 'high') {
			let equip = { id: e.id, skills: [] };
			e.skills.forEach(s => {
				equip.skills.push({ id: s.skill, lvl: s.level });
			});
			equipment[e.type].push(equip);
		}
	});

	// Get cartesian product of categorised arrays.
	const equipmentArrays = _.values(equipment);
	equipmentArrays.forEach(a => {
		a.push('empty');
	});
	const combinations = Combinatorics.cartesianProduct(...equipmentArrays).toArray();

	// Tally up total skills for each set.
	combinations.forEach(combo => {
		let skills = [];

		combo.forEach(equip => {
			if (equip !== 'empty') {
				equip.skills.forEach(skill => {
					const i = skills.findIndex(s => s.id === skill.id);
					if (i > -1) {
						skills[i].lvl += skill.lvl;
					}
					else {
						skills.push({
							id: skill.id,
							lvl: skill.lvl
						});
					}
				});
			}
		});

		// Check if the set meets all requirements.
		let metRequrements = [];
		requirements.forEach(r => {
			if (r.allowGreater && skills.some(s => s.id === r.id && s.lvl >= r.lvl)) {
				metRequrements.push(true);
			}
			else if (skills.some(s => s.id === r.id && s.lvl === r.lvl)) {
				metRequrements.push(true);
			}
		});

		// Create a new set from IDs and add to matches.
		if (metRequrements.length === requirements.length) {
			const set = CustomSet.createSetFromIds({
				head: combo[0].id,
				chest: combo[1].id,
				gloves: combo[2].id,
				waist: combo[3].id,
				legs: combo[4].id,
			});
			matches.push(set);
		}
	});
	return new Promise(resolve => resolve(matches));
};

export { getSetsFromRequirements };
