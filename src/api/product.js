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