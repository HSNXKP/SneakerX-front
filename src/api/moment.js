import axios from '@/plugins/axios'

export function getMomentListByPageNum(token, id,pageNum) {
	return axios({
		url: 'user/bolgTitleById',
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


export function deleteBlogById(token,id,userId){
	return axios({
		url:'user/deleteBlog',
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

export function saveBlog(token,form,userId) {
	return axios({
		url: 'user/blog',
		method: 'POST',
		headers: {
			Authorization: token,
		},
		data: {
			...form
		},
		params:{
			userId
		}
	})
}

export function getBlogById(token,id,userId){
	return axios({
		url: 'user/blog',
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

export function updateBlog(token,form,userId){
	return axios({
		url: 'user/blog',
		method: 'PUT',
		headers: {
			Authorization: token,
		},
		data: {
			...form
		},
		params:{
			userId
		}
	})
}
