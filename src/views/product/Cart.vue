<template>
   <div>
    <div class="ui top attached segment" style="text-align: center">
			<h2 class="m-text-500">我的购物车</h2>
		</div>
    <div class="ui attached segment m-padding-bottom-large" v-if="this.cartList.length === 0">
      <el-empty  description="暂无商品 赶紧加入购物车吧！"></el-empty></div>
    <div class="ui attached segment m-padding-bottom-large" v-else>
            <div >
              <el-select :vaule="value" placeholder="请选择收获地址" size="mini">
              <el-option >
                <span style="float: left">ss</span>
                <span style="float: right; color: #8492a6; font-size: 13px">ss</span>
              </el-option>
              <el-option  >
                <span style="float: left">没有收货地址</span>
              </el-option>
            </el-select>
            <el-button style="margin-left: 5px;" icon="el-icon-location-information" size="mini" circle></el-button>
            <el-button  size="mini">管理</el-button>
            </div>
      <div class="ui divider"></div>
      <div v-for="(item,index) in cartList" :key="index">
        <el-checkbox ></el-checkbox>
            <router-link style="margin-left:10px" :to="`/product/${item.productCategoryId}`" ><i class="el-icon-goods" style="color:red">{{ item.productCategoryName }}</i></router-link>
        <div class="orderInfo"  v-for="(cart,index) in item.cartList" :key="index">
          <el-checkbox v-model="cart.checked" ></el-checkbox>
              <el-card class="imageInfo">
            <el-image style=" width: 100%; height: 100%; padding: 0 0 0 0;" :src="cart.image">
            </el-image>
          </el-card>
          <div>
            <div class="orderDetail">
                商品：{{ cart.name }}
              </div>
              <div class="orderDetail">
               尺码：{{ cart.size }}
              </div>
              <div class="orderDetail">
              货号：{{ cart.code }}
              </div>
            <div class="orderDetail">
              数量：
              <a>
                <i class="el-icon-remove-outline"></i>
              </a>
                {{ cart.quantity }}
                <a>
                  <i @click="add(cart.id)" class="el-icon-circle-plus-outline"></i>
                </a>
              </div>
              <div class="productNumber">
                <span style="color: red;" >￥{{ cart.price }}</span>
              </div>
          </div>
        </div>
      </div>
      <div class="ui divider"></div>
        <span  class="amountDetail">合计:
          <span class="amount">
            ￥{{ this.amount }}
          </span>
          </span>
          <div class="amounts">
        <el-button type="danger" size="mini">结算</el-button>
      </div>
     <div>
     </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { cart } from '@/api/cart';

export default {
    name: "Cart",
    data() {
    return {
      value:1,
      cartList:[],
      amount: 0
    };
  },
  computed:{
    ...mapState(['user']),
  },
  created(){
    this.cart()
  },
  methods:{
    add(id){
      console.log(id)
    },
    cart(){
      const token = window.localStorage.getItem('adminToken') 
      const id = this.user.id
      cart(token,id).then(res=>{
            if(res.code==200){
              console.log(res.data)
              this.cartList=res.data
              this.computeAmount(res.data)
              console.log(this.cartList.length)
            }else{
              this.msgError(res.msg)
            }
          })
    },
    computeAmount(data){
      var amount = 0;
      for (var i = 0; i < data.length; i++) {
        console.log(data[i].cartList.length)
        for(var y = 0; y < data[i].cartList.length;y++){
          console.log(data[i].cartList[y].amount)
          amount = amount + data[i].cartList[y].amount
          this.amount = amount
        }
      }
    }

  },
}
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


.productCode{
  font-size: 12px;
  margin-left: 12.5px;
  color: #999;
  zoom: 0.8;
}

.productNumber{
  font-size: 14px;
  margin-left: 10px;
  color: #999;
}

.amount{
  font-size: 20px;
  color: red;
}

.amountDetail{
  margin-top: 5px;
  font-size: 14px;
  margin-left: 10px;
  float: right;
}

.amounts{
  text-align: right;
}



.productName{
  font-size: 12px;
  margin-left: 10px;
}
.imageInfo{
margin-left: 10px;
 width: 185px;
 height: 120px;
}

</style>