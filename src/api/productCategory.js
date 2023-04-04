import axios from '@/plugins/axios'


export function getProductCategories() {
	return axios({
		url: 'productCategories',
		method: 'GET',
	})
}