<template>
  <div>
    <el-card>
      <h2 class="m-text-500"  style="text-align: center">SneakerX支付系统</h2>
    <!-- 判断当前的订单状态是否存在 存在就显示 -->
    <div  v-if="order.status === ''">
      <el-empty description="暂无订单，快去下单吧！" ></el-empty>
    </div>
    <div  v-else>
      <!-- v-if 做判断先判断空 在使用v-else 要是先判断v-if="!order.children === null" 的情况会出问题-->
      <div v-if="order.children === null">
        <div class="orderInfo">
          <span >商品名称:{{ order.product.name  }}</span>
        </div>
        <el-card shadow="always" class="orderInfo">
          <img :src="order.product.image" />
        </el-card>

        <div class="ui divider"></div>
    
        <div class="orderDetailInfo"> 
          商品尺码 : [{{ order.size }}]
        </div>
        <div class="orderDetailInfo">
          <span class="orderPrice">
            商品单价 : {{ order.price }}
          </span>
        </div>
        <div class="orderDetailInfo">
          商品数量 :  x{{ order.quantity }}
        </div>
        <div class="orderDetailInfo">
          <span class="orderPrice">
            商品总价格 : {{ order.amount }}
          </span>
        </div>

        <div class="orderDetailInfo">
            订单编号 : {{ order.orderNumber }}
        </div>
        
        <div class="orderDetailInfo">
            创建时间 : {{ order.createTime | dateFormat('YYYY-MM-DD HH:mm') }}（下单后30分钟内可支付）
        </div>
        <div shadow="always" class="orderDetailInfo">
          收货方式 : {{ order.address}}
        </div>
        <div shadow="always" class="orderDetailInfo" v-if="order.status === 1 || order.status === 2 || order.status === 3">
          快递单号 : {{ order.express}}
        </div>
        <div class="orderDetailInfo">
            订单备注 : {{ order.orderRemarks}}
          <el-input v-if="order.status === 0" type="textarea" placeholder="订单备注:给个鞋包呗！(当然肯定不会给)" v-model="orderRemarks"></el-input>
        </div>
        
  
      </div>
      <div class="ui attached segment m-padding-bottom-large" v-else>
        <div class="children" v-for="(item,index) in order.children" :key="index">
          <div class="orderInfo">
          <span  >商品名称:{{ item.product.name }}</span>
        </div>
        <el-card shadow="always" class="orderInfo">
          <img  :src="item.product.image" />
        </el-card>

        <div class="ui divider"></div>

        <div class="orderDetailInfo">
          商品尺码 : [{{ item.size }}]
        </div>
        <div class="orderDetailInfo">
          <span class="orderPrice">
            商品单价 : {{ item.price }}
          </span>
        </div>
        <div class="orderDetailInfo">
          商品数量 :  x{{ item.quantity }}
        </div>
        </div>
        <div class="orderDetailInfo">
          <span class="orderPrice">
            商品总价格 : {{ order.amount }}
          </span>
        </div>
        <div class="orderDetailInfo">
            订单编号 : {{ order.orderNumber }}
        </div>
        <div class="orderDetailInfo">
            创建时间 : {{ order.createTime | dateFormat('YYYY-MM-DD HH:mm') }}（下单后30分钟内可支付）
        </div>
        <div shadow="always" class="orderDetailInfo">
          收货方式 : {{ order.address}}
        </div>
        <div shadow="always" class="orderDetailInfo" v-if="order.status === 1 || order.status === 2 || order.status === 3">
          快递单号 : {{ order.express}}
        </div>
        <div class="orderDetailInfo">
            订单备注 : {{ order.orderRemarks}}
          <el-input v-if="order.status === 0" type="textarea" placeholder="订单备注:给个鞋包呗！(当然肯定不会给)" v-model="orderRemarks"></el-input>
        </div>
        
      </div>
      <div class="orderInfo" v-show="order.status == 0">
          <el-button type="success" @click="toPay">支付订单</el-button>
          <el-button type="danger" @click="cancelOrder">取消订单</el-button>
        </div>
        <div class="orderInfo" v-show="order.status == 1">
          <el-button type="success"  disabled>订单已支付</el-button>
          <el-button type="danger"  @click="requestRefund" >申请退款</el-button>
        </div>
        <div class="orderInfo" v-show="order.status == 2">
          <el-button type="success"  disabled>订单已发货</el-button>
          <el-button type="danger"  @click="requestRefund" >申请退款</el-button>
          <el-button type="success" @click="confirmReceipt" >确认收货</el-button>
        </div>
        <div class="orderInfo" v-show="order.status == 3">
          <el-button type="success"  disabled>订单已完成</el-button>
        </div>
        <div class="orderInfo" v-show="order.status == 4">
          <el-button type="success"  disabled>订单已取消</el-button>
        </div>
        <div class="orderInfo" v-show="order.status == 5">
          <el-button type="danger"  disabled>订单退款中</el-button>
          <el-button type="success" @click="cancelRefund" >取消退款</el-button>
        </div>
        <div class="orderInfo" v-show="order.status == 6">
          <el-button type="success"  disabled>退款成功</el-button>
        </div>
        
      <!-- 支付宝前端响应界面 -->
      <div ref="alipayWap" v-html="alipay"> </div>
    </div>
    
  </el-card>
  </div>
