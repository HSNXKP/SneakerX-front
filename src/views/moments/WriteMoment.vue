<template>
	<div >
		<el-card>
		<el-empty description="未登录 不能发布动态！"  v-if="this.user == '' " ></el-empty>
    	<div  style="text-align: center" v-else> 
		<h2 class="m-text-500">发布动态 </h2>
		<div class="ui divider"></div>
        <el-form :model="form" :rules="formRules" ref="formRef" label-position="top">
				<!-- 动态标题 -->
					<el-form-item align="left"  label="动态标题" prop="title">
						<el-input v-model="form.title" placeholder="请输入标题"></el-input>
					</el-form-item>
			<!-- 动态描述 -->
			<el-form-item  align="left" label="动态描述" prop="description">
				<mavon-editor ref="md1" @imgAdd="imgAddDescription"  @change="changeDescription" @imgDel="imgDel" style="z-index :1" v-model="form.description"/>
			</el-form-item>

			<!-- 动态正文 -->
			<el-form-item align="left" label="动态内容" prop="content">
				<mavon-editor  ref="md2" @imgAdd="imgAddContent"  @change="changeContent" @imgDel="imgDel"  style="z-index :1" v-model="form.content"/>
			</el-form-item>
				<!--选择你的动态标签  -->
				<el-form-item  align="left" label="请选择发布动态的标签"   prop="tagList">
						<el-select v-model="form.tagList" placeholder="请选择动态标签" :allow-create="true" :filterable="true" :multiple="true" style="width: 100%;">
							<!-- 标签前端做#处理 -->
							<el-option :label="'#'+item.name" :value="item.id" v-for="item in tagList" :key="item.id"></el-option>
						</el-select>
					</el-form-item>
		
			<el-form-item style="text-align: right;">
					<!-- 请选择可见范围 下拉框 -->
				<el-select size="mini" style="margin-right: 10px;" v-model="radio" placeholder="请选择可见范围" >
					<el-option label="所有人可见" :value="1" @click.native="dialogVisible=true"></el-option>
					<el-option label="仅自己可见" :value="2" @click.native="blogStatus"></el-option>
					<el-option label="使用密码可见" :value="3"  @click.native="dialogVisible=true"></el-option>
				</el-select>
				<!-- 添加标签 -->
				<el-button type="primary" size="mini" icon="el-icon-plus" @click="addTagDialog">添加标签</el-button>
				<!-- 提交表单 -->
				<el-button type="primary" size="mini" @click="submit">发布</el-button>
			</el-form-item>
		</el-form>

		<!--请输入动态的密码 对话框-->
		<el-dialog :title="this.radio == 1 ?'评论功能':'设置密码' " width="50%" :visible.sync="dialogVisible" :before-close="dialogVisibleClosed">
			<!--内容主体-->
			<el-form  label-width="80px">
				<el-form-item label="密码" prop="password" v-if="this.radio==3">
					<el-input type="password"  v-model="form.password"></el-input>
				</el-form-item>
				<el-form-item style="float: left;"  label="评论" >
					<el-switch v-model="form.commentEnabled" ></el-switch>
				</el-form-item>
			</el-form>
			<!--底部-->
			<span slot="footer">
				<el-button type="primary"  @click="blogStatus">确 定</el-button>
        		<el-button @click="dialogVisibleClosed" >取 消</el-button>
			</span>
		</el-dialog>
		<!-- 标签回显数据 -->
		<AddTagDialog @successChange="getChangeData($event)"/>
    </div>
	</el-card>
	</div>
</template>

<script>
import {mapState} from "vuex";
import axios from "axios";
import {getCategoryAndTag} from "@/api/user";
import {saveBlog,getBlogById,updateBlog} from "@/api/moment";
import AddTagDialog from "@/components/tag/AddTagDialog";

