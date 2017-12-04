import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrganization } from '../actions';
import { Favourite, Donation } from '../lib/requests';
import DonationToOrganizationForm from './DonationToOrganizationForm';

class OrganizationsShowPage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			flash: '',
			error: ''
		}

		this.favourite = this.favourite.bind(this);
		this.donateToOrg = this.donateToOrg.bind(this);
	}

	componentDidMount() {
		const { id } = this.props.match.params;
		console.log(id);
		this.props.fetchOrganization(id);
	}

	renderCampaigns() {
		return _.map(this.props.campaigns, campaign => {

			return (
				<div className="col-md-6" key={campaign.id}>
					<div className="card campaign-item">
						<div className="card-body">
							<div className="card-title">{campaign.name}</div>
							<Link to={`/campaigns/${campaign.id}`}>See Details</Link>
						</div>
					</div>
				</div>
			);
		})
	}

	favourite() {
		Favourite
			.create(this.props.org.id)
			.then(data => {
				if(!data.error) {
					console.log(data);
					// this.setState({flash: data})
				} else {
					console.log(data);
					this.setState({flash: data.error})
				}
			})
	}

	donateToOrg(orgId, params) {
		Donation 
			.donationToOrg(orgId, params)
			.then(data => {
				if(!data.error) {
					this.props.history.push(`/organizations/${orgId}`)
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
		const { org, campaigns, userFavourite } = this.props;

		if (!org || !campaigns) {
			return <div>Loading Non-profit data...</div>
		}

		return (
			<div className="OrganizationsShowPage container">
			{
	        	this.state.flash 
	        		? this._renderFlashMessage()
	        		: <div></div>
	        }
				<Link to="/organizations">Back</Link>
				<div className="row">
					<h2>{org.name}</h2>
					{
						userFavourite
							? <button className="icon-button" onClick={this.favourite}><i className="fa fa-star fa-2x" aria-hidden="true"></i></button>
							: <button className="icon-button" onClick={this.favourite}><i className="fa fa-star-o fa-2x" aria-hidden="true"></i></button>
					}
					
					<p>{org.description}</p>
					<button
						className="btn btn-success ml-auto"
						data-toggle="modal" 
						data-target="#exampleModal"
					>
						Give to {org.name}
					</button>
				</div>
				<h3 className="animated bounceInUp"><strong>Current Campaigns</strong></h3>
				<div className="row animated bounceInUp">
					{this.renderCampaigns()}
				</div>

				<h3 className="mt-4 animated bounceInUp"><strong>Updates from {org.name}</strong></h3>

			{/*Modal for giving credits to Organization*/}
				<div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		          <div className="modal-dialog" role="document">
		            <div className="modal-content">
		              <div className="modal-header">
		                <h5 className="modal-title" id="exampleModalLabel">Give to {org.name}</h5>
		                <button type="button" className="close" data-dismiss="modal" aria-label="Close">&times;
		                </button>
		              </div>
		            <div className="modal-body">
		              
		 				<DonationToOrganizationForm 
		 					onSubmit={this.donateToOrg} 
		 					orgName={org.name} 
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

function mapStateToProps({ orgs }, ownProps) {
	return { org: orgs.organization, campaigns: orgs.campaigns, userFavourite: orgs.userFavourite }
}

export default connect(mapStateToProps, { fetchOrganization })(OrganizationsShowPage);

