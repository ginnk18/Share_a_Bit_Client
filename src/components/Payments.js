import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';

class Payments extends Component {
	render() {
		return (
			<StripeCheckout 
				amount={500} // this is in CENTS in US currency by default
				token={token => console.log(token)} // expects a callback function
				stripeKey={process.env.REACT_APP_STRIPE_KEY}
			/>
		);
	}
}

export default Payments;