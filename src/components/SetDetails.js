import React from 'react';

import { SkillLevels } from './Indicators.js';
import { db } from '../store/db.js';
import { titleCase } from '../utils/parser.js';

const SkillList = ({ set }) => {
    if (!set) return null;

    set.updateSkills();
    const skills = set.skills.map((x, i) => {
        const maxLvl = db.skills ? db.skills.find(y => y.id === x.id).ranks.length : x.level;
        return (
            <SkillLevels
                key={i}
                name={titleCase(x.name)}
                lvl={x.level}
                maxLvl={maxLvl}
            />
        );
    });

    return (
        <div style={{
            width: 300,
            background: '#243743',
            color: 'white',
            borderRadius: 5,
            border: '1px solid #243743',
            padding: 0
        }}>
            <div style={{ padding: '5px 0 0 10px', marginBottom: 5 }}>Total Skills</div>
            <div style={{
                background: 'white',
                color: '#243743',
                margin: 0,
                padding: '5px 0 5px 5px',
                borderRadius: '0 0 5px 5px'
            }}>
                { skills.length > 0 ? <ul>{skills}</ul> : 'No Skills' }
            </div>
        </div>
    );
};

export { SkillList };
