import axios from '@/plugins/axios'


export function saveAddress(token,form,id) {
	return axios({
		url: 'user/saveAddress',
		method: 'POST',
		headers: {
			Authorization: token,
		},
		data: {
			...form
		},
		// Long 类型必须用params
        params: {
            id
        }
	})
}


export function getAddressList(token,id) {
	return axios({
		url: 'user/getAddressList',
		method: 'GET',
		headers: {
			Authorization: token,
		},
		params: {
            id
        }
	})
}


export function deleteAddress(token,id,userId) {
	return axios({
		url: 'user/deleteAddress',
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

export function changeDefaultAddress(token,id,userId) {
	return axios({
		url: 'user/changeDefaultAddress',
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

