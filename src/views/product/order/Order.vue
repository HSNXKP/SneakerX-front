<template>
  <div>
    <el-card>
      <h2 class="m-text-500" style="text-align: center">订单管理</h2>
    <div class="ui  divider"></div>
      <el-empty description="暂无订单，快去下单吧！" v-if="orderList.length === 0"></el-empty>
      <div style="margin-bottom:  10px;" v-if="!orderList.length === 0">
        <el-button type="danger" size="mini" @click="deleteOrder" >删除订单</el-button>
        <el-button type="danger" size="mini" v-if="this.value" @click="cancelDelete">确定删除</el-button>
        <el-button type="danger" size="mini" v-if="this.value" @click="cancelDelete">取消</el-button>
      </div>
      <div v-for="(item, index) in orderList" :key="index">
          <el-checkbox style="font-size:center" v-if="value"></el-checkbox>
          <span style="color: #999;">
              下单时间：{{ item.createTime | dateFormat('YYYY-MM-DD HH:mm') }}
            </span>
          <span style="color: #999;" v-if="item.status === 0 ">
              订单状态：未支付
            </span>
            <span style="color: #999;" v-if="item.status === 1 ">
              订单状态：已支付
            </span>
            <span style="color: #999;" v-if="item.status === 2 ">
              订单状态：已发货
            </span>
            <span style="color: #999;" v-if="item.status === 3 ">
              订单状态：已完成
            </span>
            <span style="color: #999;" v-if="item.status === 4 ">
              订单状态：已取消
            </span>
            <span style="color: red;float: right;" >
             ￥{{ item.amount }}
            </span>
        <div class="orderInfo" v-show="item.children.length === 0" >
              <el-card class="imageInfo">
                <router-link :to="`/pay/${item.orderNumber}`" > <el-image style=" width: 100%; height: 100%; padding: 0 0 0 0;" :src="item.image"></el-image></router-link>
          </el-card>
          <div>
            <div class="orderDetail">
                商品名称：{{ item.name }}
              </div>
              <div class="orderDetail">
                商品货号：{{ item.code }}
              </div>
              <div class="orderDetail">
                商品尺码：{{ item.size }}
              </div>
            <div class="orderDetail">
                商品数量：x{{ item.quantity }}
              </div>
              <div class="orderDetail" style="color: red">
                商品单价：{{ item.price }}
              </div>
              <div class="orderDetail" style="color: red">
                商品总价：{{ item.amount }}
              </div>
          </div>
        </div>
        <div class="orderInfo" v-show="item.children.length > 0" v-for="(children, index) in item.children" :key="index">
              <el-card class="imageInfo" >
            <router-link :to="`/pay/${item.orderNumber}`" ><el-image style=" width: 100%; height: 100%; padding: 0 0 0 0;" :src="children.image"></el-image></router-link>
          </el-card>
          <div>
            <div class="orderDetail">
                商品名称：{{ children.name }}
              </div>
              <div class="orderDetail" >
                商品货号：{{ children.code }}
              </div>
              <div class="orderDetail">
                商品尺码：{{ children.size }}
              </div>
            <div class="orderDetail">
                商品数量：x{{ children.quantity }}
              </div>
              <div class="orderDetail" style="color: red">
                商品单价：{{ children.price }}
              </div>
              <div class="orderDetail" style="color: red">
                商品总价：{{ children.amount }}
              </div>

          </div>
        </div>
        <div class="ui  divider"></div>
      </div>
  </el-card>

  </div>
</template>

<script>
import { getOrderList } from '@/api/order';
import { mapState } from "vuex";

export default {
  name: "Order",
  data() {
    return {
      value:false,
      orderList:[]
    };
  },
  created() {
    this.getOrderList()
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    getOrderList(id = this.user.id){
      const token = window.localStorage.getItem('adminToken') 
      console.log(token)
      getOrderList(token,id).then(res => {
        if (res.code === 200) {
          this.orderList=res.data
        }else{
          this.msgError(res.msg)
        }
      })
    },
    deleteOrder(){
      this.value = true
    },
    cancelDelete(){
      this.value = false
    }
  },
};
</script>

<style scoped>
.orderInfo{
  margin-bottom: 5px;
  display: flex;
}


.orderDetail{
  font-size: 12px;
  margin-left: 10px;
  color: #999;
}
.imageInfo{
margin-left: 10px;
 width: 185px;
 height: 120px;
}
</style>