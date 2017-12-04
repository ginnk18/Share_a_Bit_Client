import React, { Component } from 'react';
// import _ from 'lodash';
import { connect } from 'react-redux';
import { fetchUpdate } from '../actions';

class UpdateShowPage extends Component {
	constructor(props) {
		super(props)


	}

	componentDidMount() {
		const { id } = this.props.match.params;
		console.log(id);
		this.props.fetchUpdate(id);
	}

	render() {
		const { update } = this.props;

		if (!update) {
			return <div>Loading Update...</div>
		}

		return (
			<div className="UpdateShowPage">
				<h1>{update.title}</h1>
			</div>
		);
	}
}

function mapStateToProps({ updates }) {
	if(updates) {
		console.log('Updates in mapStateToProps in UpdateShowPage: ', updates)
	}
	return { update: updates.update }
}

export default connect(mapStateToProps, { fetchUpdate })(UpdateShowPage);