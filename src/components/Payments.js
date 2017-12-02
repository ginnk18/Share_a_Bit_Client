import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { handleToken } from '../actions';

class Payments extends Component {
	render() {
		return (
			<StripeCheckout
				name="Share a Bit" 
				description="$5 for 5 donation credits"
				amount={500} // this is in CENTS in US currency by default
				token={token => this.props.handleToken(token)} // expects a callback function
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
				bitcoin="true"
			>
			<button className="btn-success">Add Credits</button>
			</StripeCheckout>
		);
	}
}

export default connect(null, { handleToken })(Payments);