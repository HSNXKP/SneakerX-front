<template>
   <div>
    <div class="ui top attached segment login_container"  style="text-align: center">
			<h2 class="m-text-500">个人信息修改</h2>
		</div>
    <div class="user_box" >
			<!--头像-->
			<a class="avatar_box" >
				<img src="/img/avatar.jpg" alt="">		
			</a>
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

.user_box {
	width: 450px;
	height: 300px;
	background-color: #fff;
	border-radius: 3px;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
}


.user_box .avatar_box {
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



</style>