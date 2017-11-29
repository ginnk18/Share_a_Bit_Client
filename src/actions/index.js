import axios from 'axios';

export const FETCH_ORGANIZATIONS = 'fetch_organizations';
export const FETCH_ORGANIZATION = 'fetch_organization';
export const FETCH_DONOR = 'fetch_donor';

const ROOT_URL = 'http://localhost:3000/api';

export function fetchOrganizations() {
	const request = axios.get(`${ROOT_URL}/organizations`);
	return {
		type: FETCH_ORGANIZATIONS,
		payload: request
	};
}

export function fetchOrganization(id) {
	const request = axios.get(`${ROOT_URL}/organizations/${id}`)
	return {
		type: FETCH_ORGANIZATION,
		payload: request
	}
}

export function fetchDonor(id) {
	const request = axios.get(`${ROOT_URL}/users/${id}`)
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