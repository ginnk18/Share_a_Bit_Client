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
		return _.map(this.props.orgs, org => {
			return (
				<div key={org.id}>
				<h3>{org.name}</h3>
				<p>{typeof org.description}</p>
				</div>
			);
		})
	}

	render() {
		return (
			<div className="OrganizationsIndexPage">
				<h1>All Organizations</h1>
				{this.renderOrgs()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { orgs: state.orgs }
}

export default connect(mapStateToProps, { fetchOrganizations })(OrganizationsIndexPage);

	// componentDidMount() { 
	// 	this.props.fetchPosts();
	// }

	// renderPosts() {
	// 	return _.map(this.props.posts, post => {
	// 		return (
	// 			<li className="list-group-item" key={post.id}>
	// 				<Link to={`/posts/${post.id}`}>{post.title}</Link>
	// 			</li>
	// 		);
	// 	});
	// }


// function mapStateToProps(state) {
// 	return { posts: state.posts } // user: state.user, token: state.token
// }

// export default connect(mapStateToProps, { fetchPosts })(PostsIndex);