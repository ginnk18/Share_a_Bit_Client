import React from 'react';

export default function DonationToCampaignForm(props) {

	const {onSubmit = () => {}, orgId, campaignId} = props;

	const handleSubmit = event => {
		// this.props.onRequestHide();
		event.preventDefault()
		const {currentTarget} = event;
		const fData = new FormData(currentTarget);
		console.log(fData.get('type'))
		onSubmit(campaignId, orgId, {
			type: fData.get('type'),
			amount: fData.get('amount')
		})
	}

	return (
		<div className="DonationToCampaignForm">
			<p>Remember, 1 credit is equal to $1. Credits donated from this form will
			go directly to this campaign.</p>
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