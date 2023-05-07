import axios from '@/plugins/axios'

export function payOrder(token,orderNumber,orderRemarks) {
	return axios({
		url: 'user/pay',
		method: 'GET',
		headers: {
			Authorization: token,
		},
		params: {
			orderNumber,
			orderRemarks
		}
	})
}

