<template>
  <div>
	<div v-if="user!= ''">
		<el-card style="margin-bottom: 5px;">
			<!-- <div  class="ui   label" :class="user.flagColor" >{{ user.userFlag }}</div> -->
			<div style="display:flex">
				<el-upload
			 :action="base + apiUrl"
			 :show-file-list="false"
			 :on-success="handleAvatarSuccess"
			 :before-upload="beforeAvatarUpload"
			 :headers="headers"
			 :data="{
				userId: user.id
			 }"
			 >
			 <a href="javascript:;" ><img  class="avatar"  :src="user.avatar" /></a>
			</el-upload>
			<div> 
				<h4   class="m-text-500 nickname" >{{ user.nickname }} <div  class="ui  left pointing label" :class="user.flagColor" >{{ user.userFlag }}</div></h4>
				<div class="fans">
						粉丝：{{ user.fans }}
						关注：{{ user.follow }}
				</div>
				<div class="product">
						<a href="javascript:;" @click="toProductCollect">
							<i class="el-icon-star-off"></i>商品收藏
						</a>
				</div>
			</div>
			</div>
      </el-card>
      <el-card style="margin-top:10px">
		<h3  class="m-text-500">个人资料卡</h3>
        <el-form label-width="80px">
          <el-form-item label="用户姓名">
            <el-input v-model="form.username"  disabled size="mini"></el-input>
          </el-form-item>
		  <el-form-item label="用户昵称">
            <el-input v-model="form.nickname" size="mini"></el-input>
          </el-form-item>
		  <el-form-item label="用户邮箱">
            <el-input v-model="form.email" size="mini"></el-input>
          </el-form-item>
		  <el-form-item label="评论前戳">
            <el-input v-model="form.userFlag" size="mini"></el-input>
          </el-form-item>
		  <el-form-item label="前戳颜色">
					<el-select v-model="form.flagColor" placeholder="请选择颜色" :clearable="true" size="mini" style="width: 100%">
						<el-option v-for="item in colors" :key="item.value" :label="item.label" :value="item.value">
							<span style="float: left; width: 100px;">{{ item.label }}</span>
							<span style="float: left; width: 100px; height: inherit" :class="`me-${item.value}`"></span>
							<span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
						</el-option>
					</el-select>
				</el-form-item>
		  <el-form-item label="个性签名">
   		 <el-input type="textarea" v-model="form.userSign"></el-input>
 		 </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateUser" style="float:right" size="mini">保存</el-button>
	        </el-form-item>
        </el-form>
      </el-card>
	</div>
	<div v-else>
		<el-card>
			<h2 class="m-text-500" style="text-align: center">个人信息</h2>
			<el-empty description="未登录 不能查看个人信息呦"></el-empty>
		</el-card>
	</div>
	
  </div>
</template>

<script>
import { mapState } from "vuex";
import {updateUser ,getUser} from "@/api/user";

export default {
  name: "UserInfo",
  data() {
    return {
		form: {
		  id:'',
          username: '',
		  nickname:'',
		  email:'',
		  userFlag:'',
		  flagColor:'',
		  userSign:''
        },
		colors: [
		{label: '红色', value: 'red'},
		{label: '橘黄', value: 'orange'},
		{label: '黄色', value: 'yellow'},
		{label: '橄榄绿', value: 'olive'},
		{label: '纯绿', value: 'green'},
		{label: '水鸭蓝', value: 'teal'},
		{label: '纯蓝', value: 'blue'},
		{label: '紫罗兰', value: 'violet'},
		{label: '紫色', value: 'purple'},
		{label: '粉红', value: 'pink'},
		{label: '棕色', value: 'brown'},
		{label: '灰色', value: 'grey'},
		{label: '黑色', value: 'black'},
		],
		// base: 'http://localhost:8090/admin/',
		base:'/api',
		// 服务器环境加/
		apiUrl : '/user/uploadAvatarImage',
		// 本都环境不加/
		// apiUrl : 'user/uploadAvatarImage',
		headers: {
			Authorization: window.localStorage.getItem('adminToken')
		},
	}
  },
  computed: {
    ...mapState(["user"]),
  },
 created(){
	this.getUser()
 },
  methods: {
	updateUser() {
		const token = window.localStorage.getItem('adminToken')
		updateUser(token,this.form).then(res => {
					if (res.code === 200) {
						this.msgSuccess(res.msg)
						this.getUser()
					} else {
						this.msgError(res.msg)
					}
				}).catch(() => {
					this.msgError("请求失败")
				})
      },
	  getUser() {
		const token = window.localStorage.getItem('adminToken')
		const userId = this.user.id
		getUser(token,userId).then(res => {
					if (res.code === 200) {
						this.form=res.data
						this.$store.commit('user', res.data)
					} else {
						this.msgError(res.msg)
					}
				}).catch(() => {
					this.msgError("请求失败")
				})
    	},
		toProductCollect(){
			this.$router.push('/productCollect')
		},
		handleAvatarSuccess(res,file) {
			if (res.code === 200) {
				this.getUser()
			}
      	},
      	beforeAvatarUpload(file) {
			if(this.user === ''){
				this.$message.error('请先登录!');
				return false;
			}
      	    const isJPG = file.type === 'image/jpeg';
		    const isPNG = file.type === 'image/png';
			const isWebp = file.type === 'image/webp';
      	    const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG && !isPNG && !isWebp) {
			this.$message.error('上传头像图片格式错误!');
			return false;
        }
        if (!isLt2M) {
			this.$message.error('上传头像图片大小不能超过 2MB!');
			return false;
        }
      },
    }
};
</script>

<style scoped>


.userInfo{
  font-size: 12px;
  margin-left: 10px;
  color: #999;
}
.avatar {
  height: 90px;
  width: 90px;
  border-radius: 50%;
}
.fans{
  margin-left: 8px;
  margin-top: 6px;
  font-size: 12px;
  color: #999;
}
.nickname{
	margin-bottom: 0px;
	margin-top: 1px;
	margin-left: 4px;
}
.product{
	margin-left: 8px;
  	margin-top: 6px;
  	font-size: 12px;
  	color: #999;
}

</style>