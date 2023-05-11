<template>
	<div>
		<el-card  v-if="this.blog.id === undefined">
			<el-empty description="未查询到该动态"></el-empty>
		</el-card>
		<div v-else>
			<el-card style="margin-bottom: 5px;">
				<!--标题-->
				<div slot="header" class="clearfix"  v-if="blog.top">
					<a >
						<svg t="1681795251638" style="width: 1.5em!important;height: 1.5em!important;margin-left: 10px; " class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4961" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200">
							<path d="M866.496 128a29.568 29.568 0 0 1 0 59.072H578.304l310.144 344.576a29.568 29.568 0 0 1-21.952 49.28H718.72v285.568a29.568 29.568 0 0 1-29.568 29.504H334.784a29.504 29.504 0 0 1-29.568-29.504V580.928H157.568a29.568 29.568 0 0 1-22.016-49.28l310.144-344.576H157.568a29.568 29.568 0 0 1 0-59.072h708.864zM334.72 521.856c16.32 0 29.504 13.184 29.504 29.504v285.568h295.424V551.36c0-16.32 13.184-29.504 29.504-29.504h110.912L512 201.6 223.872 521.856H334.72z" fill="#d81e06" p-id="4962"></path>
						</svg>
						<svg t="1681798225521" style="width: 1.5em!important;height: 1.5em!important; "  class="icon" viewBox="0 0 1920 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5976" xmlns:xlink="http://www.w3.org/1999/xlink" width="375" height="200">
							<path d="M367.488 667.904l423.744 0 0 47.232-423.744 0 0-47.232Z" p-id="5977" fill="#d81e06"></path><path d="M320.256 204.352l137.28 0 0 68.992-137.28 0 0-68.992Z" p-id="5978" fill="#d81e06"></path><path d="M367.488 754.112l423.744 0 0 48-423.744 0 0-48Z" p-id="5979" fill="#d81e06"></path><path d="M693.76 204.352l137.984 0 0 68.992-137.984 0 0-68.992Z" p-id="5980" fill="#d81e06"></path><path d="M507.008 204.352l137.28 0 0 68.992-137.28 0 0-68.992Z" p-id="5981" fill="#d81e06"></path><path d="M1792.512 0 127.488 0C57.472 0 0 57.152 0 127.616l0 768.768C0 966.72 57.088 1024 127.488 1024l1665.088 0C1862.528 1024 1920 966.848 1920 896.384L1920 127.616C1920 57.216 1862.912 0 1792.512 0zM1264.512 175.104l446.976 0L1711.488 229.12l-216.768 0L1470.72 330.368l206.976 0 0 359.232-57.728 0 0-305.28-289.472 0 0 308.224-57.728 0 0-362.24 140.224 0 20.992-101.248-169.472 0L1264.512 175.104zM268.48 163.904l614.272 0 0 167.232-51.008 0 0-17.28L320.256 313.856l0 17.28L268.48 331.136 268.48 163.904zM947.264 845.632 203.264 845.632l0-43.52 111.744 0L315.008 454.848l229.504 0L544.512 406.144 221.248 406.144 221.248 364.096l323.264 0L544.512 324.352l54.016 0 0 39.744 331.52 0 0 41.984-331.52 0 0 48.768 245.248 0 0 347.264 103.488 0L947.264 845.632zM1150.528 751.104c0 59.52-30.72 89.28-92.224 89.28-25.472 0-46.016-0.512-61.504-1.472-2.496-22.976-6.528-45.248-12.032-66.752 22.976 5.504 46.72 8.256 71.232 8.256 24 0 35.968-11.52 35.968-34.496L1091.968 247.872l-120.768 0L971.2 193.152l278.976 0 0 54.72-99.776 0L1150.4 751.104zM1671.744 872.64c-67.008-55.488-137.28-108.032-210.752-157.504-4.992 9.984-10.496 19.008-16.512 27.008-41.472 57.024-113.28 101.504-215.232 133.504-9.472-16.512-21.504-34.496-35.968-54.016 94.528-27.008 161.28-64.512 200.256-112.512 34.496-44.992 51.776-113.024 51.776-204.032L1445.312 421.12l57.728 0 0 82.496c0 62.528-6.72 115.776-20.224 159.744 84.48 54.016 161.472 107.008 230.976 158.976L1671.744 872.64z" p-id="5982" fill="#d81e06"></path><path d="M367.488 495.36l423.744 0 0 47.232-423.744 0 0-47.232Z" p-id="5983" fill="#d81e06"></path><path d="M367.488 581.632l423.744 0 0 47.232-423.744 0 0-47.232Z" p-id="5984" fill="#d81e06"></path>
						</svg>
						</a>
  				</div>
		<div>
			<div class="ui middle aligned mobile reversed stackable">
				<div class="ui grid m-margin-lr">
				
					<div class="row m-padded-tb-small">
						<h2 class="ui header m-center">{{ blog.title }}</h2>
					</div>
					<!--文章简要信息-->
					<div class="row m-padded-tb-small">
						<div class="ui horizontal link list m-center">
							<!-- 日期 -->
							<div class="item m-datetime">
								<i class="small calendar alternate outline icon"></i><span>{{ blog.createTime | dateFormat('YYYY-MM-DD') }}</span>
							</div>
							<!-- user -->
							<div class="item m-common-black">
								<i class="small user icon"></i><span>{{ user.nickname }}</span>
							</div>
							<!-- 点赞 -->
							<div class="item m-common-grey">
								<!-- 将blog转化为list -->
								<LikeBlog class="likeBlog" :id="blog.id" :likes="blog.likes" :list="[this.blog]" />
							</div>
							<!-- comments -->
							<div class="item m-common-black" >
								<i class="small comment alternate  icon"></i><span>{{ allComment === 0 ? '' : allComment }}</span>
							</div>
							<div class="item m-views">
								<i class="small eye icon"></i><span>{{ blog.views }}</span>
							</div>
							<a class="item m-common-black" @click.prevent="bigFontSize=!bigFontSize">
								<div data-inverted="" data-tooltip="点击切换字体大小" data-position="top center">
									<i class="font icon"></i>
								</div>
							</a>
							<!-- <a class="item m-common-black" @click.prevent="changeFocusMode">
								<div data-inverted="" data-tooltip="专注模式" data-position="top center">
									<i class="book icon"></i>
								</div>
							</a> -->
						</div>
					</div>
					<!--分类-->
					<!-- <router-link :to="`/category/${blog.category.name}`" class="ui orange large ribbon label" v-if="blog.category">
						<i class="small folder open icon"></i><span class="m-text-500">{{ blog.category.name }}</span>
					</router-link> -->
					<!--文章Markdown正文-->
					<div class="typo js-toc-content m-padded-tb-small match-braces rainbow-braces" v-viewer :class="{'m-big-fontsize':bigFontSize}" v-html="blog.content"></div>
					<!--赞赏-->
					<!-- <div style="margin: 2em auto">
						<el-popover placement="top" width="220" trigger="click" v-if="blog.appreciation">
							<div class="ui orange basic label" style="width: 100%">
								<div class="image">
									<div style="font-size: 12px;text-align: center;margin-bottom: 5px;">一毛是鼓励</div>
									<img :src="$store.state.siteInfo.reward" alt="" class="ui rounded bordered image" style="width: 100%">
									<div style="font-size: 12px;text-align: center;margin-top: 5px;">一块是真爱</div>
								</div>
							</div>
							<el-button slot="reference" class="ui orange inverted circular button m-text-500">赞赏</el-button>
						</el-popover>
					</div> -->
					<!--横线-->
					<el-divider ></el-divider>
					<!--标签-->
					<div class="row m-padded-tb-no">
						<div class="column m-padding-left-no">
							<!-- 标签前端做#处理 -->
							<router-link :to="`/tag/${tag.name}`" class="ui tag label m-text-500 m-margin-small" :class="tag.color" v-for="(tag,index) in blog.tags" :key="index">{{ '#'+tag.name }}</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!--博客信息-->
		<!-- <div class="ui attached positive message">
			<ul class="list">
				<li>作者：{{ user.nickname }}
				</li>
				<li>发表时间：{{ blog.createTime | dateFormat('YYYY-MM-DD HH:mm') }}</li>
				<li>最后修改：{{ blog.updateTime | dateFormat('YYYY-MM-DD HH:mm') }}</li>
				<li>本站点采用<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank"> 署名 4.0 国际 (CC BY 4.0) </a>创作共享协议</li>
			</ul>
		</div> -->
	</el-card>
		<!--评论-->
			<el-card  >
				<div class="ui bottom   attached  segment    threaded comments no-segments" >
					<CommentList :page="0" :blogId="blogId" v-if="blog.commentEnabled"/>
					<h3 class="ui header" v-else>评论已关闭</h3>
			</div>
		</el-card>
		</div>
		
	
	</div>
