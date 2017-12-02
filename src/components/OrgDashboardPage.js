import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrgUser } from '../actions';
import _ from 'lodash';

class OrgDashboardPage extends Component {

	componentDidMount() {
		this.props.fetchOrgUser(this.props.userId);
	}

	_renderBenefactionHistory() {
		let count = -1;
		return _.map(this.props.transactions, transaction => {
			const transactionDate = new Date(transaction.created_at)
			let year = transactionDate.getFullYear()+"";
			let month = (transactionDate.getMonth()+1)+"";
			let day = transactionDate.getDate()+"";
			let dateFormat = year + '-' + month + '-' + day;
			count += 1;
			return (
				<li key={transaction.id} className="donation-history-list-item">
				<span>${transaction.amount}</span>
				<span>
					<a href="#">
					{this.props.donors[count].firstName} {this.props.donors[count].lastName}
					</a></span>
				<span>{dateFormat}</span>
				</li>
			);
		})
	}

	_renderRecentBenefactions() {
		const {transactions} = this.props;
		const recentTransactions = [transactions[0], transactions[1], transactions[2]]

		return _.map(recentTransactions, transaction => {
			const transactionDate = new Date(transaction.created_at)
			let year = transactionDate.getFullYear()+"";
			let month = (transactionDate.getMonth()+1)+"";
			let day = transactionDate.getDate()+"";
			let dateFormat = year + '-' + month + '-' + day;
			return (
				<p>You received ${transaction.amount} on {dateFormat}</p>
			);
		})
	}

