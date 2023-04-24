import axios from '@/plugins/axios'

export function updatePassword(token,updatePasswordForm) {
	return axios({
		url: 'user/updatePassword',
		method: 'POST',
		headers: {
			Authorization: token,
		},
		data: {
			...updatePasswordForm
		}
	})
}


export function getCategoryAndTag(token) {
	return axios({
		url: 'user/categoryAndTag',
		method: 'GET',
		headers: {
			Authorization: token,
		},
	})
}

export function updateUser(token,from) {
	return axios({
		url: 'user/updateUser',
		method: 'POST',
		headers: {
			Authorization: token,
		},
		data:{
			...from
		}
	})
}

export function getUser(token,userId) {
	return axios({
		url: 'user/getUser',
		method: 'GET',
		headers: {
			Authorization: token,
		},
		params:{
			userId
		}
	})
}


export function addFans(token,userId,bloggerId) {
	return axios({
		url: 'user/addFans',
		method: 'GET',
		headers: {
			Authorization: token,
		},
		params:{
			userId,
			bloggerId
		}
	})
}


export function cancelFollow(token,userId,bloggerId) {
	return axios({
		url: 'user/cancelFollow',
		method: 'GET',
		headers: {
			Authorization: token,
		},
		params:{
			userId,
			bloggerId
		}
	})
}



export function isFans(token,userId,bloggerId) {
	return axios({
		url: 'user/isFans',
		method: 'GET',
		headers: {
			Authorization: token,
		},
		params:{
			userId,
			bloggerId
		}
	})
}


export function getProductCollect(token,userId) {
	return axios({
		url: 'user/getProductCollect',
		method: 'GET',
		headers: {
			Authorization: token,
		},
		params: {
            userId
        }
	})
}
