<template>
	<div>
		<div class="ui  m-box" >
			<div class="ui card no-segments">
				<div class="image">
					<img :src="blogger.avatar" >
				</div>
				<div class="content " align="center">
					<div class="fans">
						粉丝：12
						关注：12
					</div>
					<div class="header">{{ blogger.nickname }}</div>
					<div id="rollText" class="m-margin-top" style="font-size:13px" >
						简介：{{ blogger.userSign }}
					</div>
					<div class="m-margin-top">
					</div>
                    <div class="m-margin-top" >
                        <el-button type="primary" size="mini" icon="el-icon-plus" @click="addFans"  v-if="isFan == false">关注</el-button>
						<el-button size="mini"  v-else >已关注</el-button>
                        <el-button type="success" size="mini" icon="el-icon-star-off"  >他的动态</el-button>
                    </div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import {addFans,isFans} from'@/api/user'

	export default {
		name: "BloggerInfo",
		return :{
			isFan: true
		},
		computed: {
			...mapState(['blogger','user'])
		},
		created() {
		},
		methods: {
			addFans() {
				const userId = this.user.id;
				if (userId === this.blogger.id) {
					this.$message({
						message: '不能关注自己',
						type: 'error'
					});
					return;
				}
				bloggerId = this.blogger.id;
				addFans(userId,bloggerId).then(res => {
					if (res.data.code === 200) {
						this.isFans()
						this.msgSuccess(res.msg);
					}else{
						this.msgError(res.msg);
					}
				})
			},
			isFans() {
				const userId = this.user.id;
				const bloggerId = this.blogger.id;
				this.isFans(userId,bloggerId).then(res => {
					if (res.data.code === 200) {
						this.isFan = res.data;
					}else{
						this.msgError(res.msg);
					}
				})
			}
		}
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
	.fans{
		font-size: 12px;
		color: #999;
	}

</style>
