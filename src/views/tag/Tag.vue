<template>
	<div>
		<el-card style="margin-bottom: 10px;">
			<h2 class="m-text-500" style="text-align: center">标签# {{ tagName }} 下的动态</h2>
		</el-card>
		<el-card  v-if="this.blogList.length === 0">
			<el-empty description="该标签下暂无动态 赶快去发布动态吧！"></el-empty>
		</el-card>
		<BlogList :getBlogList="getBlogList" :blogList="blogList" :totalPage="totalPage" v-else/>
		
	</div>
</template>

<script>
	import BlogList from "@/components/blog/BlogList";
	import {getBlogListByTagName} from "@/api/tag";

	export default {
		name: "Tag",
		components: {BlogList},
		data() {
			return {
				blogList: [],
				totalPage: 0
			}
		},
		watch: {
			//在当前组件被重用时，要重新获取博客列表
			'$route.fullPath'() {
				if (this.$route.name === 'tag') {
					this.getBlogList()
				}
			}
		},
		created() {
			this.getBlogList()
			console.log(this.blogList)
		},
		computed: {
			tagName() {
				return this.$route.params.name
			}
		},
		methods: {
			getBlogList(pageNum) {
				getBlogListByTagName(this.tagName, pageNum).then(res => {
					if (res.code === 200) {
						this.blogList = res.data.list
						this.totalPage = res.data.totalPage
						this.$nextTick(() => {
							Prism.highlightAll()
						})
					} else {
						this.msgError(res.msg)
					}
				}).catch(() => {
					this.msgError("请求失败")
				})
			}
		}
	}
</script>

<style scoped>
</style>