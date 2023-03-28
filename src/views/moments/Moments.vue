<template>
	<div>
		<div class="ui top attached segment" style="text-align: center">
			<h2 class="m-text-500">我的动态 </h2>
			
		</div>
		<div class="ui attached segment m-padding-bottom-large">
			<el-empty v-if="this.momentList.length == 0" description="暂无动态 快去发布吧！"></el-empty>
			<div class="moments">
				<div class="moment" v-for="(moment,index) in momentList" :key="index">
					<!-- 头像 -->
					<div class="avatar">
						<img :src="user.avatar">
					</div>
					<div class="ui card">
						<!-- 名字 -->
						<div class="content m-top">
							<!-- 用户名称 -->
							<span style="font-weight: 700">{{ user.nickname }}</span>
							<!-- 时间格式转换 -->
							<span class="right floated" style="margin-right: 10px;">{{ moment.createTime | dateFromNow }}</span>
							<!-- 不公开的情况下加锁 -->
							<span class="ui mini red right corner label" v-if="!moment.isPublished">
								<i class="arrow alternate lock icon"></i>
							
							</span>
							<span class="ui mini red right corner label" v-if="moment.privacy">
								<i class="arrow alternate edit icon"></i>
							</span>
							
						</div>
						<!-- 内容标题 点击进行编辑 -->
						<a class="content typo" @click="toBlog(moment.id)" >{{ moment.title}} </a>
						<!-- 点赞 -->
						<!-- 点击like，传入当前的blogId，后端进行点赞校验，进行前端的点赞校验，监听当前的点赞BlogId 暂存到window.localStore中 -->
						<div class="extra content">
							<a class="left floated">
								<a  @click="like(moment.id)">
								<i class="heart icon" :class="isLike(moment.id)?'like-color':'outline'" ></i>{{ moment.likes === 0?' ':moment.likes }}</a>
								<el-button type="text" size="mini"   icon="el-icon-edit"  @click="editBlog(moment.id)" ></el-button>
								<el-button type="text" size="mini"   icon="el-icon-delete" @click="deleteBlog(moment.id)"   ></el-button>								
							</a>

						</div>
					</div>
				</div>
			</div>
			<!-- 分页 -->
			<el-pagination @current-change="handleCurrentChange" :current-page="pageNum" :page-count="totalPage"
			               layout="prev, pager, next" background hide-on-single-page class="pagination">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import {getMomentListByPageNum, likeMoment,deleteBlogById} from "@/api/moment";
	import {mapState} from "vuex";

	export default {
		name: "Moments",
		data() {
			return {
				//用localStorage本地存储已点赞的动态id数组
				likeMomentIds: JSON.parse(window.localStorage.getItem('likeMomentIds') || '[]'),
				momentList: [],
				pageNum: 1,
				totalPage: 0
			}
		},
		created() {
			this.getMomentList()
		},
		computed: {
			isLike() {
				return function (id) {
					return this.likeMomentIds.indexOf(id) > -1
				}
			},
			...mapState(['user'])
		},
		watch: {
			likeMomentIds(newValue) {
				//将likeMomentIds最新值的json数据保存到localStorage
				window.localStorage.setItem('likeMomentIds', JSON.stringify(newValue))
			}
		},
		methods: {
			getMomentList() {
				//如果有则发送博主身份Token
				const adminToken = window.localStorage.getItem('adminToken')
				const token = adminToken ? adminToken : ''
				var id = this.user.id
				console.log(this.pageNum)
				getMomentListByPageNum(token,id, this.pageNum).then(res => {
					if (res.code === 200) {
						this.momentList = res.data.list
						this.totalPage = res.data.totalPage
						console.log(this.momentList)
					} else {
						this.msgError(res.msg)
					}
				}).catch(() => {
					this.msgError("请求失败")
				})
			},
			handleCurrentChange(newPage) {
				this.scrollToTop()
				this.pageNum = newPage
				this.getMomentList()
			},
			like(id) {
				if (this.likeMomentIds.indexOf(id) > -1) {
					this.$notify({
						title: '不可以重复点赞哦',
						type: 'warning'
					})
					return
				}
				likeMoment(id).then(res => {
					if (res.code === 200) {
						this.$notify({
							title: res.msg,
							type: 'success'
						})
						this.likeMomentIds.push(id)
						this.momentList.forEach(item => {
							if (item.id === id) {
								return item.likes++
							}
						})
					} else {
						this.$notify({
							title: res.msg,
							type: 'warning'
						})
					}
				}).catch(() => {
					this.$notify({
						title: '异常错误',
						type: 'error'
					})
				})
			},
			deleteBlog(id){
				this.$confirm('此操作将永久删除该动态, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					const token = window.localStorage.getItem('adminToken')
					deleteBlogById(token,id).then(res =>{
						if(res.code == 200){
							this.msgSuccess(res.msg)
							this.getMomentList()
						}else{
							this.msgError(res.msg)
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			editBlog(id){
				this.$confirm('此操作修改该动态, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$router.push(`/blog/edit/${id}`)
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消修改'
					});
				});
			},
			toBlog(id){
				this.$router.push(`/blog/${id}`)
			}
		}
	}
</script>

<style scoped>
	.avatar {
		margin-left: -62.5px;
		float: left !important;
	}

	.avatar img {
		height: 45px;
		width: 45px;
		border-radius: 500px;
	}

	.moments {
		margin-left: 26px !important;
		padding-left: 40px !important;
		border-left: 1px solid #dee5e7 !important;
	}

	.moment {
		margin-top: 30px;
	}

	.moment:first-child {
		margin-top: 0 !important;
	}

	.card {
		width: 100% !important;
	}

	.card:before {
		border-width: 0 0 1px 1px !important;
		transform: translateX(-50%) translateY(-50%) rotate(45deg) !important;
		bottom: auto !important;
		right: auto !important;
		top: 22px !important;
		left: 0 !important;
		position: absolute !important;
		content: '' !important;
		background-image: none !important;
		z-index: 2 !important;
		width: 12px !important;
		height: 12px !important;
		transition: background .1s ease !important;
		background-color: inherit !important;
		border-style: solid !important;
		border-color: #d4d4d5 !important;
	}

	.content.m-top {
		padding: 10px 14px !important;
	}

	.content .right.floated {
		font-size: 12px !important;
	}

	.content.typo * {
		font-size: 14px !important;
	}

	.extra.content {
		padding: 5px 14px !important;
	}

	.extra.content a {
		color: rgba(0, 0, 0, 0.7) !important;
		font-size: 12px !important;
	}

	.extra.content a:hover {
		color: red !important;
	}

	.extra.content .like-color {
		color: red !important;
	}

	.extra.content i {
		font-size: 12px !important;
	}

	.pagination {
		text-align: center;
		margin-top: 3em;
	}

	.privacy {
		background: repeating-linear-gradient(145deg, #f2f2f2, #f2f2f2 15px, #fff 0, #fff 30px) !important;
	}
</style>