import axios from '@/plugins/axios'

export function payOrder(token,orderNumber) {
	return axios({
		url: 'pay',
		method: 'GET',
		headers: {
			Authorization: token,
		},
		params: {
			orderNumber
		}
	})
}