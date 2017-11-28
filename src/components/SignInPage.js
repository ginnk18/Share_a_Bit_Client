import React, { Component } from 'react';
import SignInForm from './SignInForm';
import {Token} from '../lib/requests';
import jwtDecode from 'jwt-decode';

class SignInPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			error: ''
		}

		this.signInUser = this.signInUser.bind(this);
	}

	// componentDidMount() {
	// 	console.log(this.props);
	// }

	signInUser(params) {
		const {onSignIn = () => {}} = this.props;

		Token
			.create(params)
			.then(data => {
				if(!data.error) {
					const {jwt} = data;
					localStorage.setItem('jwt', jwt);
					const user = onSignIn();
					user.type === 'donor'
						? this.props.history.push('/donor_dashboard') 
						: this.props.history.push('/org_dashboard')
				} else {
					this.setState({error: data.error})
				}
			})
	}

	_renderError() {
		return (
			<div className="alert alert-danger">
			{this.state.error}
			</div>
		);
	}

	render() {
		return (
			<div className="SignInPage container">
				{
					this.state.error 
						? this._renderError()
						: <div></div>
				}
				<h3>Sign In</h3>
				<div className="row">
					<SignInForm onSubmit={this.signInUser} />
				</div>
			</div>
		);
	}
}

export default SignInPage;