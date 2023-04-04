<template>
   <div>
    <div class="ui top attached segment "  style="text-align: center">
			<h2 class="m-text-500">个人信息修改</h2>
			<div class="ui attached segment m-padding-bottom-large">
			<!--头像-->
			<a class="avatar_box" >
				<img src="/img/avatar.jpg" alt="">		
			</a>
			</div>
		
		</div>
 
		
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

.login_container {
	box-sizing: unset !important;
	height: 100%;
	background-color: #f2f3f5;
}

.ui.top.attached.segment {
	background-color: #fff;
	border: 1px solid #eee;
	border-radius: 0;
	box-shadow: 0 0 10px #ddd;
}


.avatar_box {
	height: 130px;
	width: 130px;
	border: 1px solid #eee;
	border-radius: 50%;
	padding: 10px;
	box-shadow: 0 0 10px #ddd;
	position: absolute;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: #fff;
}


 .avatar_box img {
	width: 100%;
	height: 100%;
	border-radius: 50%;
	background-color: #eee;
}


</style>