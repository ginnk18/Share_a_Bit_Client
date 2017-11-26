import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchOrganizations } from '../actions';

class OrganizationsIndexPage extends Component {

	componentDidMount() {
		this.props.fetchOrganizations();
	}

	renderOrgs() {
		const styles = {
			orgCard: {
				backgroundImage: 'url("/images/earth-leaves-small.png")',
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
							<p className="card-text">{org.description.slice(0, 200)}...</p>
							<Link to={`/organizations/${org.id}`}>See More</Link>
						</div>
					</div>
				</div>
			);
		})
	}

	render() {
		return (
			<div className="OrganizationsIndexPage container">
				<h1>All Organizations</h1>
				<div className="row">
					{this.renderOrgs()}	
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { orgs: state.orgs }
}

export default connect(mapStateToProps, { fetchOrganizations })(OrganizationsIndexPage);


// <div class="row">
//   <div class="col-sm-6">
//     <div class="card">
//       <div class="card-body">
//         <h4 class="card-title">Special title treatment</h4>
//         <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
//         <a href="#" class="btn btn-primary">Go somewhere</a>
//       </div>
//     </div>
//   </div>