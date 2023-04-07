<template>
  <div>
    <div class="ui top attached segment" style="text-align: center">
			<h2 class="m-text-500">{{ this.productCategoryName }} 系列</h2>
		</div>
		<div class="ui attached segment m-padding-bottom-large">
      <el-empty v-if="productCategoryListWithProduct.length == 0" description="暂无商品 去别的地方看看吧！"></el-empty>

			<div class="ui divided items">
        <!-- 商品分类展示界面 两个卡片间隔为1 左右间隔加起来等于2 就是gutter    span一个卡片占8格子 一共24格子-->
       <el-row :gutter="4">  
          <el-col class="productMargin"  :span="item.price === undefined ?8: 6"   v-for="(item, index) in productCategoryListWithProduct" :key="index">
            <el-card :body-style="{ padding: '0px' }"  shadow="hover"  >
              <!-- 异步处理 判断进入哪个router  href="#" 表示不跳转页面 仍在在本页面请求-->
              <a href="#" @click="toProduct(item.id,item.productCategoryId)">
                <img :src="item.image" class="image">
              </a>
               <div style="padding: 10px;">
                <span class="nameProductCategory" v-if="item.price === undefined">{{item.name}}</span>
                <span class="nameProduct" v-else >{{item.name}}</span>
               <div class="bottom clearfix">
                <span class="description" v-if="item.price === undefined">{{ item.description }}</span>
                <span class="price" v-else>{{ 'Last Sale:￥'+item.price }}</span>
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
          productCategoryName: ''
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
				this.getProductCategory(to.params.id)
				next()
			}
		},
    methods:{
    getProductCategory(id =this.productCategoryId){
      getProductCategory(id).then(res => {
        if (res.code === 200) {
          // 递归处理数据，将没有子节点的节点的children属性设置为undefined 否则级联会出问题
          this.productCategoryListWithProduct = res.data.productCategoryListWithProduct
          this.productCategoryName = res.data.productCategoryName
          console.log(this.productCategoryListWithProduct)
        }else{
          this.msgError(res.data)
        }
      }).catch(() => {
        this.msgError("请求失败")
      })
    },
    //  通过productCategoryId查询当前的是商品还是商品分类跳转到商品详情页面
    toProduct(id,productCategoryId){
      if(productCategoryId === undefined){
        this.$router.push({path: '/product/' + id})
    }else{
      this.$router.push({path: '/productInfo/' + id})
    }
  }
    }
}
</script>

<style scope>
.productMargin{
  margin-bottom: 0.8rem;
}

.secondary.segment {
		padding: 0.8rem;
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

  .nameProductCategory {
    font-size: 0.1rem;
    color: #541010;
  } 

  
  .nameProduct {
    font-size: 0.1rem;
    color: #541010;
  } 


  .description {
    font-size: 0.1rem;
    color: rgb(31, 11, 11);
  } 


  
  .price {
    font-size: 0.1rem;
    color: red;
  } 

  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
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