import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrgUser } from '../actions';

class OrgDashboardPage extends Component {

	componentDidMount() {
		this.props.fetchOrgUser(this.props.userId);
	}

	render() {
		const { org, campaigns } = this.props;

		if (!org) {
			return <div>Loading your dashboard...</div>
		}

		return(
			<div className="OrgDashboardPage">
				<h3 className="dashboard-header animated fadeInLeft">Welcome to your dashboard {org.name}</h3>
				<div className="container">
					<div className="row org-dashboard-row animated fadeInUpBig">
						<p>hello!</p>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ userOrg }) {
	if (userOrg.organization) {
		console.log('UserOrg in mapStateToProps in OrgDashboardPage: ', userOrg)
	}
	return { org: userOrg.organization, campaigns: userOrg.campaigns }
}

export default connect(mapStateToProps, { fetchOrgUser })(OrgDashboardPage);