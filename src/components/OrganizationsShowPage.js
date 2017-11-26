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

	render() {
		const { org } = this.props;

		if (!org) {
			return <div>Loading Non-profit data...</div>
		}

		return (
			<div className="OrganizationsShowPage container">
				<div className="row">
					<p>{org.name}</p>
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