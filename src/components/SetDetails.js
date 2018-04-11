import React from 'react';

import { SkillLevels } from './Indicators.js';
import { db } from '../store/db.js';
import { titleCase } from '../utils/parser.js';

const SkillList = ({ set }) => {
    set.updateSkills();
    const skills = set.skills.map((x, i) => {
        const maxLvl = db.skills ? db.skills.find(y => y.id === x.id).ranks.length : x.level;
        return <SkillLevels key={i} name={titleCase(x.name)} lvl={x.level} maxLvl={maxLvl}/>;
    });

    return (
        <ul>{skills}</ul>
    );
};

export { SkillList };
