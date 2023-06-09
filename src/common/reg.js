export const checkEmail = (rule, value, callback) => {
	const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	if (reg.test(value)) {
		return callback()
	}
	callback(new Error('请输入合法的邮箱'))
}

export const checkUrl = (rule, value, callback) => {
	const reg = /^https?:\/\/([^!@#$%^&*?.\s-]([^!@#$%^&*?.\s]{0,63}[^!@#$%^&*?.\s])?\.)+[a-z]{2,6}\/?/
	if (reg.test(value)) {
		return callback()
	}
	callback(new Error('请输入合法的 URL'))
}

export function checkPhone(rule, value,callback) {
	const reg =/^[1][3-9][0-9]{9}$/
	if (reg.test(value)) {
		return callback()
	}
	callback(new Error('请输入正确的电话号码'))
}

export function checkElevenNumber(rule, value,callback) {
	const reg =/^\d{11}$/
	if (reg.test(value)) {
		return callback()
	}
	callback(new Error('请输入11位纯数字为您的用户名'))
  }