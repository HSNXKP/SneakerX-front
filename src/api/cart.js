import axios from '@/plugins/axios'

export function addCart(token,orderForm) {
	return axios({
		url: 'addCart',
		method: 'POST',
		headers: {
			Authorization: token,
		},
		data: {
			...orderForm
		}
	})
}

export function cart(token,id) {
	return axios({
		url: 'cart',
		method: 'GET',
		headers: {
			Authorization: token,
		},
		params: {
			id
		}
	})
}

