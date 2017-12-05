import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrganizations } from '../actions';
import ReactPaginate from 'react-paginate';

class OrganizationsIndexPage extends Component {

	componentDidMount() {
		this.props.fetchOrganizations();
	}

	renderOrgs() {
		const styles = {
			orgCard: {
				backgroundImage: 'url("/images/earth-leaves-small-5.png")',
				color: 'white'
			}
		}
		return _.map(this.props.orgs, org => {
			{/*const description = org.description.slice(0, 50)*/}
			return (
				<div className="col-sm-6" key={org.id}>
					<div className="card org-index-item" style={styles.orgCard}>
						<div className="card-body">
							<h4 className="card-title">{org.name}</h4>
							{
								org.description 
									? <p className="card-text">{org.description.slice(0, 300)}...</p>
									: <p></p>

							}
							<Link to={`/organizations/${org.id}`}>See More</Link>
						</div>
					</div>
				</div>
			);
		})
	}

	render() {

		// if(!this.props.orgs) {
		// 	return <div>Loading...</div>
		// }

		return (
			<div className="OrganizationsIndexPage container">
				<h1>All Organizations</h1>
				<div className="row animated fadeIn">
					{this.renderOrgs()}	
				</div>
			</div>
		);
	}
}

function mapStateToProps({ orgs }) {
	return { orgs: orgs }
}

export default connect(mapStateToProps, { fetchOrganizations })(OrganizationsIndexPage);