</template>

<script>

import { payOrder } from '@/api/pay';
import { getOrder , cancelOrder ,confirmReceipt,requestRefund,cancelRefund} from '@/api/order';
import { mapState } from "vuex";

export default {
  name: "Pay",
  data() {
    return {
      order: {
        product:{
          name:'',
          image:''
        },
        address:{
          name:'',
          phone:'',
          address:'',
          addressDetail:''
        },
        size:'',
        quantity:'',
        amount:'',
        orderNumber:'',
        createTime:'',
        status:'',
        children:[]
      },
      alipay: '',
      value: 1,
      orderRemarks: '',
      value: true
    }
  },
  created() {
    // this.payOrder()
    this.getOrder()
  },
  computed: {
    orderNumber() {
      return this.$route.params.orderNumber
    },
    ...mapState(['user']),
  },
  methods: {
    getOrder(orderNumber = this.orderNumber) {
      const token = window.localStorage.getItem('adminToken') 
      const userId = this.user.id
      getOrder(token,orderNumber,userId).then(res => {
        if (res.code === 200) {
          this.order = res.data
          
        }else{
          console.log(this.order)
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
        const userId = this.user.id
        cancelOrder(token,orderNumber,userId).then(res => {
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
      const orderRemarks = this.orderRemarks
      payOrder(token,orderNumber,orderRemarks).then(res => {
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
    },
    confirmReceipt(){
      // 二次确认
      this.$confirm('您确定收到货物，将确认收货, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const token = window.localStorage.getItem('adminToken')
        const orderNumber = this.orderNumber
        const userId = this.user.id
        confirmReceipt(token,orderNumber,userId).then(res => {
          if (res.code === 200) {
            this.msgSuccess(res.msg)
            this.getOrder()
          }else{
            this.msgError(res.msg)
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
    requestRefund(){
      // 二次确认
      this.$confirm('您确定申请退款吗？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const token = window.localStorage.getItem('adminToken')
        const orderNumber = this.orderNumber
        const userId = this.user.id
        requestRefund(token,orderNumber,userId).then(res => {
          if (res.code === 200) {
            this.msgSuccess(res.msg)
            this.getOrder()
          }else{
            this.msgError(res.msg)
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
    cancelRefund(){
      // 二次确认
      this.$confirm('您确定取消退款吗？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const token = window.localStorage.getItem('adminToken')
        const orderNumber = this.orderNumber
        const userId = this.user.id
        cancelRefund(token,orderNumber,userId).then(res => {
          if (res.code === 200) {
            this.msgSuccess(res.msg)
            this.getOrder()
          }else{
            this.msgError(res.msg)
          }
        })
      }).catch((e) => {
        console.log(e)
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
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


.orderNumber {
  font-size: 10px;
  color: #999;
}

.orderPrice {
  font-size: 14px;
  color: red;
}
</style>