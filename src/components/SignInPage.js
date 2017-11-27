import React, { Component } from 'react';
import SignInForm from './SignInForm';
import {Token} from '../lib/requests';

class SignInPage extends Component {
	constructor(props) {
		super(props);

		this.signInUser = this.signInUser.bind(this);
	}

	signInUser(params) {
		const {onSignIn = () => {}} = this.props;

		Token
			.create(params)
			.then(data => {
				console.log(data);
				if(!data.error) {
					const {jwt} = data;
					localStorage.setItem('jwt', jwt);
					onSignIn();
					//the history prop is only available to components rendered
					//by the '<Route />' component of react-router-dom
					this.props.history.push('/') // you don't get this w/o react router
				}
			})
	}

	render() {
		return (
			<div className="SignInPage container">
				<h3>Sign In</h3>
				<div className="row">
					<SignInForm onSubmit={this.signInUser} />
				</div>
			</div>
		);
	}
}

export default SignInPage;