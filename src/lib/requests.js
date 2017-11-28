
// Logging in without redux

const ROOT_URL = 'http://localhost:3000/api';

// function getJwt() {
// 	return localStorage.getItem('jwt');
// }

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

