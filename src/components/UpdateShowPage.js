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
		this.props.fetchUpdate(id);
	}

	render() {
		const { update, org } = this.props;

		if (!update) {
			return <div>Loading Update...</div>
		}
		const updateDate = new Date(update.created_at)
			let year = updateDate.getFullYear()+"";
			let month = (updateDate.getMonth()+1)+"";
			let day = updateDate.getDate()+"";
			let dateFormat = year + '-' + month + '-' + day;

		return (
			<div className="UpdateShowPage container">
				<div className="row">
					<div className="col-md-5 update-show-page-title">
						<h1>{update.title}</h1>
						<h5><strong>By:</strong> {org.name}</h5>
						<h6><strong>Created on: </strong>{dateFormat}</h6>
						<img style={{width: '50%', position: 'absolute', bottom: '0'}} className="animated fadeIn" src="/images/earth-leaves.png" />
					</div>
					<div className="col-md-7 update-show-page-overview">
					<p className="lead">{update.overview.slice(0, 100)}</p>
					<p>{update.overview.slice(100)}</p>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ updates }) {
	if(updates) {
		console.log(updates);
	}
	return { update: updates.update, org: updates.organization }
}

export default connect(mapStateToProps, { fetchUpdate })(UpdateShowPage);