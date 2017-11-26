import axios from 'axios';

export const FETCH_ORGANIZATIONS = 'fetch_organizations';

const ROOT_URL = 'http://localhost:3000/api';

export function fetchOrganizations() {
	const request = axios.get(`${ROOT_URL}/organizations`);
	console.log(request);
	return {
		type: FETCH_ORGANIZATIONS,
		payload: request
	};
}