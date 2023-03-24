import axios from '@/plugins/axios'

export function updatePassword(token,updatePasswordForm) {
	return axios({
		url: 'user/updatePassword',
		method: 'POST',
		headers: {
			Authorization: token,
		},
		data: {
			...updatePasswordForm
		}
	})
}