import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import DonorDashboardPage from './DonorDashboardPage';

export default function AuthRoute(props) {
	const {
		component: Component,
		isAuthenticated = false,
		...restProps
	} = props;

	return (
		<Route {...restProps} 
			render={props => {
				if (isAuthenticated) {
					return <Component {...props} /> //callback Component! Ooooooo aaaaa
				} else {
					return <Redirect to={{pathname: '/sign_in'}} />
				}
			}} />
	)
}