</template>

<script>
	import {getBlogById} from "@/api/blog";
	import CommentList from "@/components/comment/CommentList";
	import LikeBlog from "@/components/blog/LikeBlog";
	import {mapState} from "vuex";
	import {SET_IS_BLOG_RENDER_COMPLETE,SET_BLOGGER} from '@/store/mutations-types';

	export default {
		name: "Blog",
		components: {CommentList,LikeBlog},
		data() {
			return {
				blog: {},
				// 因为是层级关系，请求先相应的blog，user列表的username会报一个错误 如果不转换一下的话
				user:{},
				bigFontSize: false,
			}
		},
		computed: {
			blogId() {
				return parseInt(this.$route.params.id)
			},
			...mapState(['siteInfo', 'focusMode','allComment'])
		},
		watch: {
		},
		beforeRouteEnter(to, from, next) {
			//路由到博客文章页面之前，应将文章的渲染完成状态置为 false
			next(vm => {
				// 当 beforeRouteEnter 钩子执行前，组件实例尚未创建
				// vm 就是当前组件的实例，可以在 next 方法中把 vm 当做 this用
				vm.$store.commit(SET_IS_BLOG_RENDER_COMPLETE, false)
			})
		},
		beforeRouteLeave(to, from, next) {
			// 将vuex中的博主信息删除
			this.$store.commit(SET_BLOGGER, '')
			next()
		},
		beforeRouteUpdate(to, from, next) {
			// 一般有两种情况会触发这个钩子
			// ①当前文章页面跳转到其它文章页面
			// ②点击目录跳转锚点时，路由hash值会改变，导致当前页面会重新加载，这种情况是不希望出现的
			// 在路由 beforeRouteUpdate 中判断路径是否改变
			// 如果跳转到其它页面，to.path!==from.path 就放行 next()
			// 如果是跳转锚点，path不会改变，hash会改变，to.path===from.path, to.hash!==from.path 不放行路由跳转，就能让锚点正常跳转
			if (to.path !== from.path) {
				//在当前组件内路由到其它博客文章时，要重新获取文章
				this.getBlog(to.params.id)
				//只要路由路径有改变，且停留在当前Blog组件内，就把文章的渲染完成状态置为 false
				this.$store.commit(SET_IS_BLOG_RENDER_COMPLETE, false)
				next()
			}
		},
		created() {
			this.getBlog()
		},
		methods: {
			getBlog(id = this.blogId) {
				//密码保护的文章，需要发送密码验证通过后保存在localStorage的Token
				const blogToken = window.localStorage.getItem(`blog${id}`)
				//如果有则发送博主身份Token
				const adminToken = window.localStorage.getItem('adminToken')
				const token = blogToken ? blogToken : (adminToken ? adminToken : '')
				getBlogById(token, id).then(res => {
					if (res.code === 200) {
						this.blog = res.data
						// 因为是层级关系，请求先相应的blog，还没有请求到数据的时候user.username会报一个错误 如果不转换一下的话
						this.user =this.blog.user	
						// 将博主信息保存到vuex中
						this.$store.commit(SET_BLOGGER, this.user)
						document.title = this.blog.title + this.siteInfo.webTitleSuffix
						//v-html渲染完毕后，渲染代码块样式
						this.$nextTick(() => {
							Prism.highlightAll()
							//将文章渲染完成状态置为 true
							this.$store.commit(SET_IS_BLOG_RENDER_COMPLETE, true)
						})
					} else {
						this.msgError(res.msg)
					}
				}).catch(() => {
					this.msgError("请求失败")
				})
			},
		},
		
	}
</script>

<style scoped>
	.el-divider {
		margin: 1rem 0 !important;
	}

	h1::before, h2::before, h3::before, h4::before, h5::before, h6::before {
		display: block;
		content: " ";
		height: 55px;
		margin-top: -55px;
		visibility: hidden;
		
	}
    .m-common-grey .like-color {
		color: red !important;
	}

	/deep/ .el-card__header{
	margin-top: 4px;
	padding: 0 0 0 0 !important;
	height: 25px !important;
}


</style>