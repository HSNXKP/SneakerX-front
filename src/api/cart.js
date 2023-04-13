import axios from '@/plugins/axios'

export function addCart(token,orderForm) {
	return axios({
		url: 'user/addCart',
		method: 'POST',
		headers: {
			Authorization: token,
		},
		data: {
			...orderForm
		}
	})
}

export function cart(token,userId) {
	return axios({
		url: 'user/cart',
		method: 'GET',
		headers: {
			Authorization: token,
		},
		params: {
			userId
		}
	})
}


export function addQuantity(token,id,userId) {
	return axios({
		url: 'user/addQuantity',
		method: 'GET',
		headers: {
			Authorization: token,
		},
		params: {
			id,
			userId
		}
	})
}

export function downQuantity(token,id,userId) {
	return axios({
		url: 'user/downQuantity',
		method: 'GET',
		headers: {
			Authorization: token,
		},
		params: {
			id,
			userId
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


export function deleteCart(token,id,userId,type) {
	return axios({
		url: 'user/deleteCart',
		method: 'GET',
		headers: {
			Authorization: token,
		},
		params: {
			id,
			userId,
			type
		}
	})
}

export function getCartList(token,userId) {
	return axios({
		url: 'user/getCartListByUserIdIsChecked',
		method: 'GET',
		headers: {
			Authorization: token,
		},
		params: {
			userId,
		}
	})
}

