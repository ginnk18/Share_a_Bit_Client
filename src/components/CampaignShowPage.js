import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCampaign } from '../actions';
import DonationToCampaignForm from './DonationToCampaignForm';
import { Donation } from '../lib/requests';

class CampaignShowPage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			flash: ''
		}

		this.donateToCampaign = this.donateToCampaign.bind(this);
	}

	componentDidMount() {
		const { id } = this.props.match.params;
		this.props.fetchCampaign(id);
	}

	donateToCampaign(campaignId, orgId, params) {
		Donation
			.donationToCampaign(campaignId, orgId, params)
			.then(data => {
				if(!data.error) {
					this.props.history.push(`/campaigns/${campaignId}`)
					this.setState({flash: 'Thanks for your donation!'})
					setTimeout(() => {
	      			this.clearFlash()
	    			}, 3000)
				} else {
					this.setState({flash: data.error})
				}
			})
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

	render() {

		const { campaign, org } = this.props;

		if (!campaign) {
			return <div>Loading Campaign...</div>
		}

		const campaignDate = new Date(campaign.created_at)
			let year = campaignDate.getFullYear()+"";
			let month = (campaignDate.getMonth()+1)+"";
			let day = campaignDate.getDate()+"";
			let dateFormat = month + '-' + day + '-' + year;

		const campaignEndDate = new Date(campaign.endDate)
			let year2 = campaignEndDate.getFullYear()+"";
			let month2 = (campaignEndDate.getMonth()+1)+"";
			let day2 = campaignEndDate.getDate()+"";
			let dateFormatEndDate = month2 + '-' + day2 + '-' + year2;

		return (
			<div className="CampaignShowPage container">
			{
	        	this.state.flash 
	        		? this._renderFlashMessage()
	        		: <div></div>
	        }
				<div className="row">
					<div className="col-md-5 update-show-page-title">
						<h1>{campaign.name}</h1>
						<h5><strong>By:</strong> {org.name}</h5>
						<h5><strong>End Date: </strong> {dateFormatEndDate}</h5>
						<h6 className="campaign-created-on"><strong>Created on: </strong>{dateFormat}</h6>
						<button
						className="btn btn-success"
						data-toggle="modal" 
						data-target="#campaignDonationModal"
					>
						Give to this campaign
					</button>
						<img style={{width: '50%', position: 'absolute', bottom: '0'}} className="animated fadeIn" src="/images/earth-leaves.png" />
					</div>
					<div className="col-md-7 update-show-page-overview">
					<p className="lead">{campaign.description.slice(0, 100)}</p>
					<p>{campaign.description.slice(100)}</p>
					</div>
				</div>

				{/*Modal for giving credits to Campaign*/}
				<div className="modal fade" id="campaignDonationModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		          <div className="modal-dialog" role="document">
		            <div className="modal-content">
		              <div className="modal-header">
		                <h5 className="modal-title" id="campaignDonationModalLabel">Give to {campaign.name}</h5>
		                <button type="button" className="close" data-dismiss="modal" aria-label="Close">&times;
		                </button>
		              </div>
		            <div className="modal-body">
		              
		 				<DonationToCampaignForm 
		 					onSubmit={this.donateToCampaign}
		 					campaignId={campaign.id}
		 					orgId={org.id}
		 				/>

		            </div>
		          </div>
		        </div>
		      </div>
			</div>
		);
	}
}

function mapStateToProps({ campaigns }) {
	if(campaigns) {
		console.log(campaigns);
	}
	return { campaign: campaigns.campaign, org: campaigns.organization }
}

export default connect(mapStateToProps, { fetchCampaign })(CampaignShowPage);

