import React from 'react';

export default function DonationToOrganizationForm(props) {

	const {onSubmit = () => {}, orgName, orgId} = props;

	const handleSubmit = event => {
		// this.props.onRequestHide();
		event.preventDefault()
		const {currentTarget} = event;
		const fData = new FormData(currentTarget);
		console.log(fData.get('type'))
		onSubmit(orgId, {
			type: fData.get('type'),
			amount: fData.get('amount')
		})
	}

	return (
		<div className="DonationToOrganizationForm">
			<p>Remember, 1 credit is equal to $1. Credits donated from this form will
			go directly to {orgName}. If you would like to donate to a specific campaign, please
			select one of the campaign donation buttons below.</p>
			<form className="form-org-donation" onSubmit={handleSubmit}>
				<label>Would you like to donate credits or bitcredits?</label>
				<div>
				<select name="type">
  					<option value="credits">Credits</option>
  					<option value="bitcredits">Bitcredits</option>
  				</select>
  				</div>
  				<label>What amount would you like to give?</label>
				<input type="number" id="amount" name="amount" step="1" />
				<div style={{marginTop: '5px'}}>
					<input type="submit" value="Donate" className="btn-success pull-right" />
				</div>
			</form>
		</div>
	);
}