import axios from '@/plugins/axios'

export function getBlogListByTagName(tagName, pageNum) {
	return axios({
		url: 'tag',
		method: 'GET',
		params: {
			tagName,
			pageNum
		}
	})
}

export function addTag(token,addTagForm){
	return axios({
		url: 'user/addTag',
		method: 'POST',
		headers: {
			Authorization: token,
		},
		data: {
			...addTagForm
		}
	})
}

export function getAllTags(){
	return axios({
		url: 'user/tags',
		method: 'GET',
		headers: {
			Authorization: token,
		}
	})
}