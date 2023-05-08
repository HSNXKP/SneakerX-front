import axios from '@/plugins/axios'

export function order(token, orderForm) {
	return axios({
		url: 'user/order',
		method: 'POST',
		headers: {
			Authorization: token,
		},
		data: {
			...orderForm
		}
	})
}

export function cancelOrder(token, orderNumber,userId) {
	return axios({
		url: 'user/cancelOrder',
		method: 'GET',
		headers: {
			Authorization: token,
		},
		params: {
			orderNumber,
			userId
		}
	})
}

export function getOrder(token, orderNumber,userId) {
	return axios({
		url: `user/order/${orderNumber}`,
		method: 'POST',
		headers: {
			Authorization: token,
		},
		params: {
			orderNumber,
			userId
		}
	})
}

export function getOrderList(token, queryInfo) {
	return axios({
		url: `user/getOrder`,
		method: 'GET',
		headers: {
			Authorization: token,
		},
		params: {
			...queryInfo
		}
	})
}

export function deleteOrderByOrderNumber(token, orderNumber,userId) {
	return axios({
		url: `user/deleteOrderByOrderNumber`,
		method: 'GET',
		headers: {
			Authorization: token,
		},
		params: {
			orderNumber,
			userId
		}
	})
}




export function confirmReceipt(token,orderNumber,userId) {
	return axios({
		url: 'user/confirmReceipt',
		method: 'GET',
		headers: {
			Authorization: token,
		},
		params: {
			orderNumber,
			userId
		}
	})
}

export function requestRefund(token,visForm) {
	return axios({
		url: 'user/requestRefund',
		method: 'POST',
		headers: {
			Authorization: token,
		},
		data: {
			...visForm
		}
	})
}


export function cancelRefund(token,orderNumber,userId) {
	return axios({
		url: 'user/cancelRefund',
		method: 'GET',
		headers: {
			Authorization: token,
		},
		params: {
			orderNumber,
			userId
		}
	})
}


