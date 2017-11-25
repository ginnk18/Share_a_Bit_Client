import React, { Component } from 'react';
import SignInForm from './SignInForm';

class SignInPage extends Component {
	render() {
		return (
			<div clasName="SignInPage">
				<h3>Sign In</h3>
				<SignInForm />
			</div>
		);
	}
}

export default SignInPage;