import axios from '@/plugins/axios'

export function payOrder(orderNumber) {
	return axios({
		url: 'pay',
		method: 'GET',
		params: {
			orderNumber
		}
	})
}