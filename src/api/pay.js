import axios from '@/plugins/axios'

export function payOrder(token,orderNumber,orderRemarks) {
	return axios({
		url: 'pay',
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

