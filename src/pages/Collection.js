import React, { Component } from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';

import CustomSet from '../store/sets.js';
import { SetCard, SetPreview } from '../components/SetCards.js';
import { BtnPrimary } from '../utils/customStyles.js';

import { fetchData } from '../store/dummyDB.js';

export default class Collection extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sets: props.user.sets,
			activeIndex: -1,
			hoverIndex: -1
		};
	}

	componentDidMount() {
		if (this.props.user.sets.length === 0) fetchData(this.addSet);
	}

	setActiveIndex = i => {
		this.setState({ activeIndex: i });
	};

	setHoverIndex = i => {
		this.setState({ hoverIndex: i });
		console.log('hover ' + i);
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
		console.log(type);
	};

	render() {
		const { activeIndex } = this.state;
		const sets = this.state.sets.map((x, i) => {
			return (
				<SetPreview key={i} set={x}
					editEquip={this.editEquip}
					skillDB={this.props.skillDB}
					setActiveIndex={this.setActiveIndex}
					index={i}
					deleteSet={this.deleteSet}
					activeIndex={activeIndex}
					setHoverIndex={this.setHoverIndex}
				/>
			);
		});

		return(
			<div>
				<Row>
					<Col xs={12} md={8}>
						<h2>Collection</h2>
					</Col>
					<Col xs={6} md={4}>

					</Col>
				</Row>
				<Row>
					<Col xs={12} md={8}>
						<div className="light-card">
							<p style={{ display: 'inline-block', margin: 0, paddingLeft: 5 }}>
								{sets.length === 1 ? '1 set in collection.' : sets.length + ' sets in collection.'}
							</p>
							{BtnPrimary('Create Set', this.createSet, 'xsmall')}
						</div>
						{
							activeIndex > -1 ?
								<SetCard
									set={this.props.user.sets[activeIndex]}
									editEquip={this.editEquip}
									skillDB={this.props.skillDB}
									setActiveIndex={this.setActiveIndex}
								/>
								: null
						}
						<ListGroup
							className="scroll-y"
							style={{
								borderRadius: 5,
								marginTop: 10,
								maxHeight: '60vh'
							}}
						>
							{sets}
						</ListGroup>
					</Col>
					<Col xs={6} md={4}>
						{
							activeIndex > -1 ? <div className="light-card">Detailed View</div> : null
						}
					</Col>
				</Row>
			</div>
		);
	}
}
