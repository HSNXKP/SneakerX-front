import axios from '@/plugins/axios'

// 获取动态列表 用户登陆
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

// 获取动态列表 博主的信息
export function getBolgListAnonymous(id,pageNum) {
	return axios({
		url: 'bolgTitleById',
		method: 'GET',
		params: {
			id,
			pageNum
		}
	})
}



// 获取动态列表 博主的信息
export function getBlogger(bloggerId) {
	return axios({
		url: 'getBlogger',
		method: 'GET',
		params: {
			bloggerId
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