	render() {
		const { org, 
				campaigns, 
				transactions, 
				donors,
				freqDonorTransactions,
				mostFreqDonors 
			} = this.props;

		if (!org) {
			return <div>Loading your dashboard...</div>
		}

		eval(`$(function () {
  			$('[data-toggle="popover"]').popover()
		})`)

		return(
			<div className="OrgDashboardPage">
				<h3 className="dashboard-header animated fadeInLeft">Welcome to your dashboard {org.name}</h3>
				<div className="container">
					<div className="row org-dashboard-row animated fadeInUpBig">
						<div className="col-md-4">
							<div className="row justify-content-center create-an-update">
								<button 
									className="btn btn-success"
									data-toggle="modal"
									data-target="#createUpdate"
								>Create an Update</button>
								<a
							className="what-are-credits" 
							href="#"
							data-toggle="popover"
							data-placement="bottom"
							title="Updates"
							data-content="In order to help donors feel informed on how their money is being spent, Share
							a Bit asks that you post updates every once in a while with expense breakdowns and news about
							your successes and goals."
						>What's this?</a>
							</div>
							<div className="row org-updates-section">
								<h5>Your Most Recent Update</h5>
								<a href="#">View All Your Updates</a>
							</div>
						</div>
						<div className="col-md-4">
							<div className="row justify-content-center create-an-update">
								<button 
									className="btn btn-success"
									data-toggle="modal" 
									data-target="#createCampaign"
								>
									Create a New Campaign
								</button>
								<a
							className="what-are-credits" 
							href="#"
							data-toggle="popover"
							data-placement="left"
							title="Campaigns"
							data-content="Here you can post specific campaigns your organization is currently working on
							These campaigns will be displayed on your public page for donors to browse. When sending you credits,
							donors can request that their money go towards a specific campaign of their choosing. We ask that you
							respect the wishes of your donors."
						>What's this?</a>
							</div>
							<div className="row org-campaigns-section">
								<h5>Your Most Recent/Popular Campaign</h5>
								<p>{campaigns[0].name}</p>
								<a href="#">View All Your Campaigns</a>
							</div>
							<div className="row most-freq-donors">
								<h5>Your Most Frequent Donors</h5>
								<p><a href="#">{mostFreqDonors[0].firstName} {mostFreqDonors[0].lastName}</a> has donated {freqDonorTransactions[0].count} times.</p>
								<button className="btn-success mb-2">Send Recognition</button>
								<p><a href="#">{mostFreqDonors[1].firstName} {mostFreqDonors[1].lastName}</a> has donated {freqDonorTransactions[1].count} times.</p>
								<button className="btn-success mb-2">Send Recognition</button>
								<p><a href="#">{mostFreqDonors[2].firstName} {mostFreqDonors[2].lastName}</a> has donated {freqDonorTransactions[2].count} times.</p>
								<button className="btn-success mb-2">Send Recognition</button>
							</div>
						</div>
						<div className="col-md-4">
							<div className="row flex-column manage-credits">
								<h5>Manage Your Credits</h5>
								<p>Your Credits: {org.credits}</p>
								<button className="btn-success align-self-start">
									Choose your Payout Method
								</button>
							</div>
							<div className="row flex-column manage-donations">
								<h5>Recent Benefactions</h5>
								{this._renderRecentBenefactions()}
								<h5>Recent Donors</h5>
								<p><a href="#">{donors[0].firstName} {donors[0].lastName}</a> sent you ${transactions[0].amount}
								<button className="btn-success align-self-start ml-2">Send Thanks</button></p>
								<p><a href="#">{donors[1].firstName} {donors[1].lastName}</a> sent you ${transactions[1].amount}
								<button className="btn-success align-self-start ml-2">Send Thanks</button></p>
								<p><a href="#">{donors[2].firstName} {donors[2].lastName}</a> sent you ${transactions[2].amount}
								<button className="btn-success align-self-start ml-2">Send Thanks</button></p>
								
								<a 
									href="#"
									data-toggle="modal"
									data-target="#benefactionHistory"
								>View all Benefactions and Donors</a>
							</div>
						</div>
					</div>
				</div>

			{/*Modal for Creating a New Campaign*/}
			<div className="modal fade" id="createCampaign" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		          <div className="modal-dialog" role="document">
		            <div className="modal-content">
		              <div className="modal-header">
		                <h5 className="modal-title" id="createCampaignLabel">Create a New Campaign</h5>
		                <button type="button" className="close" data-dismiss="modal" aria-label="Close">&times;
		                </button>
		              </div>
		            <div className="modal-body">
		            	<h1>Successfully inside modal!</h1>
		            </div>
		          </div>
		        </div>
		      </div>

		  	{/*Modal For Creating a New Update*/}
		      <div className="modal fade" id="createUpdate" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		          <div className="modal-dialog" role="document">
		            <div className="modal-content">
		              <div className="modal-header">
		                <h5 className="modal-title" id="createUpdateLabel">Update Your Donors on What You're Doing with their Contributions</h5>
		                <button type="button" className="close" data-dismiss="modal" aria-label="Close">&times;
		                </button>
		              </div>
		            <div className="modal-body">
		            	<h1>Successfully inside modal!</h1>
		            </div>
		          </div>
		        </div>
		      </div>

		  {/*Modal For All Benefaction and Donor History*/}
		      <div className="modal fade" id="benefactionHistory" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		          <div className="modal-dialog" role="document">
		            <div className="modal-content">
		              <div className="modal-header">
		                <h5 className="modal-title" id="benefactionHistoryLabel">Benefaction and Donor History</h5>
		                <button type="button" className="close" data-dismiss="modal" aria-label="Close">&times;
		                </button>
		              </div>
		            <div className="modal-body">
		            	<ul className="donation-history-list">
		            		<li className="donation-history-header">
		            			<span>Amount</span>
		            			<span>Donor</span>
		            			<span>Date</span>
		            		</li>
		            		{this._renderBenefactionHistory()}
		            	</ul>
		            </div>
		          </div>
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
	return { org: userOrg.organization, 
			 campaigns: userOrg.campaigns, 
			 transactions: userOrg.transactions,
			 donors: userOrg.donors,
			 freqDonorTransactions: userOrg.freqDonorTransactions,
			 mostFreqDonors: userOrg.mostFreqDonors }
}

export default connect(mapStateToProps, { fetchOrgUser })(OrgDashboardPage);