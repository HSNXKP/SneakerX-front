<template>
	<div>
			<el-card  class="blogTop" style="margin-bottom: 10px;" shadow="hover"  v-for="item in blogList" :key="item.id">
				<div slot="header" class="clearfix"  v-if="item.top">
					<a >
						<svg t="1681795251638" style="width: 1.5em!important;height: 1.5em!important;margin-left: 10px; " class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4961" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200">
							<path d="M866.496 128a29.568 29.568 0 0 1 0 59.072H578.304l310.144 344.576a29.568 29.568 0 0 1-21.952 49.28H718.72v285.568a29.568 29.568 0 0 1-29.568 29.504H334.784a29.504 29.504 0 0 1-29.568-29.504V580.928H157.568a29.568 29.568 0 0 1-22.016-49.28l310.144-344.576H157.568a29.568 29.568 0 0 1 0-59.072h708.864zM334.72 521.856c16.32 0 29.504 13.184 29.504 29.504v285.568h295.424V551.36c0-16.32 13.184-29.504 29.504-29.504h110.912L512 201.6 223.872 521.856H334.72z" fill="#d81e06" p-id="4962"></path>
						</svg>
						<svg t="1681798225521" style="width: 1.5em!important;height: 1.5em!important; "  class="icon" viewBox="0 0 1920 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5976" xmlns:xlink="http://www.w3.org/1999/xlink" width="375" height="200">
							<path d="M367.488 667.904l423.744 0 0 47.232-423.744 0 0-47.232Z" p-id="5977" fill="#d81e06"></path><path d="M320.256 204.352l137.28 0 0 68.992-137.28 0 0-68.992Z" p-id="5978" fill="#d81e06"></path><path d="M367.488 754.112l423.744 0 0 48-423.744 0 0-48Z" p-id="5979" fill="#d81e06"></path><path d="M693.76 204.352l137.984 0 0 68.992-137.984 0 0-68.992Z" p-id="5980" fill="#d81e06"></path><path d="M507.008 204.352l137.28 0 0 68.992-137.28 0 0-68.992Z" p-id="5981" fill="#d81e06"></path><path d="M1792.512 0 127.488 0C57.472 0 0 57.152 0 127.616l0 768.768C0 966.72 57.088 1024 127.488 1024l1665.088 0C1862.528 1024 1920 966.848 1920 896.384L1920 127.616C1920 57.216 1862.912 0 1792.512 0zM1264.512 175.104l446.976 0L1711.488 229.12l-216.768 0L1470.72 330.368l206.976 0 0 359.232-57.728 0 0-305.28-289.472 0 0 308.224-57.728 0 0-362.24 140.224 0 20.992-101.248-169.472 0L1264.512 175.104zM268.48 163.904l614.272 0 0 167.232-51.008 0 0-17.28L320.256 313.856l0 17.28L268.48 331.136 268.48 163.904zM947.264 845.632 203.264 845.632l0-43.52 111.744 0L315.008 454.848l229.504 0L544.512 406.144 221.248 406.144 221.248 364.096l323.264 0L544.512 324.352l54.016 0 0 39.744 331.52 0 0 41.984-331.52 0 0 48.768 245.248 0 0 347.264 103.488 0L947.264 845.632zM1150.528 751.104c0 59.52-30.72 89.28-92.224 89.28-25.472 0-46.016-0.512-61.504-1.472-2.496-22.976-6.528-45.248-12.032-66.752 22.976 5.504 46.72 8.256 71.232 8.256 24 0 35.968-11.52 35.968-34.496L1091.968 247.872l-120.768 0L971.2 193.152l278.976 0 0 54.72-99.776 0L1150.4 751.104zM1671.744 872.64c-67.008-55.488-137.28-108.032-210.752-157.504-4.992 9.984-10.496 19.008-16.512 27.008-41.472 57.024-113.28 101.504-215.232 133.504-9.472-16.512-21.504-34.496-35.968-54.016 94.528-27.008 161.28-64.512 200.256-112.512 34.496-44.992 51.776-113.024 51.776-204.032L1445.312 421.12l57.728 0 0 82.496c0 62.528-6.72 115.776-20.224 159.744 84.48 54.016 161.472 107.008 230.976 158.976L1671.744 872.64z" p-id="5982" fill="#d81e06"></path><path d="M367.488 495.36l423.744 0 0 47.232-423.744 0 0-47.232Z" p-id="5983" fill="#d81e06"></path><path d="M367.488 581.632l423.744 0 0 47.232-423.744 0 0-47.232Z" p-id="5984" fill="#d81e06"></path>
						</svg>
						</a>
  				</div>
			<div class="ui middle aligned mobile reversed stackable">
				<div class="ui grid m-margin-lr">
					<div class="row m-padded-tb-small">
						<div>
							<img class="avatar" src="http://localhost/QQ20221014224335.jpg">
						</div>
						<div class="item m-common-black" style="margin-left:10px">
								<span>{{ item.user.nickname }}</span>
								<div class="dateTimeInfo">
								<span>{{ item.createTime | dateFormat('YYYY-MM-DD')}}</span>
							</div>
						</div>
						<!-- <h2 class="ui header m-center m-scaleup">
							<a href="javascript:;" @click.prevent="toBlog(item)" class="m-black">{{ item.title }}</a>
						</h2> -->
					</div>
					<!--文章简要信息-->
					<!-- <div class="row m-padded-tb-small">
						<div class="ui horizontal link list m-center">
							<div class="item m-datetime">
								<i class="small calendar alternate outline icon"></i><span>{{ item.createTime | dateFormat('YYYY-MM-DD')}}</span>
							</div>
							<div class="item m-common-black">
								<i class="small  user  icon"></i><span>{{ item.user.nickname }}</span>
							</div>
							<div class="item m-common-grey">
								<i class="small red heart  icon" ></i><span>{{ item.likes === 0 ? '' : item.likes }}</span>
							</div>
							<div class="item m-views">
								<i class="small eye icon"></i><span>{{ item.views }}</span>
							</div>
						</div>
					</div> -->
					<!--分类-->
					<!-- <router-link :to="`/category/${item.category.name}`" class="ui orange large ribbon label">
						<i class="small folder open icon"></i><span class="m-text-500">{{ item.category.name }}</span>
					</router-link> -->
					<!--文章Markdown描述-->
					<a href="javascript:;" @click.prevent="toBlog(item)" >
						<div class="typo m-padded-tb-small line-numbers match-braces rainbow-braces" v-html="item.description"></div>
					</a>
					<!--阅读全文按钮-->
					<div class="row m-padded-tb-small m-margin-top">
						<!-- <a href="javascript:;" @click.prevent="toBlog(item)" >
						<div class="typo m-padded-tb-small line-numbers match-braces rainbow-braces" v-html="item.description"></div>
					</a> -->
						<!-- <a href="javascript:;" @click.prevent="toBlog(item)" class="color-btn">阅读全文</a> -->
					</div>
					<!--横线-->
					<div class="ui section divider m-margin-lr-no"></div>
					<!--标签-->
					<!-- 标签前端做#处理 -->
					<div class="row m-padded-tb-no ">
						<div class="column m-padding-left-no">
							<div  class="column ">
								<span class="ui horizontal link list m-padding-left-no" style="margin-top: 4px;">
									<span class="item m-common-grey">
									<i class="small red heart  icon" ></i><span>{{ item.likes === 0 ? '' : item.likes }}</span>
								</span>
								<span class="item m-common-black">
									<i class="small comment alternate  icon"></i><span>{{ allComment === 0 ? '' : allComment }}</span>
								</span>
								<span class="item m-views">
									<i class="small eye icon"></i><span>{{ item.views }}</span>
								</span>
								</span>
								<span style="float: right;">
									<router-link :to="`/tag/${tag.name}`" class="ui tag label m-text-500 m-margin-small" :class="tag.color" v-for="(tag,index) in item.tags" :key="index">{{ '#'+tag.name }}</router-link>
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</el-card>
	
		
	
	</div>
</template>

<script>
	export default {
		name: "BlogItem",
		props: {
			blogList: {
				type: Array,
				required: true
			}
		},
		methods: {
			toBlog(blog) {
				this.$store.dispatch('goBlogPage', blog)
			}
		}
	}
</script>

<style scoped>
.avatar {
	width: 40px;
	height: 40px;
	border-radius: 50%;
}
.dateTimeInfo{
font-size: 12px;
color: #999;
}


 /deep/ .el-card__header{
	margin-top: 4px;
	padding: 0 0 0 0 !important;
	height: 25px !important;
}



</style>