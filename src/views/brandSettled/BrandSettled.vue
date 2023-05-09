<template>
  <div>
    <el-card>
        <h2 class="m-text-500" style="text-align: center">品牌入驻</h2>
      <div class="ui  divider "></div>
	  <div class="coop">
		<p class="text">如需要咨询如何成为SneakerX商家，以及咨询店铺入驻及商家运营问题，请加QQ：</p>
		<div class="coo">
			<ul >
		<li>
			<p  class="category">
				鞋类
			</p>
			<p  class="qq">
				xxxxxxxxxxxxx
			</p>
		</li>
		<li>
			<p  class="category">
				鞋类
			</p>
			<p  class="qq">
				xxxxxxxxxxxxx
			</p>
		</li>
		<li>
			<p  class="category">
				鞋类
			</p>
			<p  class="qq">
				xxxxxxxxxxxxx
			</p>
		</li>
		<li>
			<p  class="category">
				鞋类
			</p>
			<p  class="qq">
				xxxxxxxxxxxxx
			</p>
		</li>
	  </ul>
		</div>
	  <br>
	  <p class="text">如有联合活动、资源置换等商务合作需求请联系:</p>
	  <p class="text">2979554858@qq.com</p>
	  </div>
    </el-card>
  </div>
</template>

<script>
export default {
	name: "BrandSettled",
		computed: {
		},
		data() {
			return {
			}
		},
}
</script>

<style scoped>
.category{
	font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
}
.qq{
	font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
}
.coop {
    margin: 52px 0 52px 45px;
    line-height: 2em;
    font-family: "Microsoft YaHei";
	text-align: center;
}
.coop .title {
    font-size: 22px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #333333;
    margin-bottom: 28px;
}
.coop .text {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
}
.coop ul{
	list-style-type: none;
}
.coo{
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
}
.coop ul {
    overflow: hidden;
    width: max-content;
    padding: 27px 0;
    border: 0.5px solid #E4E4E4;
    margin: 12px 0;
	text-align: center;
}
.coop ul li{
	float: left;
    width: 130px;
    height: 48px;
    text-align: center;
    border-right: 0.5px solid #E4E4E4;
}

</style>