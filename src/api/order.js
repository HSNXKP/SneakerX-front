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

export function cancelOrder(token, orderNumber) {
	return axios({
		url: 'cancelOrder',
		method: 'GET',
		headers: {
			Authorization: token,
		},
		params: {
			orderNumber
		}
	})
}

export function getOrder(token, orderNumber) {
	return axios({
		url: `order/${orderNumber}`,
		method: 'POST',
		headers: {
			Authorization: token,
		},
		params: {
			orderNumber
		}
	})
}

export function getOrderList(token, id) {
	return axios({
		url: `getOrder`,
		method: 'GET',
		headers: {
			Authorization: token,
		},
		params: {
			id
		}
	})
}


