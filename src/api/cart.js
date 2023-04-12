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


export function addQuantity(token,id) {
	return axios({
		url: 'user/addQuantity',
		method: 'GET',
		headers: {
			Authorization: token,
		},
		params: {
			id
		}
	})
}

export function downQuantity(token,id) {
	return axios({
		url: 'user/downQuantity',
		method: 'GET',
		headers: {
			Authorization: token,
		},
		params: {
			id
		}
	})
}

export function changeproductCategoryIdChecked(token,id,type,userId,checked) {
	return axios({
		url: 'user/changeChecked',
		method: 'GET',
		headers: {
			Authorization: token,
		},
		params: {
			id,
			type,
			userId,
			checked
		}
	})
}

export function changeCaetIdChecked(token,id,type,userId,checked) {
	return axios({
		url: 'user/changeChecked',
		method: 'GET',
		headers: {
			Authorization: token,
		},
		params: {
			id,
			type,
			userId,
			checked
		}
	})
}

