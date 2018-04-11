import { db } from '../store/db.js';

const filterArmourBySkills = required => {
    let results = [];
    db.armour.forEach(a => {
        if (a.skills.find(s => required.find(r => s.id === r))) {
            results.push(a);
        }
    });
    return results;
};

export { filterArmourBySkills };
