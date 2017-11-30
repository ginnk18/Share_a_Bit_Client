import React from 'react';

export default function DonationToOrganizationForm(props) {

	const {onSubmit = () => {}, orgName, orgId} = props;

	const handleSubmit = event => {
		// this.props.onRequestHide();
		event.preventDefault()
		const {currentTarget} = event;
		const fData = new FormData(currentTarget);
		onSubmit(orgId, {
			amount: fData.get('amount')
		})
	}

	return (
		<div className="DonationToOrganizationForm">
			<p>Remember, 1 credit is equal to $1. Credits donated from this form will
			go directly to {orgName}. If you would like to donate to a specific campaign, please
			select one of the campaign donation buttons below.</p>
			<form className="form-org-donation" onSubmit={handleSubmit}>
				<label>How many credits would you like to donate?</label>
				<input type="number" id="amount" name="amount" step="1" />
				<div style={{marginTop: '5px'}}>
					<input type="submit" value="Donate" className="btn-success pull-right" />
				</div>
			</form>
		</div>
	);
}