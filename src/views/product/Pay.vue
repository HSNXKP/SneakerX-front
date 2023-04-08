<template>
  <div>
    <div class="ui top attached segment" style="text-align: center">
      <h2 class="m-text-500">SneakerX支付系统</h2>
    </div>
    <div class="ui attached segment m-padding-bottom-large">
      <div class="ui attached segment m-padding-bottom-large">
        <div class="orderInfo">
          <span>商品名称:{{ this.order.product.name }}</span>
        </div>
        <el-card shadow="always" style="text-align: center; margin-top: 10px;">
          <img :src="this.order.product.image" />
        </el-card>

        <div class="ui divider"></div>
        <el-card shadow="always" style="text-align: center; margin-top: 10px;">
          收货方式 : {{ this.order.address.name +'，' + this.order.address.phone +'，'+ this.order.address.address +'，' + this.order.address.addressDetail }}
        </el-card>
        <div class="orderInfo">
        </div>
        <div class="orderInfo">
          购买商品尺码 : [{{ this.order.size }}]
        </div>
        <div class="orderInfo">
          购买商品数量 : <el-input-number size="mini" v-model="this.order.quantity" disabled></el-input-number>
        </div>
        <div class="orderInfo">
          <span class="orderPrice">
            商品总价格 : {{ this.order.amount }}
          </span>
        </div>

        <div class="orderInfo">
          <span class="orderNumber">
            订单编号 : {{ this.order.orderNumber }}
          </span>
        </div>
          <el-input type="textarea" placeholder="订单备注:给个鞋包呗！(当然肯定不会给)" v-model="orderRemarks"></el-input>
        <div class="orderInfo">
          <el-button type="success" @click="toPay">支付订单</el-button>
          <el-button type="danger" @click="cancelOrder">取消订单</el-button>
        </div>
      </div>









      <!-- 支付宝前端响应界面 -->
      <div ref="alipayWap" v-html="alipay"> </div>
    </div>
  </div>
</template>

<script>

import { payOrder } from '@/api/pay';
import { getOrder } from '@/api/order';

export default {
  name: "Pay",
  data() {
    return {
      order: {},
      alipay: '',
      value: 1,
      orderRemarks: ''
    }
  },
  created() {
    // this.payOrder()
    this.getOrder()
  },
  computed: {
    orderNumber() {
      return this.$route.params.orderNumber
    }
  },
  methods: {
    getOrder(orderNumber = this.orderNumber) {
      console.log(this.orderNumber)
      const token = window.localStorage.getItem('adminToken') 
      getOrder(token,orderNumber).then(res => {
        if (res.code === 200) {
          this.order = res.data
          console.log(res.data)
        }else{
          this.msgError(res.msg)
        }
      })
    },
    toPay() {
      this.payOrder()
    },
    cancelOrder() {
      this.$router.push({path: '/productInfo/' + this.order.product.id})
    },
    payOrder(orderNumber = this.orderNumber) {
      payOrder(orderNumber).then(res => {
        console.log(res)
        this.alipay = res.data
        this.$nextTick(() => {
          // 提交支付表单
          this.$refs.alipayWap.children[0].submit();
          setTimeout(() => {
            // this.toPayFlag = false;
          }, 500);
        });

      })
    }
  }
}
</script>

<style scoped>
.orderInfo {
  text-align: center;
  margin-top: 10px;
}

.orderNumber {
  font-size: 10px;
  color: #999;
}

.orderPrice {
  font-size: 14px;
  color: red;
}
</style>