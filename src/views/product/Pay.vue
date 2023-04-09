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
          商品尺码 : [{{ this.order.size }}]
        </div>
        <div class="orderInfo">
          商品数量 : <el-input-number size="mini" v-model="this.order.quantity" disabled></el-input-number>
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
        
        <div class="orderInfo">
          <span class="orderNumber">
            创建时间 : {{ this.order.createTime | dateFormat('YYYY-MM-DD HH:mm') }}（下单后30分钟内可支付）
          </span>
        </div>
          <el-input type="textarea" placeholder="订单备注:给个鞋包呗！(当然肯定不会给)" v-model="orderRemarks"></el-input>
        <div class="orderInfo" v-if="this.order.status == 0">
          <el-button type="success" @click="toPay">支付订单</el-button>
          <el-button type="danger" @click="cancelOrder">取消订单</el-button>
        </div>
        <div class="orderInfo" v-if="this.order.status == 1">
          <el-button type="success"  disabled>订单已支付</el-button>
        </div>
        <div class="orderInfo" v-if="this.order.status == 2">
          <el-button type="success"  disabled>订单已发货</el-button>
        </div>
        <div class="orderInfo" v-if="this.order.status == 3">
          <el-button type="success"  disabled>订单已完成</el-button>
        </div>
        <div class="orderInfo" v-if="this.order.status == 4">
          <el-button type="success"  disabled>订单已取消</el-button>
        </div>
      </div>

      <!-- 支付宝前端响应界面 -->
      <div ref="alipayWap" v-html="alipay"> </div>
    </div>
  </div>
</template>

<script>

import { payOrder } from '@/api/pay';
import { getOrder , cancelOrder } from '@/api/order';

export default {
  name: "Pay",
  data() {
    return {
      order: {

      },
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
      console.log(token)
      console.log(orderNumber)
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
      // 二次确认
      this.$confirm('此操作将取消该订单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const token = window.localStorage.getItem('adminToken')
        const orderNumber = this.orderNumber
        cancelOrder(token,orderNumber).then(res => {
          if (res.code === 200) {
            this.$notify({
              title:  res.msg,
              type: 'success',
            });
            this.getOrder()
          }else{
            this.$notify({
							title: res.msg,
							type: 'warning'
						})
          }
        })
      }).catch((e) => {
        console.log(e)
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    payOrder(orderNumber = this.orderNumber) {
      const token = window.localStorage.getItem('adminToken')
      payOrder(token,orderNumber).then(res => {
        if (res.code === 200) {
          console.log(res)
        this.alipay = res.data
        this.$nextTick(() => {
          // 提交支付表单
          this.$refs.alipayWap.children[0].submit();
          setTimeout(() => {
            // this.toPayFlag = false;
          }, 500);
        });
        }else{
          this.msgError(res.msg)
        }
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