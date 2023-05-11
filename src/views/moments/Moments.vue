<template>
	<div>
		<el-card>
			<h2 class="m-text-500" style="text-align: center">{{ user.id === blogger.id? '我' : blogger.nickname}}的动态 </h2>
			<div class="ui divider"></div>
		<div >
			<el-empty v-if="this.momentList.length == 0" description="暂无动态 快去发布吧！"></el-empty>
			<div class="moments">
				<div class="moment" v-for="(moment,index) in momentList" :key="index">
					<!-- 头像 -->
					<div class="avatar">
						<img :src="blogger.id === user.id ? user.avatar :blogger.avatar ">
					</div>
					<div class="ui card">
						<!-- 名字 -->
						<div class="content m-top">
							<!-- 用户名称 -->
							<span style="font-weight: 700">{{ blogger.id === user.id ? user.nickname :blogger.nickname }}</span>
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
						<div class="extra content" >
							<a class="left floated" style="display: flex;">
								<LikeBlog class="likeBlog" :id="moment.id" :likes="moment.likes" :list="momentList"  />
								<span v-if="blogger.id === user.id" style="margin-left: 5px;">
								<el-button type="text" size="mini"   icon="el-icon-edit"  @click="editBlog(moment.id)" ></el-button>
								<el-button type="text" size="mini"   icon="el-icon-delete" @click="deleteBlog(moment.id)"   ></el-button>	
								</span>
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
	</el-card>
	</div>
</template>

<script>
	import {getMomentListByPageNum,deleteBlogById,getBolgListAnonymous,getBlogger} from "@/api/moment";
	import {mapState} from "vuex";
	import {SET_BLOGGER} from '@/store/mutations-types';
	import LikeBlog from "@/components/blog/LikeBlog";

	export default {
		name: "Moments",
		components: {LikeBlog},
		data() {
			return {
				momentList: [],
				pageNum: 1,
				totalPage: 0
			}
		},
		created() {
			this.getMomentList()
		},
		computed: {
			...mapState(['user','blogger']),
			bloggerId() {
				return parseInt(this.$route.params.id)
			}
		},
		beforeRouteLeave(to, from, next) {
			// 将vuex中的博主信息删除
			this.$store.commit(SET_BLOGGER, '')
			this.momentList = []
			next()
		},
		methods: {
			getMomentList() {
				if(this.user.id == this.bloggerId){
				// 如果是博主自己则使用userId和Token
				const token = window.localStorage.getItem('adminToken')
				var id = this.user.id
				console.log(this.pageNum)
				getMomentListByPageNum(token,id, this.pageNum).then(res => {
					if (res.code === 200) {
						console.log(res.data)
						this.momentList = res.data.list
						this.totalPage = res.data.totalPage
					} else {
						this.msgError(res.msg)
					}
				}).catch(() => {
					this.msgError("请求失败")
				})
				}else{
				// 当前的bloggerId和userId不相等 或者未登录 访问的是bloggerId
				var id = this.bloggerId
				getBolgListAnonymous(id, this.pageNum).then(res => {
					if (res.code === 200) {
						this.momentList = res.data.list
						this.totalPage = res.data.totalPage
					} else {
						this.msgError(res.msg)
					}
				}).catch(() => {
					this.msgError("请求失败")
				})
				}
				// 通过bloggerId获取博主信息
				getBlogger(id).then(res => {
					if (res.code === 200) {
						this.$store.commit(SET_BLOGGER, res.data)
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
			deleteBlog(id){
				this.$confirm('此操作将永久删除该动态, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					const userId = this.user.id
					const token = window.localStorage.getItem('adminToken')
					deleteBlogById(token,id,userId).then(res =>{
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
	.likeBlog{
		margin-left: 10px;
		display:flex;
		align-items: center;
		justify-content: center;
		margin-left: 0;
	}
</style>