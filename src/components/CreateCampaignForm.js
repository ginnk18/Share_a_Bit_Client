import React from 'react';

export default function CreateCampaignForm(props) {

	const {onSubmit = () => {}} = props;

	const handleSubmit = event => {
		event.preventDefault()
		const {currentTarget} = event;
		const fData = new FormData(currentTarget);
		onSubmit({
			name: fData.get('name'),
			endDate: fData.get('endDate'),
			description: fData.get('description')
		})
	}

	return (
		<div className="CreateUpdateForm">
			<form onSubmit={handleSubmit} className="form-group form-create-update">
				<div><label><strong>Name</strong></label></div>
				<input className="form-control" type="text" id="name" name="name" />
				<div><label><strong>End Date</strong></label></div>
				<input type="date" name="endDate" />
				<div><label><strong>Description</strong></label></div>
				<textarea className="form-control" id="description" cols="50" rows="30" name="description"></textarea>
				<div style={{marginTop: '5px'}}>
					<input type="submit" value="Submit" className="btn-success pull-right" />
				</div>
			</form>
		</div>
	);
}