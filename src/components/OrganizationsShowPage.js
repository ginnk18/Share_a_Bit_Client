import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrganization } from '../actions';
import { Favourite } from '../lib/requests';

class OrganizationsShowPage extends Component {
	constructor(props) {
		super(props)

		this.state = {
			flash: ''
		}

		this.favourite = this.favourite.bind(this);
	}

	componentDidMount() {
		const { id } = this.props.match.params;
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
							<button className="btn btn-success">Donate to this campaign</button>
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
					<button className="btn btn-success ml-auto">Donate to {org.name}</button>
				</div>
				<h3><strong>Current Campaigns</strong></h3>
				<div className="row">
					{this.renderCampaigns()}
				</div>
			</div>
		);
	}
}

function mapStateToProps({ orgs }, ownProps) {
	console.log('Orgs from store: ', orgs)
	return { org: orgs[0], campaigns: orgs[1], userFavourite: orgs[2] }
}

export default connect(mapStateToProps, { fetchOrganization })(OrganizationsShowPage);

