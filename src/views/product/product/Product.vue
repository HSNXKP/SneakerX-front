<template>
  <div>
    <el-card>
      <h2 class="m-text-500" style="text-align: center">{{ this.productCategoryName }} 系列</h2>
      <div class="ui  divider "></div>
      <div>
        <el-empty v-if="productCategoryListWithProduct.length == 0" description="暂无商品 去别的地方看看吧！"></el-empty>
        <div class="ui divided items">
          <!-- 商品分类展示界面 两个卡片间隔为1 左右间隔加起来等于2 就是gutter    span一个卡片占8格子 一共24格子-->
          <el-row :gutter="4">
            <el-col class="productMargin" :span="item.price === undefined ? 8 : 6"
              v-for="(item, index) in productCategoryListWithProduct" :key="index">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <div style="display: flex;flex-direction: column">
                  <!-- 异步处理 判断进入哪个router  href="#" 表示不跳转页面 仍在在本页面请求-->
                  <a href="javascript:void(0)" @click="toProduct(item.id, item.productCategoryId)">
                    <img :src="item.image" class="image">
                    <!-- 测试http://43.138.9.213/image/product/12/6.webp -->
                  </a>
                  <div style="padding: 10px;display: flex;flex-direction: column">
                    <span class="css-3lpefb" v-if="item.price === undefined">{{ item.name
                    }}</span>
                    <span class="css-3lpefb" v-else>{{ item.name }}</span>
                    <div class="bottom">
                      <span class="description" v-if="item.price === undefined">{{ item.description
                      }}</span>
                      <span class="price" v-else>{{ 'Last Sale:￥' + item.price
                      }}</span>
                    </div>
                  </div>
                </div>

              </el-card>
            </el-col>
          </el-row>
        </div>

      </div>
    </el-card>
  </div>
</template>


<script>

import { getProductCategory } from '@/api/productCategory'

export default {
  name: "Product",
  data() {
    return {
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
      this.getProductCategory(to.params.id)
      next()
    }
  },
  methods: {
    getProductCategory(id = this.productCategoryId) {
      getProductCategory(id).then(res => {
        if (res.code === 200) {
          // 递归处理数据，将没有子节点的节点的children属性设置为undefined 否则级联会出问题
          this.productCategoryListWithProduct = res.data.productCategoryListWithProduct
          this.productCategoryName = res.data.productCategoryName
        }
      }).catch(() => {
        this.msgError("请求失败")
      })
    },
    //  通过productCategoryId查询当前的是商品还是商品分类跳转到商品详情页面
    toProduct(id, productCategoryId) {
      if (productCategoryId === undefined) {
        this.$router.push({ path: '/product/' + id })
      } else {
        this.$router.push({ path: '/productInfo/' + id })
      }
    }
  }
}
</script>

<style scope>
.productMargin {
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

.price {
  font-size: 12px;
  color: red;
  /* 隐藏溢出的文本 */
  overflow: hidden;
  /* 设置文本在一行中显示，超出部分将被截断 */
  white-space: nowrap;
  /* 添加省略号以表示溢出文本 */
  text-overflow: ellipsis;
  /* 设定固定高度以限制文本的行数 */
  height: 2em;
}


.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
}


.image {
  width: 100%;
  display: block;

}

/* 多余的文字用...代替 */
.css-3lpefb {
  /* 隐藏溢出的文本 */
  overflow: hidden;
  /* 设置文本在一行中显示，超出部分将被截断 */
  white-space: nowrap;
  /* 添加省略号以表示溢出文本 */
  text-overflow: ellipsis;
  /* 设定固定高度以限制文本的行数 */
  height: 2em;
}

.description {
  /* 隐藏溢出的文本 */
  overflow: hidden;
  /* 设置文本在一行中显示，超出部分将被截断 */
  white-space: nowrap;
  /* 添加省略号以表示溢出文本 */
  text-overflow: ellipsis;
  /* 设定固定高度以限制文本的行数 */
  height: 2em;
  font-size: 12px;
}
</style>