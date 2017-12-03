import React from 'react';

export default function CreateUpdateForm(props) {

	// const {onSubmit = () => {}, orgName, orgId} = props;

	// const handleSubmit = event => {
	// 	// this.props.onRequestHide();
	// 	event.preventDefault()
	// 	const {currentTarget} = event;
	// 	const fData = new FormData(currentTarget);
	// 	onSubmit(orgId, {
	// 		amount: fData.get('amount')
	// 	})
	// }

	return (
		<div className="CreateUpdateForm">
			<form className="form-group form-create-update">
				<div><label><strong>Title</strong></label></div>
				<input className="form-control" type="text" id="title" name="title" />
				<div><label><strong>Overview</strong></label></div>
				<textarea className="form-control" id="overview" cols="50" rows="50" name="overview"></textarea>
				<div style={{marginTop: '5px'}}>
					<input type="submit" value="Submit" className="btn-success pull-right" />
				</div>
			</form>
		</div>
	);
}