import { db, getArmourType } from '../store/db.js';

const filterArmourBySkills = required => {
    let results = [];
    db.armour.forEach(a => {
        if (a.skills.find(s => required.find(r => s.skill === r))) {
            results.push(a);
        }
    });
    return results;
};

const filterListByName = (list, name, armourType = '') => {
    if (armourType !== '') {
        return getArmourType(armourType).filter(x => x.name.toLowerCase().indexOf(name.toLowerCase()) > -1);
    }
    return list.filter(x => x.name.toLowerCase().indexOf(name.toLowerCase()) > -1);
};


export { filterArmourBySkills, filterListByName };
