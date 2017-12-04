
// Logging in without redux
const ROOT_URL = 'http://localhost:3000/api';

function getJwt() {
	return localStorage.getItem('jwt');
}

export const Token = {
	create(params) {
		return fetch(
			`${ROOT_URL}/login`,
			{
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(params)
			}
		).then(res => {
			if(res.status === 200) {
				return res.json();
			} else {
				return {error: 'Invalid email or password.'};
			}
		});
	}
}

export const Favourite = {
	create(orgId) {
		return fetch(
			`${ROOT_URL}/organizations/${orgId}/favourites`,
			{
				method: 'POST',
				headers: {'Authorization': `${getJwt()}`, 'Content-Type': 'application/json'}
			}
		).then(res => {
			if(res.status === 200) {
				return res.json();
			} else {
				return {error: 'You already favourited that organization.'};
			}
		})
	}
}

export const Donation = {
	donationToOrg(orgId, params) {
		return fetch(
			`${ROOT_URL}/organizations/${orgId}/donate`,
			{
				method: 'POST',
				headers: {'Authorization': `${getJwt()}`, 'Content-Type': 'application/json'},
				body: JSON.stringify(params)
			}
		).then(res => {
			if(res.status === 200) {
			   eval(`$('#exampleModal').modal("toggle")`); 
				return res.json();
			} else {
				return {error: 'You do not have enough credits to make that donation.'};
			}
		})
	}
}

export const Organization = {
	createUpdate(params) {
		return fetch(
			`${ROOT_URL}/updates`,
			{
				method: 'POST',
				headers: {'Authorization': `${getJwt()}`, 'Content-Type': 'application/json'},
				body: JSON.stringify(params)
			}
		).then(res => {
			if(res.status === 200) {
				eval(`$('#createUpdate').modal("toggle")`);
				return res.json();
			} else {
				return {error: 'Unable to create update.'}
			}
		})
	}
}