<template>
  <div>
    <div class="ui top attached segment" style="text-align: center">
      <h2 class="m-text-500">SneakerX购物车结算</h2>
    </div>
    <!-- <div class="ui attached segment m-padding-bottom-large" >
      <el-empty description="暂无订单，快去下单吧！" ></el-empty>
    </div> -->
    <div class="ui attached segment m-padding-bottom-large">
      <!-- v-if 做判断先判断空 在使用v-else 要是先判断v-if="!order.children === null" 的情况会出问题-->
      <div class="ui attached segment m-padding-bottom-large" >
        <div class="orderInfo">
          <span >商品名称:ss</span>
        </div>
        <el-card shadow="always" class="orderInfo">
          <img :src="url" />
        </el-card>

        <div class="ui divider"></div>
    
        <div class="orderDetailInfo"> 
          商品尺码 : [ss]
        </div>
        <div class="orderDetailInfo">
          <span class="orderPrice">
            商品单价 :ss
          </span>
        </div>
        <div class="orderDetailInfo">
          商品数量 :  xss
        </div>
        <div class="orderDetailInfo">
          <span class="orderPrice">
            商品总价格 : sss
          </span>
        </div>
   
        <!-- <div class="orderDetailInfo">
            订单备注 :ss
          <el-input v-if="order.status === 0" type="textarea" placeholder="订单备注:给个鞋包呗！(当然肯定不会给)" v-model="orderRemarks"></el-input>
        </div> -->
  
      </div>
      <div class="ui attached segment m-padding-bottom-large" >
        <div class="orderInfo">
          <span >商品名称:ss</span>
        </div>
        <el-card shadow="always" class="orderInfo">
          <img :src="url" />
        </el-card>

        <div class="ui divider"></div>
    
        <div class="orderDetailInfo"> 
          商品尺码 : [ss]
        </div>
        <div class="orderDetailInfo">
          <span class="orderPrice">
            商品单价 :ss
          </span>
        </div>
        <div class="orderDetailInfo">
          商品数量 :  xss
        </div>
        <div class="orderDetailInfo">
          <span class="orderPrice">
            商品总价格 : sss
          </span>
        </div>
   
        <!-- <div class="orderDetailInfo">
            订单备注 :ss
          <el-input v-if="order.status === 0" type="textarea" placeholder="订单备注:给个鞋包呗！(当然肯定不会给)" v-model="orderRemarks"></el-input>
        </div> -->
      </div>

      <div class="orderInfo">
          <el-button type="success" >支付订单</el-button>
          <el-button type="danger">取消结算</el-button>
        </div>
      
    </div>
  </div>
</template>

<script>

import { getCartList } from '@/api/cart';
import { mapState } from "vuex";

export default {
  name: "SettleAccount",
  data() {
    return {
      url:'https://img.picgo.net/2023/04/06/Nike-SB-Dunk-Low-White-Gum-Product258f5013cf9724a3.webp',
      cartList:[]
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created(){
    this.getCartList()
  },
  methods:{
    getCartList(){
      const token = window.localStorage.getItem('adminToken')
        const userId = this.user.id
        getCartList(token,userId).then(res => {
          if (res.code === 200) {
            this.cartList = res.dataa
            this.msgSuccess(res.msg);
          }else{
            this.msgError(res.msg);
          }
        })
    }
  }
};
</script>

<style scoped>

.orderInfo {
  text-align: center;
  margin-top: 10px;
}
.orderDetailInfo {
  margin-top: 10px;
  color: #999;
}


.orderPrice {
  font-size: 14px;
  color: red;
}
</style>