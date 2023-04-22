<template>
  <div>
		<el-card style="margin-bottom: 5px;">
			<div style="display:flex">
				<el-upload
			 action="http://localhost/uploadAvatarImage"
			 :show-file-list="false"
			 :on-success="handleAvatarSuccess"
			 :before-upload="beforeAvatarUpload"
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
            <el-input v-model="form.username" size="mini"></el-input>
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
</template>

<script>
import { mapState } from "vuex";
import {updateUser ,getUser ,uploadAvatarImage} from "@/api/user";

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
		HOST: process.env.BASE_URL,
		imageUrl: ''
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
			console.log(res)
			this.user.avatar = URL.createObjectURL(file.raw);
      	},
      	beforeAvatarUpload(file) {
      	    const isJPG = file.type === 'image/jpeg';
		    const isPNG = file.type === 'image/png';
      	    const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG && !isPNG ) {
          this.$message.error('上传头像图片只能是 JPG 格式或者 PNG格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M && isPNG;
      },
	  uploadAvatarImage(file) {
		const formatData = new FormData()
		const token = window.localStorage.getItem('adminToken')
		const userId = this.user.id
		formatData.append('file', file)
		formatData.append('token', token)
		formatData.append('userId', userId)
		const instance = Axios.create({
              baseURL: this.HOST
         })
		 instance.post('/uploadAvatarImage', formatData).then(res => {
			return res.data
		})
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