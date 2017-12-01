import axios from 'axios';

export const FETCH_ORGANIZATIONS = 'fetch_organizations';
export const FETCH_ORGANIZATION = 'fetch_organization';
export const FETCH_DONOR = 'fetch_donor';
export const FETCH_ORGUSER = 'fetch_orguser';

const ROOT_URL = 'http://localhost:3000/api';

function getJwt() {
	return localStorage.getItem('jwt');
}

export function fetchOrganizations() {
	const request = axios.get(`${ROOT_URL}/organizations`,
					{
						headers: {'Authorization': `${getJwt()}`, 'Content-Type': 'application/json'}
					}
					);
	return {
		type: FETCH_ORGANIZATIONS,
		payload: request
	};
}

export function fetchOrganization(id) {
	const request = axios.get(`${ROOT_URL}/organizations/${id}`,
					{
						headers: {'Authorization': `${getJwt()}`, 'Content-Type': 'application/json'}
					}
					)
	return {
		type: FETCH_ORGANIZATION,
		payload: request
	}
}

export function fetchDonor(id) {
	const request = axios.get(`${ROOT_URL}/users/donor/${id}`)
	console.log('Request inside of fetchDonor action: ', request)
	return {
		type: FETCH_DONOR,
		payload: request
	}
}

//not effing working:

export async function fetchOrgUser(id) {
	const request = await axios.get(`${ROOT_URL}/users/organization/${id}`)
	console.log('Request inside of fetchOrgUser action: ', request)
	return {
		type: FETCH_ORGUSER,
		payload: request
	}
}

//Handling Stripe tokens:

export function handleToken(token) {
	const request = axios.post(`${ROOT_URL}/stripe`,
					token,
					{
						headers: {'Authorization': `${getJwt()}`, 'Content-Type': 'application/json'}
					}
					);
	return {
		type: FETCH_DONOR,
		payload: request
	}
}

///// Attempt at pagination:

// export function fetchOrganizations() {
// 	const request = axios({
// 						method: 'get',
// 						url: `${ROOT_URL}/organizations`,
// 						data: {
// 							limit: 6,
// 							offset: 4
// 						}
// 					});
// 	console.log(request);
// 	return {
// 		type: FETCH_ORGANIZATIONS,
// 		payload: request
// 	};
// }