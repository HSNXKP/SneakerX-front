<template>
  <div>
    <el-card  v-if="this.product.id === undefined">
			<el-empty description="未查询到该商品"></el-empty>
		</el-card>
    <el-card v-else>
      <h2 class="m-text-500"  style="text-align: center">{{ this.product.name }}</h2>
      <div class="ui  divider "></div>
    <div >
      <div class="ui divided items">
        <div class="imageInfo">
          <img :src=this.product.image />
        </div>
        <div class="ui divider"></div>
        <el-card shadow="always" style="text-align: center;">当前最低售出价格: <strong style="color: red;">{{  '￥' + this.product.price }}</strong></el-card>
        <div class="ui divider"></div>
         <!-- 订单表 -->
        <el-form ref="orderFormRef" :model="orderForm"  label-width="90px">
          <el-form-item label="选择尺码">
            <el-select v-model="orderForm.sizeWithPrice" placeholder="请选择您的尺码">
              <el-option v-for="item in sizeWithPrice" :key="item.id" :label="item.name" :value="item.id">
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: red; font-size: 13px">{{ '￥' + item.productPrice }}</span>
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="即时配送">
            <el-switch v-model="orderForm.delivery"></el-switch>
            <span class="delivery">（开启后48小时内紧急发货）</span>
          </el-form-item>

          <el-form-item label="默认地址">
            <el-switch v-model="orderForm.isDefaultAddress"></el-switch>
            <span class="address">（设置当前选择地址为默认地址）</span>
          </el-form-item>
          <el-form-item  label="收货地址">
            <Address v-model="orderForm.address"    :addressId="addressId"   @backAddress="getAddress" />
          </el-form-item>

  

          <el-form-item label="支付方式">
            <el-radio-group v-model="orderForm.payType">
              <el-radio label="1" size="mini" border disabled>微信</el-radio>
              <el-radio label="2" size="mini" border>支付宝</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="选择数量">
            <el-input-number size="mini" v-model="orderForm.quantity"  :min="1" :max="5" ></el-input-number>
            <span class="purchaseRestrictions">（该商品限购{{ this.product.purchaseRestrictions }}件）</span>
          </el-form-item>
          <div class="submitOrder">
            <el-button href="javascript:;" size="mini" @click="collecOrCanceltProduct()">
              收藏
              <i class="el-icon-star-off"  style="margin-right: 5px;" v-if="this.isCollect === false "></i>
              <i class="el-icon-star-on"  style="margin-right: 5px;color: yellowgreen;" v-else></i>
            </el-button>
            <el-button type="success"  @click="submitOrder" size="medium">立即购买</el-button>
            <el-button size="medium" @click="addProductToCart">加入购物车</el-button>
          </div>
        </el-form>
        <el-collapse v-model="activeNames">
          <el-collapse-item name="1">
            <template slot="title">
              <span class="productDescription">
                <i class="icon  el-icon-sell"></i>
                商品描述 Description </span>
            </template>
            <div v-html="this.product.description"></div>
          </el-collapse-item>
          <el-collapse-item name="3">
            <template slot="title">
              <span class="collapseText">
                <i class="icon el-icon-circle-check"></i>
                已通过SneakerX鉴定 </span>
            </template>
            <div>
              “经过 已通过SneakerX鉴定
              鉴定”是我们自己的称谓和做法，表示我们每次都会对每件商品进行检查。
            </div>
          </el-collapse-item>
          <el-collapse-item name="4">
            <template slot="title">
              <span class="collapseTextCommitment">
                <i class="icon el-icon-star-on"></i>
                我们的承诺 </span>
            </template>
            <!-- <svg viewBox="0 0 18 23" focusable="false" class="icon"><path d="M8.75 20L8.51136 19.9219C0.238637 16.9531 0 10.7812 0 10.5469V2.03125L8.75 0L17.5 2.03125V10.4688C17.5 10.7812 17.2614 16.9531 8.98864 19.8438L8.75 20ZM1.19318 2.96875V10.4688C1.19318 10.7031 1.43182 16.0156 8.75 18.6719C16.0682 16.0156 16.3068 10.625 16.3068 10.4688V2.96875L8.75 1.17188L1.19318 2.96875Z" fill="black"></path><path d="M13.9204 8.35937C13.9204 6.875 12.7272 5.625 11.1363 5.625C10.1022 5.625 9.30677 6.40625 8.67041 7.26563C8.11359 6.40625 7.31814 5.625 6.2045 5.625C4.69314 5.625 3.42041 6.79687 3.42041 8.35937C3.42041 8.67187 3.49996 9.0625 3.5795 9.29687C4.05677 10.8594 8.59086 14.6875 8.59086 14.6875C8.59086 14.6875 13.125 10.8594 13.6022 9.29687C13.8409 8.98437 13.9204 8.67187 13.9204 8.35937Z" fill="black"></path></svg> -->
            <div  >
              我们致力于赢得并保持你对我们的信任。如果我们出了错，我们会立即更正。
            </div>
          </el-collapse-item>
        </el-collapse>
        
        <div style="margin-top:10px">
          <strong>商品详情</strong>
          <div class="productDetails">
            <ul class="productDetailsUl">
              <li>货号 : <strong>{{ this.product.code }}</strong></li>
              <li>配色：<strong>{{ this.product.color }}</strong></li>
              <li>零售价：<strong>{{ '￥' + this.product.retail}}</strong></li>
              <li>发布日期：<strong>{{ this.product.createTime | dateFormat('YYYY-MM-DD') }}</strong></li>
            </ul>
          </div>
        </div>
        <div class="ui divider"></div>
      </div>
    </div>
  </el-card>
  </div>
</template>

