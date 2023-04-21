import axios from '@/plugins/axios'

export function getProductById(id) {
	return axios({
		url: 'getProductById',
		method: 'GET',
		params: {
            id
        }
	})
}




export function collectProduct(token,userId,productId) {
	return axios({
		url: 'user/collectProduct',
		method: 'GET',
		headers: {
			Authorization: token,
		},
		params:{
			userId,
			productId
		}
	})
}


export function cancelCollectProduct(token,userId,productId) {
	return axios({
		url: 'user/cancelCollectProduct',
		method: 'GET',
		headers: {
			Authorization: token,
		},
		params:{
			userId,
			productId
		}
	})
}


export function isCollectProduct(token,userId,productId) {
	return axios({
		url: 'user/isCollectProduct',
		method: 'GET',
		headers: {
			Authorization: token,
		},
		params:{
			userId,
			productId
		}
	})
}


