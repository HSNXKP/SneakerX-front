import axios from '@/plugins/axios'

export function login(loginForm) {
	return axios({
		url: 'login',
		method: 'POST',
		data: {
			...loginForm
		}
	})
}

export function logOut() {
	return axios({
		url: 'logOut',
		method: 'POST'
	})
}