import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrgUser } from '../actions';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import CreateUpdateForm from './CreateUpdateForm';
import { Organization } from '../lib/requests';

class OrgDashboardPage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			flash: ''
		}

		this.createUpdate = this.createUpdate.bind(this);
	}

	_renderFlashMessage() {
		return (
			<div className="alert alert-success alert-dismissible fade show" role="alert">
				{this.state.flash}
			</div>
		);
	}

	clearFlash() {
		this.setState({flash: ''})
	}

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
				<tr key={transaction.id}>
					<td>${transaction.amount}</td>
					<td>{transaction.type}</td>
					<td><a href="#">{this.props.donors[count].firstName} {this.props.donors[count].lastName}</a></td>
					<td>{dateFormat}</td>
				</tr>
			);
		})
	}

	_renderRecentBenefactions() {
		const {transactions, donors} = this.props;
		const recentTransactions = [transactions[0], transactions[1], transactions[2]]
		let count = -1;
		return _.map(recentTransactions, transaction => {
			const transactionDate = new Date(transaction.created_at)
			let year = transactionDate.getFullYear()+"";
			let month = (transactionDate.getMonth()+1)+"";
			let day = transactionDate.getDate()+"";
			let dateFormat = year + '-' + month + '-' + day;
			count += 1;
			return (
				<div>
				<p>You received ${transaction.amount} on {dateFormat}</p>
				<p>From: <a href="#">{donors[count].firstName} {donors[count].lastName}</a>
				<p>Type: {transaction.type}</p>
				<button className="btn-success align-self-start ml-2">Send Thanks</button></p>
				</div>
			);
		})
	}

	_renderFreqDonorList() {
		const { freqDonorTransactions, mostFreqDonors } = this.props;
		let count = -1;
		return _.map(mostFreqDonors, mostFreqDonor => {
			count += 1;
			return (
				<li className="donation-history-list-item">
					<span><a href="#">{mostFreqDonor.firstName} {mostFreqDonor.lastName}</a></span>
					<span>{freqDonorTransactions[count].count} times</span>
				</li>
			);
		})
	}

	_renderUpdateIndex() {
		const { updates } = this.props;

		return _.map(updates, update => {
			const updateDate = new Date(update.created_at)
			let year = updateDate.getFullYear()+"";
			let month = (updateDate.getMonth()+1)+"";
			let day = updateDate.getDate()+"";
			let dateFormat = year + '-' + month + '-' + day;
			return (
				<li className="donation-history-list-item">
					<span><Link onClick={this.clearModal} to={`/updates/${update.id}`}>{update.title}</Link></span>
					<span>{dateFormat}</span>
				</li>
			);
		})
	}
	
	_renderCampaignsAndCredits() {
		const { campaigns } = this.props;

		return _.map(campaigns, campaign => {
			return (
				<tr key={campaign.id}>
					<td>{campaign.name}</td>
					<td>{campaign.credits}</td>
					<td>{campaign.bitcredits}</td>
					<td><button className="btn-success">Payout</button></td>
				</tr>
			);
		})
	}

	clearModal() {
		eval(`$('#updateIndex').modal("toggle")`); 
	}

	createUpdate(params) {
		Organization
			.createUpdate(params)
			.then(data => {
				if(!data.error) {
					this.setState({flash: 'Update Created!'})
					setTimeout(() => {
						this.clearFlash()
					}, 3000)
				} else {
					this.setState({flash: data.error})
				}
			})
	}

	render() {
		const { org, 
				campaigns,
				updates, 
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
			{
	        	this.state.flash 
	        		? this._renderFlashMessage()
	        		: <div></div>
	        }
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
								<h5>Your Recent Updates</h5>
								{
									updates[0]
										? <h6><strong>{updates[0].title}</strong></h6>
										: <h6></h6>
								}
								{
									updates[0]
										? <p>{updates[0].overview.slice(0, 200)}...<Link to={`/updates/${updates[0].id}`}>See More</Link></p>
										: <p>No recent updates</p>
								}
								{
									updates[1]
										? <h6><strong>{updates[1].title}</strong></h6>
										: <h6></h6>
								}
								{
									updates[1]
										? <p>{updates[1].overview.slice(0, 200)}...<Link to={`/updates/${updates[1].id}`}>See More</Link></p>
										: <p></p>
								}
								<a 
									href="#"
									data-toggle="modal"
									data-target="#updateIndex"
								>View All Your Updates</a>
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
								<a 
									href="#"
									data-toggle="modal"
									data-target="#FreqDonorList"
								>View Donor List by Frequency of Donations</a>
							</div>
						</div>
						<div className="col-md-4">
							<div className="row flex-column manage-credits">
								<h5>Manage Your Credits</h5>
								<p>Your General Credits: {org.credits}</p>
								<p>Your General Bitcredits: {org.bitcredits}</p>
								<a
									href="#"
									data-toggle="modal"
									data-target="#campaignCredits"
								>Manage Credits for Your Campaigns</a>
								<button className="btn-success align-self-start">
									Choose your Payout Method
								</button>
							</div>
							<div className="row flex-column manage-donations">
								<h5>Recent Benefactions</h5>
								{this._renderRecentBenefactions()}
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
		            	<CreateUpdateForm onSubmit={this.createUpdate} />
		            </div>
		          </div>
		        </div>
		      </div>

		  {/*Modal For Update Index List*/}
		      <div className="modal fade" id="updateIndex" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		          <div className="modal-dialog" role="document">
		            <div className="modal-content">
		              <div className="modal-header">
		                <h5 className="modal-title" id="updateIndexLabel">Your Updates</h5>
		                <button type="button" className="close" data-dismiss="modal" aria-label="Close">&times;
		                </button>
		              </div>
		            <div className="modal-body">
		            	<ul className="donation-history-list">
		            		<li className="update-index-header">
		            			<span>Title</span>
		            			<span>Date Created</span>
		            		</li>
		            		{this._renderUpdateIndex()}
		            	</ul>
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
		            	<table className="table table-striped table-bordered">
		            		 <thead className="thead-dark">
							    <tr>
							      <th scope="col">Amount</th>
							      <th scope="col">Type</th>
							      <th scope="col">Donor</th>
							      <th scope="col">Date</th>
							    </tr>
							  </thead>
							  <tbody>
							  	{this._renderBenefactionHistory()}
							  </tbody>
		            	</table>
		            </div>
		          </div>
		        </div>
		      </div>

		  	{/*Modal For Displaying All Donors listed by Frequency of Donation*/}
		      <div className="modal fade" id="FreqDonorList" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		          <div className="modal-dialog" role="document">
		            <div className="modal-content">
		              <div className="modal-header">
		                <h5 className="modal-title" id="FreqDonorListLabel">All Donors In Order of Donation Frequency</h5>
		                <button type="button" className="close" data-dismiss="modal" aria-label="Close">&times;
		                </button>
		              </div>
		            <div className="modal-body">
		            	<ul className="donation-history-list">
		            		<li className="donor-frequency-header">
		            			<span>Donor</span>
		            			<span>Donated</span>
		            		</li>
		            		{this._renderFreqDonorList()}
		            	</ul>
		            </div>
		          </div>
		        </div>
		      </div>

		  {/*Modal for Managing Credits for Campaigns*/}
			<div className="modal fade" id="campaignCredits" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		          <div className="modal-dialog" role="document">
		            <div className="modal-content">
		              <div className="modal-header">
		                <h5 className="modal-title" id="campaignCreditsLabel">Manage Credits for Your Campaigns</h5>
		                <button type="button" className="close" data-dismiss="modal" aria-label="Close">&times;
		                </button>
		              </div>
		            <div className="modal-body">
		            	<table className="table table-striped table-bordered">
		            		 <thead className="thead-dark">
							    <tr>
							      <th scope="col">Campaign</th>
							      <th scope="col">Credits</th>
							      <th scope="col">Bitcredits</th>
							      <th scope="col"></th>
							    </tr>
							  </thead>
							  <tbody>
							  	{this._renderCampaignsAndCredits()}
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

function mapStateToProps({ userOrg }) {
	if(userOrg) {
		console.log('mapStateToProps data: ', userOrg);
	}
	return { org: userOrg.organization, 
			 campaigns: userOrg.campaigns,
			 updates: userOrg.updates, 
			 transactions: userOrg.transactions,
			 donors: userOrg.donors,
			 freqDonorTransactions: userOrg.freqDonorTransactions,
			 mostFreqDonors: userOrg.mostFreqDonors }
}

export default connect(mapStateToProps, { fetchOrgUser })(OrgDashboardPage);