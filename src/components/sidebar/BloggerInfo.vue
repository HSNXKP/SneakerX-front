<template>
	<div>
		<div class="ui  m-box" >
			<div class="ui card no-segments">
				<div class="image">
					<img :src="blogger.avatar" >
				</div>
				<div class="content " align="center">
					<div class="header">{{ blogger.nickname }}</div>
					<div id="rollText" class="m-margin-top" style="font-size:13px" >
						{{ blogger.userSign }}
					</div>
                    <div class="m-margin-top" >
                        <el-button type="primary" size="mini" icon="el-icon-plus">关注</el-button>
                        <el-button type="success" size="mini" icon="el-icon-star-off" >他的动态</el-button>
                    </div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'

	export default {
		name: "BloggerInfo",
		computed: {
			...mapState(['blogger'])
		},
	}
</script>

<style scoped>
	.ui.circular.icon.button {
		width: 38px;
	}

	#rollText {
		font-size: 15px;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
</style>
