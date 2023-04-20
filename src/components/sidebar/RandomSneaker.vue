<template>
	<!--随机文章-->
	<div class="ui segments  m-box no-segments" >
		<div class="ui  segment"><i class="bookmark blue icon"></i>
			<span style="color:blue">
				本文关联球鞋
			</span>
			</div>
		<div class="ui blue segment">
			<div class="ui divided items">
				<div class="m-item" v-for="product in randomProductList" :key="product.id" @click.prevent="toProduct(product.id)">
					<div class="img" :style="{'background-image':'url(' + product.image + ')'}"></div>
					<div class="info">
						<div class="date">{{ product.name }}</div>
						<div class="title" style="color:red">￥{{ product.price }}</div>
						
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "RandomSneaker",
		props: {
			randomProductList: {
				type: Array,
				required: true
			},
		},
		methods: {
			toProduct(id) {
				this.$router.push(`/productInfo/${id}`)
			}
		}
	}
</script>

<style scoped>
	.secondary.segment {
		padding: 10px;
	}

	.ui.divided.items .m-item:first-child {
		margin-top: 0;
	}

	.ui.divided.items .m-item {
		margin-top: 1rem;
		height: 7rem;
		position: relative;
		overflow: hidden;
		border-radius: 5px;
		cursor: pointer;
		user-select: none;
	}

	.ui.divided.items .m-item .img {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		object-fit: cover;
		background-position-x: center;
		background-position-y: center;
		background-size: cover;
	}

	.ui.divided.items .m-item .info {
		z-index: 1;
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		padding: .5rem !important;
		font-size: 12px;
		color: white;
	}

	.ui.divided.items .m-item .info .title {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		word-break: break-word;
	}
</style>