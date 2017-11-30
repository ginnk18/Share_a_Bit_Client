import React from 'react';

export default function DonationToOrganizationForm(props) {
	return (
		<div className="DonationToOrganizationForm">
			<p>Remember, 1 credit is equal to $1. Credits donated from this form will
			go directly to {props.orgName}. If you would like to donate to a specific campaign, please
			select one of the campaign donation buttons below.</p>
			<label style={{marginRight: '5px'}}>Number of Credits</label>
			<input type="number" id="amount" name="amount" step="1" />
			<div>
				<input type="submit" value="Donate" className="btn-success" />
			</div>
		</div>
	);
}

///

		// <form onSubmit={handleSubmit}>
	 //      <div>
	 //        <label htmlFor='email'>Email</label> <br />
	 //        <input type='email' id='email' name='email' />
	 //      </div>

	 //      <div>
	 //        <label htmlFor='password'>Password</label> <br />
	 //        <input type='password' id='password' name='password' />
	 //      </div>

	 //      <div>
	 //        <input type='submit' value='Sign In'/>
	 //      </div>
  //   	</form>