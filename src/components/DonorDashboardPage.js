import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDonor } from '../actions';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Payments from './Payments';

class DonorDashboardPage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			credits: 0
		}
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

	_renderDonationHistory() {
		let count = -1;
		return _.map(this.props.transactions, transaction => {
			const transactionDate = new Date(transaction.created_at)
			let year = transactionDate.getFullYear()+"";
			let month = (transactionDate.getMonth()+1)+"";
			let day = transactionDate.getDate()+"";
			let dateFormat = year + '-' + month + '-' + day;
			count += 1;
			return (
				<tr>
					<td>${transaction.amount}</td>
					<td>{transaction.type}</td>
					<td>{this.props.orgsDonatedTo[count].name}</td>
					<td>{dateFormat}</td>
				</tr>
			);
		})
	}

	render() {
		const { donor,
				favouriteOrgs,
				transactions,
				orgsDonatedTo,
				favouriteOrgCampaigns,
				favouriteOrgUpdates 
		} = this.props;

		if (!donor && !favouriteOrgs && !transactions && !orgsDonatedTo) {
			return <div>Loading your dashboard...</div>
		}

		eval(`$(function () {
  			$('[data-toggle="popover"]').popover()
		})`)

		// <Link onClick={this.clearModal} to={`/updates/${update.id}`}>{update.title}</Link>
		
		return(
			<div className="DonorDashboardPage">
			<h3 className="dashboard-header animated fadeInLeft">Welcome to your dashboard {donor.firstName}</h3>
			<div className="container">
			<div className="row donor-dashboard-row animated fadeInUpBig">
				<div className="col-md-4">
					<h5>Recent Updates from Your Organizations</h5>
					<p><Link to={`/updates/${favouriteOrgUpdates[0][0].id}`}>{favouriteOrgUpdates[0][0].title}</Link></p>
					<p><strong>Created by: </strong>{favouriteOrgs[0].name}</p>
					<p><Link to={`/updates/${favouriteOrgUpdates[1][0].id}`}>{favouriteOrgUpdates[1][0].title}</Link></p>
					<p><strong>Created by: </strong>{favouriteOrgs[1].name}</p>
					<p><Link to={`/updates/${favouriteOrgUpdates[2][0].id}`}>{favouriteOrgUpdates[2][0].title}</Link></p>
					<p><strong>Created by: </strong>{favouriteOrgs[2].name}</p>
					<a href="#">Browse All Updates</a>
				</div>
				<div className="col-md-4">
					<div className="row flex-column manage-credits">
						<h5>Manage your Credits</h5>
						<p>Your Credits: {donor.credits}</p>
						<p>Your Bitcredits: {donor.bitcredits}</p>
						<Payments />
						<a
							className="what-are-credits" 
							href="#"
							data-toggle="popover"
							data-placement="left"
							title="We're glad you asked!"
							data-content="On Share a Bit, you will donate to organizations by transfering 
							credits to them. You can easily load up your account with credits by clicking on the
							'Add Credits' button above. Each credit is worth $1. You can buy $5 worth of credits
							at a time. On Share a Bit, you also have the option of transfering bitcoin to an organization.
							Bitcredits keep track of how much bitcoin you have loaded into your account. 
							If you have more questions please call 1-800-401-7890."
						>What are credits and bitcredits?</a>
					</div>
					<div className="row manage-credits flex-column">
						<h5>New Campaigns From Your Organizations</h5>
						<p><a href="#">{favouriteOrgCampaigns[0].name}</a></p>
						<p><strong>Created by: </strong>{favouriteOrgs[0].name}</p>
						<p><a href="#">{favouriteOrgCampaigns[1].name}</a></p>
						<p><strong>Created by: </strong>{favouriteOrgs[1].name}</p>
						<p><a href="#">{favouriteOrgCampaigns[2].name}</a></p>
						<p><strong>Created by: </strong>{favouriteOrgs[2].name}</p>
					</div>
				</div>
				<div className="col-md-4">
					<div className="recent-donations">
						<h5>Your Recent donations: </h5>
						{
							transactions[0] && orgsDonatedTo[0]
								? <p>You donated ${transactions[0].amount} to {orgsDonatedTo[0].name}</p>
								: <p>No recent donations</p>
						}
						{
							transactions[1] && orgsDonatedTo[1]
								? <p>You donated ${transactions[1].amount} to {orgsDonatedTo[1].name}</p>
								: <p></p>
						}
						{
							transactions[2] && orgsDonatedTo[2]
								? <p>You donated ${transactions[2].amount} to {orgsDonatedTo[2].name}</p>
								: <p></p>
						}
						<a 
							href="#" 
							data-toggle="modal" 
							data-target="#exampleModal"
						>View all donation history</a>
					</div>
					<div className="recent-donations">
						<h5>Your Favourite Organizations</h5>
						<ul className="donorFavOrgs">{this._renderFavouriteOrgs()}</ul>
					</div>
				</div>
			</div>
			</div>

			{/*Modal for All Donation History*/}
			<div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		          <div className="modal-dialog" role="document">
		            <div className="modal-content">
		              <div className="modal-header">
		                <h5 className="modal-title" id="exampleModalLabel">Your Donation History</h5>
		                <button type="button" className="close" data-dismiss="modal" aria-label="Close">&times;
		                </button>
		              </div>
		            <div className="modal-body">
		            	<table className="table table-striped table-bordered">
		            		 <thead className="thead-dark">
							    <tr>
							      <th scope="col">Amount</th>
							      <th scope="col">Type</th>
							      <th scope="col">Organization</th>
							      <th scope="col">Date</th>
							    </tr>
							  </thead>
							  <tbody>
							  	{this._renderDonationHistory()}
							  </tbody>
		            	</table>
		            </div>
		          </div>
		        </div>
		      </div>
			</div>
		);

	}
}

function mapStateToProps({ userDonor }) {
	if(userDonor) {
		console.log('User Donor object from Redux Store in mapStateToProps: ', userDonor)
	}
	return { donor: userDonor.donor, 
			 favouriteOrgs: userDonor.favouriteOrgs, 
			 transactions: userDonor.transactions, 
			 orgsDonatedTo: userDonor.orgsDonatedTo,
			 favouriteOrgCampaigns: userDonor.favouriteOrgCampaigns,
			 favouriteOrgUpdates: userDonor.favouriteOrgUpdates 
			}
}

export default connect(mapStateToProps, { fetchDonor })(DonorDashboardPage);