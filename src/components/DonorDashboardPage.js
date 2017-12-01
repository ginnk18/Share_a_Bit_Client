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
	// bug - only the first org clicked on will go to the correct show page :S 
	//then after the first one is clicked, all the other org links go to that first org
	//show page until I reload the page :S :S :S :S

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
				<li
					key={transaction.id}
					className="donation-history-list-item"
				>
				<span>${transaction.amount}</span>
				<span>{this.props.orgsDonatedTo[count].name}</span>
				<span>{dateFormat}</span>
				</li>
			);
		})
	}

	render() {
		const {donor} = this.props;
		const {favouriteOrgs} = this.props;
		const {transactions} = this.props;
		const {orgsDonatedTo} = this.props;

		if (!donor && !favouriteOrgs && !transactions && !orgsDonatedTo) {
			return <div>Loading your dashboard...</div>
		}

		eval(`$(function () {
  			$('[data-toggle="popover"]').popover()
		})`)
		
		return(
			<div className="DonorDashboardPage">
			<h3 className="dashboard-header animated fadeInLeft">Welcome to your dashboard {donor.firstName}</h3>
			<div className="container">
			<div className="row donor-dashboard-row animated fadeInUpBig">
				<div className="col-md-4">
					<h5>Recent Updates from Your Organizations</h5>
				</div>
				<div className="col-md-4">
					<div className="row flex-column manage-credits">
						<h5>Manage your Credits</h5>
						<p>Your Credits: {donor.credits}</p>
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
							at a time. If you have more questions please call 1-800-401-7890."
						>What are credits?</a>
					</div>
					<div className="row">
						<h5>Browse our new Organizations</h5>
					</div>
				</div>
				<div className="col-md-4">
					<div className="recent-donations">
						<h5>Your Recent donations: </h5>
						<p>You donated ${transactions[0].amount} to {orgsDonatedTo[0].name}</p>
						<p>You donated ${transactions[1].amount} to {orgsDonatedTo[1].name}</p>
						<p>You donated ${transactions[2].amount} to {orgsDonatedTo[2].name}</p>
						<a 
							href="#" 
							data-toggle="modal" 
							data-target="#exampleModal"
						>View all donation history</a>
					</div>
					<div>
						<h5>See what your favourite organizations are up to...</h5>
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
		            	<ul className="donation-history-list">
		            		<li className="donation-history-header">
		            			<span>Amount</span>
		            			<span>Organization</span>
		            			<span>Date</span>
		            		</li>
		              		{this._renderDonationHistory()}
		              	</ul>
		            </div>
		          </div>
		        </div>
		      </div>
			</div>
		);

	}
}

function mapStateToProps({ userDonor }) {
	return { donor: userDonor.donor, favouriteOrgs: userDonor.favouriteOrgs, transactions: userDonor.transactions, orgsDonatedTo: userDonor.orgsDonatedTo }
}

export default connect(mapStateToProps, { fetchDonor })(DonorDashboardPage);