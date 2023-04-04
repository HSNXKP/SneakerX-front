import axios from '@/plugins/axios'


export function getProductCategories() {
	return axios({
		url: 'productCategories',
		method: 'GET',
	})
}


export function getProductCategory(id) {
	return axios({
		url: 'productCategory',
		method: 'GET',
		params: {
			id
		}
	})
}

