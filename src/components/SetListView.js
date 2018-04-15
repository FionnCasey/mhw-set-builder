import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import { SetListItem } from './SetListItem.js';
import { BtnPrimary } from '../utils/customStyles.js';

const SetListView = ({ sets, createSet, deleteSet, activeIndex, setActiveIndex }) => {
    const setView = sets.map((x, i) => {
        return (
            <SetListItem key={i} set={x}
                setActiveIndex={setActiveIndex}
                index={i}
                deleteSet={deleteSet}
                activeIndex={activeIndex}
            />
        );
    });
    return (
        <div style={{ background: 'white', border: '1px solid  #243743', borderRadius: 5, marginBottom: 15 }}>
        <div style={{ border: 'none', borderRadius: 0,
            borderBottom: '1px solid #243743',
            padding: '8px 10px 8px 10px'
        }}>
            <p style={{ display: 'inline-block', margin: 0, padding: 0 }}>
                {sets.length === 1 ? '1 set in collection.' : sets.length + ' sets in collection.'}
            </p>
            {BtnPrimary('Create Set', createSet, 'xsmall')}
        </div>
            <ListGroup
                className="scroll-y"
                style={{
                    maxHeight: 425,
                    direction: 'rtl',
                    marginBottom: 0,
                    borderRadius: 0

                }}
            >
                {setView}
            </ListGroup>
        </div>
    );
};

export { SetListView };
