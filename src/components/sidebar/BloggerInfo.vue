<template>
	<div>
		<div class="ui  m-box" style="margin-top:0px; margin-bottom:10px">
			<div class="ui card no-segments" >
				<div class="image">
					<img :src="blogger.avatar" >
				</div>
				<div class="content " align="center">
					<div class="fans">
						粉丝：{{ blogger.fans }}
						关注：{{ blogger.follow }}
					</div>
					<div class="header">{{ blogger.nickname }}</div>
					<div id="rollText"  style="font-size:13px" >
						简介：{{ blogger.userSign }}
					</div>
					<div class="m-margin-top">
					</div>
                    <div class="m-margin-top" >
                        <el-button type="primary" size="mini" icon="el-icon-plus" @click="addFans"  v-if="this.isFan === false">关注</el-button>
						<el-button size="mini"  v-else @click="cancelFollow" >已关注</el-button>
                        <el-button type="success" size="mini" icon="el-icon-star-off"  @click="toBloggerMoments">他的动态</el-button>
                    </div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	import {addFans,cancelFollow,isFans} from'@/api/user'
	import {SET_IS_FAN} from '@/store/mutations-types';

	export default {
		name: "BloggerInfo",
		computed: {
			...mapState(['blogger','user','isFan'])
		},
		watch:{
			blogger() {
				if (this.blogger.id) {
					this.isFans()
				}
			}
		},
		methods: {
			// 关注博主
			addFans() {
				const token = window.localStorage.getItem('adminToken')
				const userId = this.user.id;
				if (userId === this.blogger.id) {
					this.$message({
						message: '不能关注自己',
						type: 'error'
					});
					return;
				}
				const bloggerId = this.blogger.id;
				addFans(token,userId,bloggerId).then(res => {
					if (res.code === 200) {
						// 博主粉丝数+1 用户关注数+1
						this.blogger.fans = this.blogger.fans + 1
						this.user.follow = this.user.follow + 1
						this.isFans()
					}else{
						this.msgError(res.msg);
					}
				})
			},
			// 判断是否为粉丝
			isFans() {
				const token = window.localStorage.getItem('adminToken')
				const userId = this.user.id;
				const bloggerId = this.blogger.id;
				isFans(token,userId,bloggerId).then(res => {
					if (res.code === 200) {
						this.$store.commit(SET_IS_FAN,res.data)
					}
				})
			},
			toBloggerMoments() {
				const id = this.blogger.id;
				this.$router.push(`/moments/${id}`)
			},
			cancelFollow(){
				// 二次确认
				this.$confirm('确定取消关注吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					const token = window.localStorage.getItem('adminToken')
				const userId = this.user.id;
				const bloggerId = this.blogger.id;
				cancelFollow(token,userId,bloggerId).then(res => {
					if (res.code === 200) {
						// 博主粉丝数-1 用户关注数-1
						this.blogger.fans = this.blogger.fans - 1
						this.user.follow = this.user.follow - 1
						this.isFans()
					}else{
						this.msgError(res.msg);
					}
				})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
		
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
