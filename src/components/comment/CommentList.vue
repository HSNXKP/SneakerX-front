<template>
	<div>
		<Comment/>
		<Pagination/>
	</div>
</template>

<script>
	import Comment from "./Comment";
	import Pagination from "./Pagination";
	import {SET_COMMENT_QUERY_PAGE, SET_COMMENT_QUERY_BLOG_ID, SET_COMMENT_QUERY_PAGE_NUM, SET_PARENT_COMMENT_ID,SET_COMMENT_QUERY_USER_ID} from "@/store/mutations-types";

	export default {
		name: "CommentList",
		components: {Comment, Pagination},
		props: {
			page: {
				type: Number,
				required: true
			},
			blogId: {
				type: Number,
				required: false
			},
			userId: {
				type: Number,
				required: false
			}
		},
		created() {
			this.init()
		},
		watch: {
			//在博客文章路由到其它含有评论的页面时，要重新获取评论
			'$route.path'() {
				this.init()
			}
		},
		methods: {
			init() {
				//重置评论表单位置
				// 进入评论input的parentId为-1
				this.$store.commit(SET_PARENT_COMMENT_ID, -1)
				// page:0 为普通动态
				this.$store.commit(SET_COMMENT_QUERY_PAGE, this.page)
				// 跳转到blog的时候会携带Blogid
				this.$store.commit(SET_COMMENT_QUERY_BLOG_ID, this.blogId)
				// 私密作品需要携带userId查看评论
				this.$store.commit(SET_COMMENT_QUERY_USER_ID, this.userId ? this.userId : null)
				// 当前页数：1
				this.$store.commit(SET_COMMENT_QUERY_PAGE_NUM, 1)
				// 异步获取评论列表
				this.$store.dispatch('getCommentList')
			}
		}
	}
</script>

<style scoped>

</style>