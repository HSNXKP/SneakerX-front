<template>
	<!--标签云-->
	<div class="ui segments m-box no-segments" style="margin-top:0px; margin-bottom:10px">
		<div class="ui   segment"><i class="tags purple  icon"></i>
			<span style="color:purple">
				#热门标签
			</span>
			</div>
		<div class="ui purple segment m-padding-small">
			<router-link :to="`/tag/${tag.name}`" class="ui label m-text-500" :class="tag.color" v-for="(tag,index) in tagList" :key="index">
				<!-- 标签前端做#处理 -->
				{{ '#'+tag.name }}
			</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		name: "Tags",
		props: {
			tagList: {
				type: Array,
				required: true
			},
		},
	}
</script>

<style scoped>
	.secondary.segment {
		padding: 10px;
	}

	.m-padding-small {
		padding: 7px;
	}

	.label {
		margin: 3px !important;
	}
</style>