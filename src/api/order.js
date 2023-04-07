import axios from '@/plugins/axios'

export function order(token, orderForm) {
	return axios({
		url: 'order',
		method: 'POST',
		headers: {
			Authorization: token,
		},
		data: {
			...orderForm
		}
	})
}