export default {	
    name:'WriteMoment',
	components: {AddTagDialog},
    data(){
        return{
          categoryList: [],
				tagList: [],
				dialogVisible: false,
				radio: 1,
				form: {
					id:'',
					title: '',
					firstPicture: 'null',
					description: '',
					content: '',
					cate: null,
					tagList: [],
					words: 0,
					readTime: 0,
					views: 0,
					appreciation: false,
					recommend: false,
					commentEnabled: true,
					top: false,
					published: true,
					password: '',
					likes:''
				},
				formRules: {
					title: [{required: true, message: '请输入标题'}],
					tagList: [{required: true, message: '请选择标签'}],
				},
				token: window.localStorage.getItem('adminToken'),
				// base: 'http://localhost:8090/', 
				base:'/api',
				// 服务器环境加/
                apiUrl : '/user/blog/upload',
                // 本都环境不加/
				// apiUrl : 'user/blog/upload',

        }
    },
	computed: {
    ...mapState(['addTagDialogVisible','user']),
    },
		created() {
			this.getData()
			if (this.$route.params.id) {
				this.getBlog(this.$route.params.id)
			}
		},
		mounted() {
			
		},
		methods: {
			addTagDialog(){
				this.$store.commit('addTagDialogVisible',true)
			},
			getData() {
				getCategoryAndTag(this.token).then(res => {
					this.tagList = res.data.tags
				})
			},
			// 获取博客进行编辑
			getBlog(id) {
				const userId =this.user.id
				getBlogById(this.token,id,userId).then(res => {
					if(res.code === 200){
					this.computeCategoryAndTag(res.data)
					this.form = res.data
					this.radio = this.form.published ? (this.form.password !== '' ? 3 : 1) : 2
					}else{
						this.msgError(res.msg)
					}
				
				})
			},
			// 将当前编辑的分类和标签的id存入blog对象中
			computeCategoryAndTag(blog) {
				blog.cate = blog.category.id
				blog.tagList = []
				blog.tags.forEach(item => {
					blog.tagList.push(item.id)
				})
			},
			blogStatus(){
				if (this.radio === 3 && (this.form.password === '' || this.form.password === null)) {
					return this.msgError("密码保护模式必须填写密码！")
				}else{
					if(this.radio === 2 ){
					this.form.published = false
					this.form.password=''			
				}if(this.radio === 1){	
					this.form.published = true
					this.form.password=''
				}
				this.dialogVisible = false
				this.msgSuccess("设置成功")
				}
				
			},
			submit() {
				this.$refs.formRef.validate(valid => {
					if (valid) {
						const userId=this.user.id
						if(this.radio === ''){
					     return this.msgError("请选择动态可见范围")
				         }
						if (this.$route.params.id) {
							this.form.category = null
							this.form.tags = null
							updateBlog(this.token,this.form,userId).then(res => {
								if(res.code === 200){
								this.msgSuccess(res.msg)
								this.$refs.formRef.resetFields()	
								this.$router.push(`/moments/${userId}`)
								}else{
									this.msgError(res.msg)
								}	
								//this.$router.push('/blog/list')
							})
						} else {
							saveBlog(this.token,this.form,userId).then(res => {
								if(res.code === 200){
								this.msgSuccess(res.msg)
								this.$refs.formRef.resetFields()
								this.$router.push(`/moments/${userId}`)
								}else{
									this.msgError(res.msg)
								}
								
							})
						}
					} else {
						return this.msgError('请填写必要的表单项')
					}
				})
			},
			dialogVisibleClosed(){
				this.dialogVisible = false
			},
			imgAddDescription(pos,$file){
                var formdata = new FormData();
                formdata.append('image', $file);
				axios({
	    		url:this.base + this.apiUrl,
	    		method: 'post',
	    		data: formdata,
	   			headers: { 'Content-Type': 'multipart/form-data' ,Authorization: this.token}, //这一步不能丢
	  			}).then((res) => {
                    // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
                    if (res.status === 200) {
						this.$refs.md1.$img2Url(pos, res.data.data);
						this.$forceUpdate();
                    }
                })
			},
			imgAddContent(pos,$file){
				var formdata = new FormData();
				formdata.append('image', $file);
				axios({
	    		url: this.base + this.apiUrl,
	    		method: 'post',
	    		data: formdata,
	   			headers: { 'Content-Type': 'multipart/form-data' ,Authorization: this.token}, //这一步不能丢
	  			}).then((res) => {
					// 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
					if (res.status === 200) {
						this.$refs.md2.$img2Url(pos, res.data.data);
						this.$forceUpdate();
					}
				})
			},
			imgDel(pos){
			},
			changeDescription(value,render){
				this.form.description= render
			},
			changeContent(value,render){
				this.form.content= render
			},
			getChangeData(data){
				if(data === 'success'){
					this.getData()
				}
			}

		}
    
}
</script>

<style scoped>

</style>