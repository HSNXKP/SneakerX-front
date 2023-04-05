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
        params: {
            id
        }
	})
}