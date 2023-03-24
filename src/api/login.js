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

export function logOut(token) {
	return axios({
		url: 'user/logOut',
		method: 'POST',
		headers: {
			Authorization: token,
		},
	})
}

export function register(registerForm) {
	return axios({
		url: 'register',
		method: 'POST',
		data: {
			...registerForm
		}
	})
}