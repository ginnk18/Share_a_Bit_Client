import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import DonorDashboardPage from './DonorDashboardPage';

export default function AuthRoute(props) {
	const {
		component: Component,
		isAuthenticated = false,
		render,
		...restProps
	} = props;

	const componentRenderer = typeof render === 'function'
	  ? render
	  : props => <Component {...props} />;

	return (
		<Route {...restProps} 
			render={props => {
				if (isAuthenticated) {
					return componentRenderer(props) 
				} else {
					return <Redirect to={{pathname: '/sign_in'}} />
				}
			}} />
	)
}