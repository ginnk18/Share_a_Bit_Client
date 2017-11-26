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