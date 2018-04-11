import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import { SetListView } from './SetListView.js';
import { SkillList } from './SetDetails.js';

export default class TabView extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
           key: 1
       };
    }

    handleSelect = key => {
        this.setState({ key });
    };

    render() {
        const { sets, createSet, deleteSet, activeIndex, setActiveIndex } = this.props;

        return (
            <Tabs
                activeKey={this.state.key}
                onSelect={this.handleSelect}
                id="tab-controller"
                style={{
                    background: 'white',
                    borderRadius: 5
                }}
            >
                <Tab eventKey={1} title="Set Details">
                    <SkillList set={sets[activeIndex]} />
                </Tab>
                <Tab eventKey={2} title="Equipment Search">
                    Search
                </Tab>
            </Tabs>
        );
    }
}
