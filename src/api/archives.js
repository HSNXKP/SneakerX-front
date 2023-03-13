import axios from '@/plugins/axios'

export function getArchives(token,id) {
	return axios({
		url: 'archives',
		method: 'GET',
		headers: {
			Authorization: token,
		},
		params: {
			id
		}
	})
}