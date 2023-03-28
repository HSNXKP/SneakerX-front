<template>
	<div class="login_container">
		<div class="login_box" v-show="loginWithRegister">
			<!--头像-->
			<a class="avatar_box" >
				<img src="/img/avatar.jpg" @click="goHome" alt="">		
			</a>
			<a class="ui large red right corner label"   @click="toRegister">
				<i class="arrow alternate circle up icon"></i>
			</a>
			<!--登录表单-->
			<el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form">
				<el-form-item prop="username">
					<el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid" 
					placeholder="请输入用户名"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input v-model="loginForm.password" prefix-icon="el-icon-lock" show-password
						@keyup.native.enter="login" placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-form-item class="btns">
					<el-button type="primary" @click="login">登录</el-button>
					<el-button type="info" @click="resetLoginForm">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="register_box"  v-show="!loginWithRegister">
			<!--头像-->
			<a class="avatar_box" @click="goHome">
				<img src="/img/avatar.jpg" alt="">
			</a>
			<a class="ui large red right corner label"   @click="toLogin">
				<i class="arrow alternate circle down icon"></i>
			</a>
			<!--注册表单-->
			<el-form ref="registerFormRef" :model="registerForm" :rules="registerFormRules" class="register_form">
				<el-form-item prop="username">
					<el-input v-model="registerForm.username" prefix-icon="el-icon-user-solid" 
					placeholder="请输入用户名"></el-input>
				</el-form-item>
				<el-form-item prop="nickname">
					<el-input v-model="registerForm.nickname" prefix-icon="el-icon-user" 
					placeholder="请输入昵称"></el-input>
				</el-form-item>
				<el-form-item prop="email">
					<el-input v-model="registerForm.email" prefix-icon="el-icon-message" 
					placeholder="请输入邮箱"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input v-model="registerForm.password" prefix-icon="el-icon-lock" show-password
						@keyup.native.enter="register" placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-form-item class="btns">
					<el-button type="primary" @click="register">注册</el-button>
					<el-button type="info" @click="resetRegisterForm">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import {checkEmail} from "@/common/reg";
import { login,register } from "@/api/login";
import { mapState } from 'vuex'

export default {
	name: "Login",
	data() {
		return {
			loginForm: {
				username: 'admin',
				password: '123456'
			},
			registerForm: {
				username: 'user1',
				nickname: 'user1',
				email: '2979554858@qq.com',
				password: '123456',
			},
			loginFormRules: {
				username: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
				]
			},
			registerFormRules: {
				username: [
					{ required: true, message: '请输入用户名', trigger: 'blur' },
				],
				nickname: [
					{ required: true, message: '请输入昵称', trigger: 'blur' },
				],
				email: [
					{ required: true, message: '请输入邮箱', trigger: 'blur' },
					{validator:checkEmail}
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur' },
				],
			
			},
			loginWithRegister: true
		}
	},
	computed: {
		...mapState(['user'])
	},
	methods: {
		resetLoginForm() {
			this.$refs.loginFormRef.resetFields();
		},
		resetRegisterForm() {
			this.$refs.registerFormRef.resetFields();
		},
		login() {
			this.$refs.loginFormRef.validate(valid => {
				if (valid) {
					login(this.loginForm).then(res => {
						if (res.code === 200) {
							this.msgSuccess(res.msg)	
							window.localStorage.setItem('userInfo', JSON.stringify(res.data.user))
							window.localStorage.setItem('adminToken', res.data.token)
							this.$store.commit('user', res.data.user)
							this.$router.push('/home')
						} else {
							this.msgError(res.msg)
						}
					}).catch(() => {
						this.msgError("请求失败")
					})
				}
			})
		},
		register(){
			this.$refs.registerFormRef.validate(valid =>{
				if(valid){
					register(this.registerForm).then(res =>{
						if(res.code === 200){
							this.msgSuccess(res.msg)
							// 跳转登录页面
							this.toLogin()
						}else{
							this.msgError(res.msg)
						}
					}).catch(() =>{
						this.msgError("请求失败")
					})
				}
			})
		},
		toRegister(){
			this.loginWithRegister = false,
			this.$nextTick(() => {
                this.$refs.registerFormRef.resetFields();
            });
		},
		toLogin(){
			this.loginWithRegister = true,
			this.$nextTick(() => {
                this.$refs.loginFormRef.resetFields();
            });
		},
		goHome(){
			this.$router.push('/home')
		},
	}
}
</script>

<style scoped>
.login_container {
	box-sizing: unset !important;
	height: 100%;
	background-color: #f2f3f5;
}

.login_box {
	width: 450px;
	height: 300px;
	background-color: #fff;
	border-radius: 3px;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}

.register_box {
	width: 450px;
	height: 400px;
	background-color: #fff;
	border-radius: 3px;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}

.login_box .avatar_box {
	height: 130px;
	width: 130px;
	border: 1px solid #eee;
	border-radius: 50%;
	padding: 10px;
	box-shadow: 0 0 10px #ddd;
	position: absolute;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: #fff;
}
.register_box .avatar_box {
	height: 130px;
	width: 130px;
	border: 1px solid #eee;
	border-radius: 50%;
	padding: 10px;
	box-shadow: 0 0 10px #ddd;
	position: absolute;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: #fff;
}


.login_box .avatar_box img {
	width: 100%;
	height: 100%;
	border-radius: 50%;
	background-color: #eee;
}
.register_box .avatar_box img {
	width: 100%;
	height: 100%;
	border-radius: 50%;
	background-color: #eee;
}


.login_form {
	position: absolute;
	bottom: 0;
	width: 100%;
	padding: 0 20px;
	box-sizing: border-box;
}

.register_form {
	position: absolute;
	bottom: 0;
	width: 100%;
	padding: 0 20px;
	box-sizing: border-box;
}

.btns {
	display: flex;
	justify-content: flex-end;
}
</style>