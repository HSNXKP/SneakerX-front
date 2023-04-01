<template>
	<div>
		<div class="ui padded attached segment m-padded-tb-large">
			<div class="ui large red right corner label" v-if="blog.top">
				<i class="arrow alternate circle up icon"></i>
			</div>
			<div class="ui middle aligned mobile reversed stackable">
				<div class="ui grid m-margin-lr">
					<!--标题-->
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
								<i class="small user icon"></i><span>{{ user.username }}</span>
							</div>
							<!-- 点赞 -->
							<div class="item m-common-grey">
								<a @click="like(blog.id)">
									<i class="small  like icon" :class="isLike(blog.id)?'like-color':'like'" ></i><span>{{ blog.likes === 0 ? '': blog.likes }}</span>
								</a>
			
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
							<a class="item m-common-black" @click.prevent="changeFocusMode">
								<div data-inverted="" data-tooltip="专注模式" data-position="top center">
									<i class="book icon"></i>
								</div>
							</a>
						</div>
					</div>
					<!--分类-->
					<router-link :to="`/category/${blog.category.name}`" class="ui orange large ribbon label" v-if="blog.category">
						<i class="small  icon">
							<svg t="1680324714497" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2727" xmlns:xlink="http://www.w3.org/1999/xlink" width="10" height="10">
								<path d="M134.12352 549.12L42.24 650.24v103.68l32 58.88 158.72-87.04" fill="#FFFFFF" p-id="2728"></path><path d="M943.29344 313.05728l40.18688 69.62688L98.16064 893.9008l-40.2176-69.62688 180.2752-104.0896 595.13344-343.63392 109.94176-63.49312z" fill="#FF4893" p-id="2729"></path><path d="M943.29344 313.05728l-109.94176 63.488c-37.46816-64.99328-35.99872-141.81376-2.74944-203.2896 40.2176 33.09056 79.18592 81.77664 112.6912 139.8016z" fill="#FFB578" p-id="2730"></path><path d="M833.35168 376.54528L238.21824 720.18432l-2.01216-3.51744-62.59712-108.40576 240.82432-366.39744c26.31168 33.18272 66.944 54.25152 111.98976 54.25152 2.36544 0 4.73088-0.03072 7.12704-0.15872 78.92992-3.83488 139.8016-70.9376 135.93088-149.8368l0.70144-6.26688c48.59392-28.03712 105.65632-11.73504 160.41984 33.408-33.24416 61.47072-34.71872 138.2912 2.74944 203.28448z" fill="#5FCEFF" p-id="2731"></path><path d="M414.42816 241.86368l-240.82432 366.39744-39.48032-68.38272 249.58464-379.85792a142.31552 142.31552 0 0 0 30.72 81.8432z" fill="#FFB578" p-id="2732"></path><path d="M943.31904 335.4368a22.3744 22.3744 0 0 1-19.39968-11.1872c-32.55808-56.38144-69.73952-102.62016-107.53024-133.7088-35.56352-29.312-87.8336-58.52672-135.01952-31.3088a22.37952 22.37952 0 0 1-22.36928-38.76352c54.144-31.24224 120.1408-18.63168 185.83552 35.52256 41.87136 34.44736 82.62144 84.89472 117.8368 145.87904a22.38464 22.38464 0 0 1-19.3536 33.56672z m-885.3504 511.21664a22.36416 22.36416 0 0 1-19.39968-11.19232c-30.80704-53.35552-38.99392-115.50208-23.05536-174.99136 15.93856-59.48928 54.0928-109.20448 107.43296-139.9808a22.3744 22.3744 0 0 1 22.36416 38.76864c-42.9824 24.79616-73.728 64.84992-86.56896 112.78848-12.84608 47.94368-6.24128 98.02752 18.5856 141.0304a22.37952 22.37952 0 0 1-19.35872 33.57696z" fill="#4F46A3" p-id="2733"></path><path d="M134.10304 562.25792a22.3744 22.3744 0 0 1-18.67776-34.66752l249.57952-379.8528a22.3744 22.3744 0 1 1 37.52448 24.3968l-0.11776 0.1792-249.58464 379.85792a22.3744 22.3744 0 0 1-18.72384 10.0864z m-35.92192 354.02752a22.3744 22.3744 0 0 1-19.39968-11.1872l-40.2176-69.62688a22.39488 22.39488 0 0 1 8.18688-30.57664l885.3504-511.21152a22.36928 22.36928 0 0 1 30.57152 8.19712l40.18688 69.62688a22.3744 22.3744 0 0 1-8.192 30.5664L109.34784 913.28a22.28224 22.28224 0 0 1-11.16672 3.00544z m-9.66656-83.82464l17.83296 30.86848 846.5664-488.83712-17.81248-30.86336L88.51456 832.4608z" fill="#4F46A3" p-id="2734"></path><path d="M526.41792 318.4896c-50.70848 0-97.91488-22.86592-129.52064-62.72512-21.56544-27.17696-33.85344-59.91424-35.53792-94.66368a22.3744 22.3744 0 0 1 44.6976-2.2016v0.03584a119.66976 119.66976 0 0 0 25.90208 69.01248c23.07072 29.09696 57.4976 45.78304 94.45376 45.78304 1.9712 0 3.93728-0.02048 5.9392-0.13312 32.3072-1.57184 61.97248-15.58016 83.63008-39.45984a119.81824 119.81824 0 0 0 31.13984-86.9376 22.3744 22.3744 0 0 1 21.25312-23.44448c12.31872-0.63488 22.84032 8.91392 23.44448 21.25824 2.16576 44.1344-12.99456 86.46656-42.69056 119.19872-29.69088 32.73216-70.35904 51.9424-114.49856 54.08768-2.38592 0.13312-4.95104 0.18944-8.21248 0.18944z m-290.19648 420.5568a22.36416 22.36416 0 0 1-19.39968-11.19232L114.74432 551.0656a22.3744 22.3744 0 1 1 38.7584-22.37952l102.07744 176.78848a22.38464 22.38464 0 0 1-19.35872 33.57184z" fill="#4F46A3" p-id="2735"></path><path d="M173.58848 630.64064a22.37952 22.37952 0 0 1-18.68288-34.67264l240.82432-366.39744a22.3744 22.3744 0 0 1 37.4016 24.58112L192.3072 620.54912a22.3488 22.3488 0 0 1-18.71872 10.09152z m659.78368-231.71072a22.36928 22.36928 0 0 1-19.40992-11.20768c-40.31488-69.9392-41.45664-154.09152-3.04128-225.11104a22.3744 22.3744 0 0 1 39.36768 21.28896c-30.96576 57.25184-30.04928 125.09184 2.45248 181.46816a22.37952 22.37952 0 0 1-19.36896 33.5616z m-349.7728 192.6144a22.28736 22.28736 0 0 1-8.53504-1.69984l-143.86176-59.43296a22.37952 22.37952 0 0 1 17.09056-41.3696l143.86176 59.43296a22.3744 22.3744 0 0 1-8.55552 43.06944z m79.9232-54.3488a22.28736 22.28736 0 0 1-8.53504-1.69984L411.12576 476.06784a22.37952 22.37952 0 0 1 17.09056-41.3696l143.86176 59.43296a22.38464 22.38464 0 0 1-8.55552 43.06432z m89.51296-44.75392a22.28736 22.28736 0 0 1-8.53504-1.69984L500.64384 431.3088a22.37952 22.37952 0 0 1 17.09056-41.3696l143.86176 59.43296a22.38464 22.38464 0 0 1-8.56064 43.06944z" fill="#4F46A3" p-id="2736">
								</path>
							</svg>
						</i><span class="m-text-500">{{ blog.category.name }}</span>
					</router-link>
					<!--文章Markdown正文-->
					<div class="typo js-toc-content m-padded-tb-small match-braces rainbow-braces" v-viewer :class="{'m-big-fontsize':bigFontSize}" v-html="blog.content"></div>
					<!--赞赏-->
					<div style="margin: 2em auto">
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
					</div>
					<!--横线-->
					<el-divider></el-divider>
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
		<div class="ui attached positive message">
			<ul class="list">
				<li>作者：{{ user.username }}
				</li>
				<li>发表时间：{{ blog.createTime | dateFormat('YYYY-MM-DD HH:mm') }}</li>
				<li>最后修改：{{ blog.updateTime | dateFormat('YYYY-MM-DD HH:mm') }}</li>
				<li>本站点采用<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank"> 署名 4.0 国际 (CC BY 4.0) </a>创作共享协议</li>
			</ul>
		</div>
		<!--评论-->
		<div class="ui bottom teal attached segment threaded comments">
			<CommentList :page="0" :blogId="blogId" v-if="blog.commentEnabled"/>
			<h3 class="ui header" v-else>评论已关闭</h3>
		</div>
	</div>
