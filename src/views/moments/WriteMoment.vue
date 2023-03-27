<template>
	<div >
		<el-empty class="ui top segment" description="未登录 不能发布动态！"  v-if="this.user == '' " ></el-empty>
    <div class="ui top segment" style="text-align: center" v-else> 
		<h2 class="m-text-500">发布动态 </h2>
        <el-form :model="form" :rules="formRules" ref="formRef" label-position="top">
			<el-row :gutter="10">
				<el-col :span="12">
					<!-- 动态标题 -->
					<el-form-item align="left"  label="动态标题" prop="title">
						<el-input v-model="form.title" placeholder="请输入标题"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<!--用于动态随机展示图片  -->
					<el-form-item  align="left" label="用于动态随机展示图片" prop="firstPicture">
						<el-input v-model="form.firstPicture" placeholder="请输入图片的URL"></el-input>
					</el-form-item>
				</el-col>
			</el-row>

			<!-- 动态描述 -->
			<el-form-item  align="left" label="动态描述" prop="description">
				<mavon-editor style="z-index :1" v-model="form.description"/>
			</el-form-item>

			<!-- 动态正文 -->
			<el-form-item align="left" label="动态正文" prop="content">
				<mavon-editor style="z-index :1" v-model="form.content"/>
			</el-form-item>

			<el-row :gutter="20">
				<el-col :span="12">
					<!-- 球鞋分类 -->
					<el-form-item align="left" label="球鞋分类" prop="cate">
						<el-select v-model="form.cate" placeholder="请选择球鞋的分类" :allow-create="true" :filterable="true"  style="width: 100%;">
							<el-option :label="item.name" :value="item.id" v-for="item in categoryList" :key="item.id"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">	
					<!--选择你的动态标签  -->
					<el-form-item  align="left" label="请选择发布动态的标签"   prop="tagList">
						<el-select v-model="form.tagList" placeholder="请选择动态标签" :allow-create="true" :filterable="true" :multiple="true" style="width: 100%;">
							<el-option :label="item.name" :value="item.id" v-for="item in tagList" :key="item.id"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
		
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
		<el-dialog :title="this.radio == 1 ?'评论功能':'设置密码' " width="50%" :visible.sync="dialogVisible" :before-close="dialogVisible">
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
        		<el-button @click="dialogVisible" >取 消</el-button>
			</span>
		</el-dialog>
    </div>
		
	</div>
</template>

<script>
import {mapState} from "vuex";
import {getCategoryAndTag} from "@/api/user";
import {saveBlog,getBlogById,updateBlog} from "@/api/moment";

export default {	
    name:'WriteMoment',
    data(){
        return{
          categoryList: [],
				tagList: [],
				dialogVisible: false,
				radio: '',
				form: {
					id:'',
					title: '',
					firstPicture: '',
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
					published: false,
					password: '',
					likes:''
				},
				formRules: {
					title: [{required: true, message: '请输入标题'}],
					firstPicture: [{required: true, message: '请输入首图链接'}],
					cate: [{required: true, message: '请选择分类'}],
					tagList: [{required: true, message: '请选择标签'}],
				},
				token: window.localStorage.getItem('adminToken')
        }
    },
	computed: {
    ...mapState(['addTagDialogVisible','user']),
    },
    watch: {
			'form.words'(newValue) {
				this.form.readTime = newValue ? Math.round(newValue / 200) : null
			},
		},
		created() {
			this.getData()
			if (this.$route.params.id) {
				this.getBlog(this.$route.params.id)
			}
		},
		methods: {
			addTagDialog(){
				this.$store.commit('addTagDialogVisible',true)
			},
			getData() {
				getCategoryAndTag(this.token).then(res => {
					this.categoryList = res.data.categories
					this.tagList = res.data.tags
				})
			},
			// 获取博客进行编辑
			getBlog(id) {
				getBlogById(this.token,id).then(res => {
					this.computeCategoryAndTag(res.data)
					this.form = res.data
					this.radio = this.form.published ? (this.form.password !== '' ? 3 : 1) : 2
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
				}
				// 更新动态以后设置密码为0
				this.form.password=''
				if(this.radio === 2 ){
					this.form.published = false
				}else {	
					this.form.published = true
				}
				this.dialogVisible = false
				this.msgSuccess("设置成功")
			},
			submit() {
				this.$refs.formRef.validate(valid => {
					if (valid) {
						if(this.radio === ''){
					     return this.msgError("请选择动态可见范围")
				         }
						if (this.$route.params.id) {
							this.form.category = null
							this.form.tags = null
							updateBlog(this.token,this.form).then(res => {
								if(res.code === 200){
								this.msgSuccess(res.msg)
								this.$refs.formRef.resetFields()	
								this.$router.push('/moments')
								}else{
									this.msgError(res.msg)
								}	
								//this.$router.push('/blog/list')
							})
						} else {
							this.form.id=this.user.id
							saveBlog(this.token,this.form).then(res => {
								if(res.code === 200){
								this.msgSuccess(res.msg)
								this.$refs.formRef.resetFields()
								this.$router.push('/moments')
								}else{
									this.msgError(res.msg)
								}
								
							})
						}
					} else {
						return this.msgError('请填写必要的表单项')
					}
				})
			}
		}
    
}
</script>

<style scoped>

</style>