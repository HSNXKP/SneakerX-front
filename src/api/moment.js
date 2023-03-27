import axios from '@/plugins/axios'

export function getMomentListByPageNum(token, id,pageNum) {
	return axios({
		url: 'bolgTitleById',
		method: 'GET',
		headers: {
			Authorization: token,
		},
		params: {
			id,
			pageNum
		}
	})
}

export function likeMoment(id) {
	return axios({
		url: `moment/likeMoment/${id}`,
		method: 'POST',
	})
}

export function getBlogTitleByUserId(token,pageNum,id) {
	return axios({
		url:'bolgTitleById',
		method: 'GET',
		headers: {
			Authorization: token,
		},
		params: {
			pageNum,
			id
		}
	})
}

export function deleteBlogById(token,id){
	return axios({
		url:'user/deleteBlog',
		method: 'GET',
		headers: {
			Authorization: token,
		},
		params: {
			id
		}
	})
}