import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrganization } from '../actions';

class OrganizationsShowPage extends Component {

	componentDidMount() {
		const { id } = this.props.match.params;
		this.props.fetchOrganization(id);
	}

	renderCampaigns() {
		// const style = {
		// 	backgroundImage: 'url("/images/leaf.jpg")'
		// }
		return _.map(this.props.campaigns, campaign => {
			return (
				<div className="col-md-6" key={campaign.id}>
					<div className="card campaign-item">
						<div className="card-body">
							<div className="card-title">{campaign.name}</div>
							<button className="btn btn-success">Donate to this campaign</button>
						</div>
					</div>
				</div>
			);
		})
	}

	render() {
		const { org } = this.props;
		const { campaigns } = this.props;

		if (!org || !campaigns) {
			return <div>Loading Non-profit data...</div>
		}

		return (
			<div className="OrganizationsShowPage container">
				<Link to="/organizations">Back</Link>
				<div className="row">
					<h2>{org.name}</h2>
					<p>{org.description}</p>
					<button className="btn btn-success ml-auto">Donate to {org.name}</button>
				</div>
				<h3><strong>Current Campaigns</strong></h3>
				<div className="row">
					{this.renderCampaigns()}
				</div>
			</div>
		);
	}
}

function mapStateToProps({ orgs }, ownProps) {
	console.log('Orgs: ', orgs);
	return { org: orgs[0], campaigns: orgs[1] }
}

export default connect(mapStateToProps, { fetchOrganization })(OrganizationsShowPage);

