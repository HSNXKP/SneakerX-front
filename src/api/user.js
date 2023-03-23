import axios from '@/plugins/axios'

export function updatePassword(updatePasswordForm) {
	return axios({
		url: 'updatePassword',
		method: 'POST',
		data: {
			...updatePasswordForm
		}
	})
}