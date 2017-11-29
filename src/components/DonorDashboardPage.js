import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDonor } from '../actions';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Payments from './Payments';

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
				<li key={org.id} className="fav-org-list-item">
					<Link to={`/organizations/${org.id}`}>{org.name}</Link>
				</li>
			);
		})
	}
	// bug - only the first org clicked on will go to the correct show page :S 
	//then after the first one is clicked, all the other org links go to that first org
	//show page until I reload the page :S :S :S :S

	render() {
		const {donor} = this.props;
		const {favouriteOrgs} = this.props;

		if (!donor && !favouriteOrgs) {
			return <div>Loading your dashboard...</div>
		}
		
		return(
			<div className="DonorDashboardPage">
			<h3 className="dashboard-header">Welcome to your dashboard {donor.firstName}</h3>
			<div className="container">
			<div className="row donor-dashboard-row">
				<div className="col-md-4">
					<h5>Recent Updates from Your Organizations</h5>
				</div>
				<div className="col-md-4">
					<div className="row flex-column manage-credits">
						<h5>Manage your Credits</h5>
						<Payments />
					</div>
					<div className="row">
						<h5>Browse our new Organizations</h5>
					</div>
				</div>
				<div className="col-md-4">
					<div className="recent-donations">
						<h5>Your Recent donations: </h5>
						<p>Donation!</p>
						<p>Donation!</p>
						<p>Donation!</p>
						<a href="#">View all donation history</a>
					</div>
					<div>
						<h5>See what your favourite organizations are up to...</h5>
						<ul className="donorFavOrgs">{this._renderFavouriteOrgs()}</ul>
					</div>
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