import axios from '@/plugins/axios'

export function getProductSizeWithPriceByProductId(id) {
	return axios({
		url: 'getProductSizeWithPrice',
		method: 'GET',
		params: {
            id
        }
	})
}



