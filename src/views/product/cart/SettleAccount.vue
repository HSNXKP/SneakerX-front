<template>
  <div>
    <el-card>
      <h2 class="m-text-500"  style="text-align: center">SneakerX购物车结算</h2>
    <div class="ui  divider "></div>
    <div  v-if="this.cartList.length === 0">
      <el-empty description="暂无商品 赶紧加入购物车吧！"></el-empty>
    </div>
    <div  v-else>
      <div>
        <Address v-model="orderForm.address"   :addressId="cartAddressId"  @backAddress="getAddress($event)" />
      </div>
      <div class="ui divider"></div>
      <div v-for="(cart, index) in cartList" :key="index">
        <div class="orderInfo">
          <el-card class="imageInfo">
              <el-image style="width: 100%; height: 100%; padding: 0 0 0 0" :src="cart.image"></el-image>
          </el-card>
          <div>
            <div class="orderDetail">商品：{{ cart.name }}</div>
            <div class="orderDetail">尺码：{{ cart.size }}</div>
            <div class="orderDetail">货号：{{ cart.code }}</div>
            <div class="orderDetail">
              数量：
              <a>
                <i
                  @click="downQuantity(cart.id)"
                  class="el-icon-remove-outline"
                ></i>
              </a>
              {{ cart.quantity }}
              <a>
                <i
                  @click="addQuantity(cart.id)"
                  class="el-icon-circle-plus-outline"
                ></i>
              </a>
            </div>
            <div class="productNumber">
              <span style="color: red">￥{{ cart.price }}</span>
            </div>
            
          </div>
        </div>
      </div>
      <div class="orderDetail">
        <el-radio-group v-model="orderForm.payType">
              <el-radio label="1" size="mini" border disabled>微信</el-radio>
              <el-radio label="2" size="mini" border>支付宝</el-radio>
            </el-radio-group>
      </div>
  
      <div class="ui divider"></div>
      <span class="amountDetail"
        >合计:
        <span class="amount"> ￥{{ this.amount }} </span>
      </span>
      <div class="amounts">
        <el-button type="danger" @click="settleAccount" size="mini">提交订单</el-button>
      </div>
      <div></div>
    </div>
  </el-card>

</div>
</template>

<script>
import { getCartList } from '@/api/cart';
import { mapState } from "vuex";
import { addQuantity, downQuantity} from "@/api/cart";
import { order } from '@/api/order';
import Address from "@/components/address/Address";

export default {
  name: "SettleAccount",
  components: {Address},
  data() {
    return {
      cartList:[],
      amount:0,
      orderForm:{
        userId:'',
        address:'',
        payType:'2'
      },
    };
  },
  computed: {
    ...mapState(["user"]),
    cartAddressId(){
      return  parseInt(this.$route.params.id)
    }
  },
  created(){
    this.getCartList()
    this.cartSettleAccountAddress()
  },
  methods:{
    getCartList(){
      const token = window.localStorage.getItem('adminToken')
        const userId = this.user.id
        getCartList(token,userId).then(res => {
          if (res.code === 200) {
            this.cartList = res.data
            this.computeAmount(res.data)
          }else{
            this.msgError(res.msg);
          }
        })
    },
      // 计算总价
      computeAmount(data) {
      var amount = 0;
      for (var i = 0; i < data.length; i++) {
          amount = amount + data[i].amount;
          this.amount = amount;
      }
    },
    // 将当前购物车选中的id放到默认的地址上面去
    cartSettleAccountAddress(id = this.cartAddressId) {
          this.orderForm.address = id
    },
    addQuantity(id) {
      const token = window.localStorage.getItem("adminToken");
      const userId = this.user.id;
      addQuantity(token, id, userId).then((res) => {
        if (res.code == 200) {
          this.getCartList();
        } else {
          this.msgError(res.msg);
        }
      });
    },
    downQuantity(id) {
      const token = window.localStorage.getItem("adminToken");
      const userId = this.user.id;
      downQuantity(token, id, userId).then((res) => {
        if (res.code == 200) {
          this.getCartList();
        } else {
          this.msgError(res.msg);
        }
      });
    },
    settleAccount(){
            // 提交订单
          this.orderForm.userId = this.user.id
          // 购物车和单个商品公用一个接口 order：单个订单 cartOrder:购物车订单
          this.orderForm.type = 'cartOrder'
          const token = window.localStorage.getItem('adminToken') 
          if(this.orderForm.address == ''){
              return  this.msgError('请选择收货地址')
          }
          order(token,this.orderForm).then(res=>{
            if(res.code==200){
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
        },
        getAddress(address){
        this.orderForm.address = address
      }
        
  }
};
</script>

<style scoped>

.orderInfo {
  margin-bottom: 5px;
  display: flex;
}

.orderDetail {
  font-size: 12px;
  margin-left: 10px;
  color: #999;
}

.productCode {
  font-size: 12px;
  margin-left: 12.5px;
  color: #999;
  zoom: 0.8;
}

.productNumber {
  font-size: 14px;
  margin-left: 10px;
  color: #999;
}

.amount {
  font-size: 20px;
  color: red;
}

.amountDetail {
  margin-top: 5px;
  font-size: 14px;
  margin-left: 10px;
  float: right;
}

.amounts {
  text-align: right;
}

.productName {
  font-size: 12px;
  margin-left: 10px;
}
.imageInfo {
  margin-left: 10px;
  width: 185px;
  height: 120px;
}
</style>