</template>

<script>
	import {getBlogById} from "@/api/blog";
	import CommentList from "@/components/comment/CommentList";
	import {likeMoment} from "@/api/moment";
	import {mapState} from "vuex";
	import {SET_FOCUS_MODE, SET_IS_BLOG_RENDER_COMPLETE} from '@/store/mutations-types';

	export default {
		name: "Blog",
		components: {CommentList},
		data() {
			return {
				blog: {},
				// 因为是层级关系，请求先相应的blog，user列表的username会报一个错误 如果不转换一下的话
				user:{},
				bigFontSize: false,
				//用localStorage本地存储已点赞的动态id数组
				likeMomentIds: JSON.parse(window.localStorage.getItem('likeMomentIds') || '[]'),
			}
		},
		computed: {
			blogId() {
				return parseInt(this.$route.params.id)
			},
			isLike() {
				return function (id) {
					return this.likeMomentIds.indexOf(id) > -1
				}
			},
			...mapState(['siteInfo', 'focusMode','allComment'])
		},
		watch: {
			likeMomentIds(newValue) {
				//将likeMomentIds最新值的json数据保存到localStorage
				window.localStorage.setItem('likeMomentIds', JSON.stringify(newValue))
			}
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
			this.$store.commit(SET_FOCUS_MODE, false)
			// 从文章页面路由到其它页面时，销毁当前组件的同时，要销毁tocbot实例
			// 否则tocbot一直在监听页面滚动事件，而文章页面的锚点已经不存在了，会报"Uncaught TypeError: Cannot read property 'className' of null"
			tocbot.destroy()
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
				this.$store.commit(SET_FOCUS_MODE, false)
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
			changeFocusMode() {
				this.$store.commit(SET_FOCUS_MODE, !this.focusMode)
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
						this.blog.likes++
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
</style>