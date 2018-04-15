import { db } from '../store/db.js';
import { filterArmourBySkills } from './searchFilter.js';

export default {
	generateSets: requirements => {
		const equipmentWithSkills = filterArmourBySkills(requirements);
		const equipment = { head: null, chest: null, gloves: null, waist: null, legs: null };

		equipmentWithSkills.forEach(e => {
			equipment[e.type] = e;
		});
		console.log(equipment);
	}
};
