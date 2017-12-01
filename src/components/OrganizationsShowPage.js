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
		// const style = {
		// 	backgroundImage: 'url("/images/leaf.jpg")'
		// }
		return _.map(this.props.campaigns, campaign => {
			return (
				<div className="col-md-6" key={campaign.id}>
					<div className="card campaign-item">
						<div className="card-body">
							<div className="card-title">{campaign.name}</div>
							<button className="btn btn-success">Give credits to this campaign</button>
						</div>
					</div>
				</div>
			);
		})
	}

	favourite() {
		// const id = this.props.org.id
		// console.log(id)
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
					console.log(this.state.flash)
				} else {
					this.setState({error: data.error})
					console.log(this.state.error)
				}
			})
	}

	render() {
		const { org, campaigns, userFavourite } = this.props;

		if (!org || !campaigns) {
			return <div>Loading Non-profit data...</div>
		}

		return (
			<div className="OrganizationsShowPage container">
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
						Give credits to {org.name}
					</button>
				</div>
				<h3><strong>Current Campaigns</strong></h3>
				<div className="row animated bounceInUp">
					{this.renderCampaigns()}
				</div>

			{/*Modal for giving donate to Organization*/}
				<div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		          <div className="modal-dialog" role="document">
		            <div className="modal-content">
		              <div className="modal-header">
		                <h5 className="modal-title" id="exampleModalLabel">Give Credits to {org.name}</h5>
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
	return { org: orgs[0], campaigns: orgs[1], userFavourite: orgs[2] }
}

export default connect(mapStateToProps, { fetchOrganization })(OrganizationsShowPage);

