import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import ResultsListView from '../components/ResultsListView.js';
import Requirements from '../components/Requirements.js';
import { getSetsFromRequirements } from '../utils/generator.js';

export default class Generate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: '',
			requirements: [],
			results: [],
			maxResults:  50
		};
	}

	generate = () => {
		this.setState({ message: 'Generating...', results: [] },
			() => {
				getSetsFromRequirements(this.state.requirements).then(results => {
					const message = results.length > 0 ? 'Rendering...' : 'No matches found.';
					this.setState({ results, message });
				});
			}
		);
	};

	addRequirement = req => {
		let { requirements } = this.state;
		requirements.push(req);
		this.setState({ requirements });
	};

	removeRequirement = i => {
		let { requirements } = this.state;
		requirements.splice(i, 1);
		this.setState({ requirements });
	};

	editRequirement = (req, i) => {
		let { requirements } = this.state;
		requirements.splice(i, 1, req);
		this.setState({ requirements });
	};

	addSet = set => {
		set.name = 'New Custom Set';
		this.props.user.sets.unshift(set);
	};

	render() {
		const { results, maxResults, requirements, message } = this.state;

		return(
			<div>
				<Row>
					<Col xs={12} md={12}>
						<h2>Generate</h2>
					</Col>
				</Row>
				<Row>
					<Col xs={12} md={6}>
						<div>
							<Requirements
								reqs={requirements}
								addReq={this.addRequirement}
								removeReq={this.removeRequirement}
								generate={this.generate}
							/>
						</div>
					</Col>
					<Col xs={12} md={6}>
					{
						results.length > 0 ?
						<ResultsListView
							results={results}
							maxResults={maxResults}
							addToCollection={this.addSet}
						/>
						:
						<div>
							{message}
						</div>
					}
					</Col>
				</Row>
			</div>
		);
	}
}
