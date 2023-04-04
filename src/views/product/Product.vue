<template>
  <div>
    <div class="ui top attached segment" style="text-align: center">
			<h2 class="m-text-500">Please Git It</h2>
		</div>
		<div class="ui attached segment m-padding-bottom-large">
			<div class="ui divided items">
        <!-- 商品分类展示界面 两个卡片间隔为1 左右间隔加起来等于2 就是gutter    span一个卡片占8格子 一共24格子-->
       <el-row :gutter="4">  
          <el-col class="productCart"  :span="item.price === undefined ?8: 6"   v-for="(item, index) in productCategoryListWithProduct" :key="index">
            <el-card :body-style="{ padding: '0px' }"  shadow="hover"  >
              <!-- 异步处理 判断进入哪个router -->
              <a @click="toProduct(item.id)">
                <img :src="item.image" class="image">
              </a>
               <div style="padding: 14px;">
                <span class="name">{{item.name}}</span>
               <div class="bottom clearfix">
                <span class="description">{{item.description}}</span>
              </div>
              </div>
            </el-card>
            </el-col>
          </el-row>  
        </div>

			</div>
    </div>
</template>


<script>

import {getProductCategory} from'@/api/productCategory'

export default {
    name: "Product",
    data(){
        return{
          productCategoryListWithProduct: [],
        }
    },
    created() {
      this.getProductCategory()
		},
    computed: {
			productCategoryId() {
				return parseInt(this.$route.params.id)
			}
		},
		beforeRouteUpdate(to, from, next) {
			// 在路由 beforeRouteUpdate 中判断路径是否改变
			// 如果跳转到其它页面，to.path!==from.path 就放行 next()
			if (to.path !== from.path) {
				// this.$store.commit(SET_FOCUS_MODE, false)
				//在当前组件内路由到其它博客文章时，要重新获取文章
				this.getProductCategory(to.params.id)
				next()
			}
		},
    methods:{
    getProductCategory(id =this.productCategoryId){
      getProductCategory(id).then(res => {
        if (res.code === 200) {
          // 递归处理数据，将没有子节点的节点的children属性设置为undefined 否则级联会出问题
          this.productCategoryListWithProduct = res.data
          console.log(this.productCategoryListWithProduct[0].price)
        }
      }).catch(() => {
        this.msgError("请求失败")
      })
    }
    }
}
</script>

<style scope>
.productCart{
  margin-bottom: 10px;
}

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

  .name {
    font-size: 14px;
    color: #999;
  } 
  .description {
    font-size: 10px;
    color: rgb(71, 62, 62);
  } 

  .time {
    font-size: 13px;
    color: #999;
  } 
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
    
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>