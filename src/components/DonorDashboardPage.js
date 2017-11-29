import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDonor } from '../actions';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class DonorDashboardPage extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.fetchDonor(this.props.userId); 
	}

	_renderFavouriteOrgs() {
		return _.map(this.props.favouriteOrgs, org => {
			return (
				<li><Link to={`/organizations/${org.id}`}>{org.name}</Link></li>
			);
		})
	}

	render() {
		console.log(this.props.donor)
		console.log(this.props.favouriteOrgs)
		const {donor} = this.props;
		const {favouriteOrgs} = this.props;

		if (!donor && !favouriteOrgs) {
			return <div>Loading your dashboard...</div>
		}
		
		return(
			<div className="DonorDashboardPage">
			<h3 className="dashboard-header">Welcome to your dashboard {this.props.donor.firstName}</h3>
			<div className="container">
			<div class="row">
				<div class="col-md-4"></div>
				<div class="col-md-4"></div>
				<div class="col-md-4">
					<h4>See what your favourite organizations are up to...</h4>
					<ul className="donorFavOrgs">{this._renderFavouriteOrgs()}</ul>
				</div>
			</div>
			</div>
			</div>
		);

	}
}

function mapStateToProps({ user }) {
	return { donor: user[0], favouriteOrgs: user[1] }
}

export default connect(mapStateToProps, { fetchDonor })(DonorDashboardPage);