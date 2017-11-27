//From Awesome Answers:

import React from 'react';

function SignInForm(props) {

	const {onSubmit = () => {}} = props;

	const handleSubmit = event => {
		event.preventDefault();
		const {currentTarget} = event;
		const fData = new FormData(currentTarget);
		onSubmit({
			email: fData.get('email'),
			password: fData.get('password')
		})
	}

	return (
		<form onSubmit={handleSubmit}>
	      <div>
	        <label htmlFor='email'>Email</label> <br />
	        <input type='email' id='email' name='email' />
	      </div>

	      <div>
	        <label htmlFor='password'>Password</label> <br />
	        <input type='password' id='password' name='password' />
	      </div>

	      <div>
	        <input type='submit' value='Sign In'/>
	      </div>
    	</form>
	);
}

export default SignInForm;














//With Redux form:

// import React, { Component } from 'react';
// import { Field, reduxForm } from 'redux-form'; 

// class SignInForm extends Component {

// 	renderField(field) {
// 		const { meta: { touched, error } } = field;

// 		const className = `form-group ${touched && error ? 'has-danger' : ''}`;

// 		return (
// 			<div className={className}>
// 				<label>{field.label}</label>
// 				<input
// 				className="form-control"
// 				type={field.type}
// 				{...field.input}
// 				/>
// 				<div className="text-help">
// 					{touched ? error : ''}
// 				</div>
// 			</div>
// 		);
// 	}

// 	render(){
// 		const {onSubmit = () => {}} = this.props;

// 		const handleSubmit = event => {
// 			event.preventDefault();
// 			const {currentTarget} = event;
// 			const fData = new FormData(currentTarget);
// 			onSubmit({
// 				email: fData.get('email'),
// 				password: fData.get('password')
// 			})
// 		}
	
// 		return (
// 			<form onSubmit={handleSubmit}>
// 				<Field
// 					label="Email"
// 					name="email"
// 					type="email"
// 					component={this.renderField}
// 				/>
// 				<Field
// 					label="Password"
// 					name="password"
// 					type="password"
// 					component={this.renderField}
// 				/>
// 				<button type="submit" className="btn btn-success mt-2">Submit</button>
// 			</form>
// 		);
// 	}
// }

// function validate(values) {
// 	const errors = {};

// 	if(!values.email) {
// 		errors.email = 'Enter an email'
// 	}

// 	if(!values.password) {
// 		errors.password = 'Enter a password'
// 	}

// 	return errors;
// }

// export default reduxForm({
// 	validate,
// 	form: 'SignInForm'
// })(SignInForm);


			{/*<form>
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
	    	</form>*/}