<script>
import {collectProduct ,cancelCollectProduct ,isCollectProduct} from "@/api/product";
import { getProductSizeWithPriceByProductId } from '@/api/productSize'
import { mapState } from "vuex";
import { getProductById } from '@/api/product';
import { addCart } from '@/api/cart';
import { order } from '@/api/order';
import Address from "@/components/address/Address";

export default {
  name: "ProductInfo",
  components: {Address},
  data() {
    return {
      activeNames: ["1"],
      // 用于展示当前当前productId的商品信息
      sizeWithPrice:[],
      orderForm: {
        userId: '',
        productId: '',
        payType:'2',
        sizeWithPrice:'',
        delivery:false,
        isDefaultAddress:false,
        address: '',
        quantity: 1,
        type:''
      },
      addressId:'',
      product:{},
      isCollect:false,
    }
  },
  created(){
    this.getProductById()
    this.getProductSizeWithPriceByProductId()
    this.isCollectProduct()
  },
	computed: {
    ...mapState(['user']),
    productId(){
      return parseInt(this.$route.params.id)
    }
    },
    beforeRouteUpdate(to, from, next) {
			// 在路由 beforeRouteUpdate 中判断路径是否改变
			// 如果跳转到其它页面，to.path!==from.path 就放行 next()
			if (to.path !== from.path) {
        // 请求商品详情
				this.getProductById(to.params.id)
         // 如果用户登录了 请求用户收货地址 
         if(this.user){
          this.getAddressList()
         }
         // 请求当前的商品关联的价格尺码
        this.getProductSizeWithPriceByProductId(to.params.id)
				next()
			}
		},
  methods: {
    // 提交订单
    submitOrder() {
      this.orderForm.userId = this.user.id
      this.orderForm.productId = this.productId
      // 购物车和单个商品公用一个接口 order：单个订单 cartOrder:购物车订单
      this.orderForm.type = 'order'
      const token = window.localStorage.getItem('adminToken') 
      if(this.orderForm.address == ''){
          return  this.msgError('请选择收货地址')
      }
      if(this.orderForm.sizeWithPrice == ''){
          return  this.msgError('请选择购买的商品尺码')
      }
      this.$refs.orderFormRef.validate((valid) => {
        if (valid) {
          order(token,this.orderForm).then(res=>{
            if(res.code==200){
            this.$refs.orderFormRef.resetFields();
              this.$notify({
							title: res.msg,
							type: 'success'
						})
              this.$router.push({path: '/pay/' + res.data})
            // 清空表单
            }else{
              this.$notify({
							title: res.msg,
							type: 'warning'
						})
            }
          })
        } 
      });
    },
    // 加入购物车
    addProductToCart() {
      this.orderForm.userId = this.user.id
      this.orderForm.productId = this.productId
      const token = window.localStorage.getItem('adminToken') 
      if(this.orderForm.sizeWithPrice == ''){
          return  this.msgError('请选择购买的商品尺码')
      }
      this.$refs.orderFormRef.validate((valid) => {
        if (valid) {
          addCart(token,this.orderForm).then(res=>{
            if(res.code==200){
              this.$notify({
							title: res.msg,
							type: 'success'
						})
            }else{
              this.$notify({
							title: res.msg,
							type: 'warning'
						})
            }
          })
        } 
      });
    },
    // 获得当前商品的尺码和价格
    getProductSizeWithPriceByProductId(id = this.productId){
      getProductSizeWithPriceByProductId(id).then(res=>{
        if(res.code==200){
          // 传值需要传到data中的数据 ，传给后端订单需要一个确切的值
          this.sizeWithPrice= res.data
          this.orderForm.sizeWithPrice = []
        }else{
          this.msgError(res.msg)
        }
      })
    },
    // 获得当前商品的详情
    getProductById(id = this.productId){
      getProductById(id).then(res=>{
        if(res.code==200){
          // 传值需要传到data中的数据 ，传给后端订单需要一个确切的值
          this.product= res.data
          // 清空数组
        }
      })
    },
    // 收藏商品 // isCollect是true则取消收藏，false则收藏
    collecOrCanceltProduct(){
      const token = window.localStorage.getItem('adminToken') 
      const userId = this.user.id
      const productId = this.productId
      if(this.isCollect === true){
        cancelCollectProduct(token,userId,productId).then(res=>{
          if(res.code==200){
            this.isCollect = res.data
            this.isCollectProduct()
          }
        })
      }
      collectProduct(token,userId,productId).then(res=>{
        if(res.code==200){
          this.isCollectProduct()
        }
      })
    },
    // 判断商品是否收藏
    isCollectProduct(){
      const token = window.localStorage.getItem('adminToken') 
      const userId = this.user.id
      const productId = this.productId
      isCollectProduct(token,userId,productId).then(res=>{
        if(res.code==200){
          this.isCollect = res.data
        }
      })
    },
    getAddress(address){
      this.orderForm.address = address
    }
  } 
};
</script>

<style scoped>
.imageInfo {
  text-align: center;
}

.collapseText {
  font-size: 12px;
  color: rgb(212, 27, 27);
}

.collapseTextCommitment {
  font-size: 12px;
  color: green;
}

.productDetails {
  font-size: 12px;
}

.productDetailsUl {
  padding-left: 0.4rem;
  list-style-type: none;
}

.productDescription {
  font-size: 12px;
  color: blueviolet;
}
/* 限购 */
.purchaseRestrictions{
  font-size: 10px;
  zoom: 0.8;
  color: red;
}
.delivery{
  font-size: 10px;
  zoom: 0.8;
  color: red;
} 
.address{
  font-size: 10px;
  zoom: 0.8;
  color: red;
}
.submitOrder{
  margin-left: 20px;
  margin-bottom: 20px;
}
</style>