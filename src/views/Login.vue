<template>
	<div class="login_container">
		<div class="login_box" v-show="loginWithRegister">
			<!--头像-->
			<h3 class="title">用户登录</h3>
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
				<div class="btns">
					<div class="registerAndLogin">
						<a  href="javascript:;" type="primary"  @click="toRegister" ><i class="el-icon-d-arrow-left"></i>注册</a>
					</div>
					<div>
						<el-button type="primary"  size="mini" @click="login">登录</el-button>
					</div>
				</div>
				
			</el-form>
		</div>
		<div class="register_box"  v-show="!loginWithRegister">
			<!--头像-->
			<h3 class="title">账户注册</h3>
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
				<div class="btns">
					<div  class="registerAndLogin">
						<a  href="javascript:;" type="primary"  @click="toLogin" ><i class="el-icon-d-arrow-left"></i>登录</a>
					</div>
					<div>
						<el-button type="primary" size="mini" @click="register">注册</el-button>
					</div>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script>
import {checkEmail} from "@/common/reg";
import { login,register } from "@/api/login";
import { mapState } from 'vuex'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default {
	name: "Login",
	data() {
		return {
			loginForm: {
				username: 'admin',
				password: '123456'
			},
			registerForm: {
				username: '',
				nickname: '',
				email: '',
				password: '',
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
			NProgress.start()
			this.loginWithRegister = false,
			NProgress.done()
			this.$nextTick(() => {
                this.$refs.registerFormRef.resetFields();
            });
		},
		toLogin(){
			NProgress.start()
			this.loginWithRegister = true,
			NProgress.done()
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
	box-shadow: 0 0 10px #cacaca;
	border-radius: 8px;
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
	box-shadow: 0 0 10px #cacaca;
	border-radius: 8px;
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
	margin-bottom: 20px;
	justify-content: space-between;
}

/* 将a标签居底 */
.registerAndLogin{
	align-self: flex-end;
}

.title {
    margin: 40px auto 40px auto;
    text-align: center
}


</style>