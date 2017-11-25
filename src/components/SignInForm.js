import React from 'react';

export default function SignInForm(props) {
	return (
		<form>
	      <div>
	        <label htmlFor='email'>Email</label> <br />
	        <input type='email' id='email' name='email' />
	      </div>

	      <div>
	        <label htmlFor='password'>Password</label> <br />
	        <input type='password' id='password' name='password' />
	      </div>

	      <div>
	        <input className="btn btn-dark" type='submit' value='Sign In'/>
	      </div>
    	</form>
	);
}



