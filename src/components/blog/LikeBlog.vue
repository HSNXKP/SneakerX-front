<template>
  <div>
    <a  @click="like(id)">
        <i class="small heart icon" :class="isLike(id)?'like-color':'outline'" ></i>
        <span>
            {{ likes === 0?' ':likes }}
        </span>
    </a>
  </div>
</template>

<script>
	import {likeMoment} from "@/api/moment";

export default {
    name: "LikeBlog",
    props: {
        id: {
        type: Number,
        required: true
        },
        likes: {
        type: Number,
        required: true
        },
        list: {
        type: Array,
        required: true
        }
    },
    data() {
        return {
        //用localStorage本地存储已点赞的动态id数组
        likeMomentIds: JSON.parse(window.localStorage.getItem('likeMomentIds') || '[]'),
        }
    },
    computed: {
        isLike() {
        return function (id) {
            return this.likeMomentIds.indexOf(id) > -1
        }
        },
    },
    watch: {
        likeMomentIds(newValue) {
        //将likeMomentIds最新值的json数据保存到localStorage
        window.localStorage.setItem('likeMomentIds', JSON.stringify(newValue))
        }
    },
    methods: {
        like(id) {
				if (this.likeMomentIds.indexOf(id) > -1) {
					this.$notify({
						title: '不可以重复点赞哦',
						type: 'warning'
					})
					return
				}
				likeMoment(id).then(res => {
					if (res.code === 200) {
						this.$notify({
							title: res.msg,
							type: 'success'
						})
						this.likeMomentIds.push(id)
						this.list.forEach(item => {
							if (item.id === id) {
								return item.likes++
							}
						})
					} else {
						this.$notify({
							title: res.msg,
							type: 'warning'
						})
					}
				}).catch((e) => {
					this.$notify({
						title: '异常错误',
						type: 'error'
					})
                    console.log(e)
				})
			},
    }
}
</script>

<style scoped>
    .like-color {
		color: red !important;
	}
    .i {
		font-size: 12px !important;
	}


</style>