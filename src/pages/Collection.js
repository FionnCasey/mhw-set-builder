import React, { Component } from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';

import CustomSet from '../store/sets.js';
import SetDisplay from '../components/SetDisplay.js';
import TabView from '../components/TabView.js';
import SearchPanel from '../components/Search.js';
import { SetListView } from '../components/SetListView.js';

import { fetchData } from '../store/dummyDB.js';

export default class Collection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sets: props.user.sets,
			activeIndex: -1,
			showSearch: false,
			searchType: ''
		};
	}

	componentDidMount() {
		if (this.props.user.sets.length === 0) fetchData(this.addSet);
	}

	setActiveIndex = i => {
		this.setState({ activeIndex: i });
	};

	createSet = () => {
		this.props.user.sets.unshift(new CustomSet(this.props.user.sets.length));
		this.setState({ activeIndex: 0 });
	};

	addSet = data => {
		const set = CustomSet.createSetFromData(data, this.props.user.sets.length);
		set.updateSkills();
		this.props.user.sets.unshift(set);
		this.setState({ activeIndex: 0 });
	};

	deleteSet = i => {
		const { sets } = this.props.user;
		sets.splice(i, 1);
		const activeIndex = this.state.activeIndex >= sets.length ? sets.length - 1 : this.setActiveIndex;
		this.setState({ sets, activeIndex });
	};

	editEquip = type => {
		this.setState({ showSearch: true, searchType: type });
	};


	render() {
		const { activeIndex, sets } = this.state;
		let hideSearch = () => this.setState({ showSearch: false, searchType: '' });

		return(
			<div>
				<SearchPanel
					show={this.state.showSearch}
					onHide={hideSearch}
					type={this.state.searchType}
					activeset={this.state.sets[activeIndex]}
				/>
				<Row>
					<Col xs={12} md={6}>
						<h2>Collection</h2>
					</Col>
					<Col xs={12} md={6}>

					</Col>
				</Row>
				<Row>
					<Col xs={12} md={3}>
						<SetListView
							sets={sets}
							deleteSet={this.deleteSet}
							createSet={this.createSet}
							activeIndex={activeIndex}
							setActiveIndex={this.setActiveIndex}
						/>
					</Col>
					<Col xs={12} md={6}>
						{
							activeIndex > -1 ?
								<SetDisplay
									set={this.props.user.sets[activeIndex]}
									editEquip={this.editEquip}
									setActiveIndex={this.setActiveIndex}
								/>
								:
								<div style={{
									height: 425,
									textAlign: 'center',
									paddingTop: 100,
									color: '#4f4f4f'
								}}>
									<h4>Select a set or create a new one.</h4>
								</div>
						}
					</Col>
					<Col xs={12} md={3}>
					{
						activeIndex > -1 ?
						<TabView
							sets={sets}
							deleteSet={this.deleteSet}
							createSet={this.createSet}
							activeIndex={activeIndex}
							setActiveIndex={this.setActiveIndex}
						/> :
						null
					}
					</Col>
				</Row>
			</div>
		);
	}
}
