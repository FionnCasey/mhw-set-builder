import React, { Component } from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';

import CustomSet from '../store/sets.js';
import { BtnPrimary } from '../utils/customStyles.js';
import SetDisplay from '../components/SetDisplay.js';
import { SetListItem } from '../components/SetListItem.js';

import { fetchData } from '../store/dummyDB.js';

export default class Collection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sets: props.user.sets,
			activeIndex: -1
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
		this.setState({ sets });
	};

	editEquip = type => {
		console.log('edit ' + type);
	};

	render() {
		const { activeIndex } = this.state;
		const sets = this.state.sets.map((x, i) => {
			return (
				<SetListItem key={i} set={x}
					editEquip={this.editEquip}
					setActiveIndex={this.setActiveIndex}
					index={i}
					deleteSet={this.deleteSet}
					activeIndex={activeIndex}
				/>
			);
		});

		return(
			<div>
				<Row>
					<Col xs={12} md={6}>
						<h2>Collection</h2>
					</Col>
					<Col xs={12} md={6}>

					</Col>
				</Row>
				<Row>
					<Col xs={12} md={6}>
						<div className="light-card">
							<p style={{ display: 'inline-block', margin: 0, paddingLeft: 5 }}>
								{sets.length === 1 ? '1 set in collection.' : sets.length + ' sets in collection.'}
							</p>
							{BtnPrimary('Create Set', this.createSet, 'xsmall')}
						</div>
						<ListGroup
							className="scroll-y"
							style={{
								borderRadius: 5,
								marginTop: 10,
								maxHeight: 425,
								direction: 'rtl'
							}}
						>
							{sets}
						</ListGroup>
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
								<div
									style={{
										minHeight: '60vh',
										textAlign: 'center',
										border: '1px solid #243743',
										borderRadius: 5,
										background: '#E7E7E7'
									}}
								>
									Select a set to edit.
								</div>
						}
					</Col>
				</Row>
			</div>
		);
	}
}
