<template>
   <div>
    <div class="ui top attached segment" style="text-align: center">
			<h2 class="m-text-500">我的购物车</h2>
		</div>
    
    <div class="ui attached segment m-padding-bottom-large">
    
            <div >
              <el-select placeholder="请选择收获地址" size="mini">
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

      <div >
        <el-checkbox ></el-checkbox>
            <router-link style="margin-left:10px" :to="`/tag/${ss}`" ><i class="el-icon-goods" style="color:red">Nike</i></router-link>
        <div class="orderInfo"  >
          <el-checkbox  ></el-checkbox>
              <el-card class="imageInfo">
            <el-image style=" width: 100%; height: 100%; padding: 0 0 0 0;" :src="url">
            </el-image>
          </el-card>
          <div>
            <div class="orderDetail">
                商品：熊猫dunk
              </div>
              <div class="orderDetail">
               尺码： 38
              </div>
              <div class="orderDetail">
              货号 ： CD5464-101
              </div>
            <div class="orderDetail">
              数量：
              <a>
                <i class="el-icon-remove-outline"></i>
              </a>
                {{this.quantity}}
                <a>
                  <i @click="add" class="el-icon-circle-plus-outline"></i>
                </a>
              </div>
              <div class="productNumber">
                <span style="color: red;" >￥3333</span>
              </div>
          
          </div>
        </div>

        <div class="orderInfo"  >
          <el-checkbox style="font-size:center" ></el-checkbox>
              <el-card class="imageInfo">
            <el-image style=" width: 100%; height: 100%; padding: 0 0 0 0;" :src="url">
            </el-image>
          </el-card>
          <div>
            <div class="orderDetail">
                商品：熊猫dunk
              </div>
              <div class="orderDetail">
               尺码： 38
              </div>
              <div class="orderDetail">
              货号 ： CD5464-101
              </div>
            <div class="orderDetail">
              数量：
              <a>
                <i class="el-icon-remove-outline"></i>
              </a>
                {{this.quantity}}
                <a>
                  <i @click="add" class="el-icon-circle-plus-outline"></i>
                </a>
              </div>
              <div class="productNumber">
                <span style="color: red;" >￥3333</span>
              </div>
          
          </div>
        </div>

      </div>
      <div class="ui divider"></div>
      <div >
        <el-checkbox ></el-checkbox>
            <router-link style="margin-left:10px" :to="`/tag/${ss}`" ><i class="el-icon-goods" style="color:red">Nike</i></router-link>
        <div class="orderInfo"  >
          <el-checkbox  ></el-checkbox>
              <el-card class="imageInfo">
            <el-image style=" width: 100%; height: 100%; padding: 0 0 0 0;" :src="url">
            </el-image>
          </el-card>
          <div>
            <div class="orderDetail">
                商品：熊猫dunk
              </div>
              <div class="orderDetail">
               尺码： 38
              </div>
              <div class="orderDetail">
              货号 ： CD5464-101
              </div>
            <div class="orderDetail">
              数量：
              <a>
                <i class="el-icon-remove-outline"></i>
              </a>
                {{this.quantity}}
                <a>
                  <i @click="add" class="el-icon-circle-plus-outline"></i>
                </a>
              </div>
              <div class="productNumber">
                <span style="color: red;" >￥3333</span>
              </div>
          
          </div>
        </div>

        <div class="orderInfo"  >
          <el-checkbox style="font-size:center" ></el-checkbox>
              <el-card class="imageInfo">
            <el-image style=" width: 100%; height: 100%; padding: 0 0 0 0;" :src="url">
            </el-image>
          </el-card>
          <div>
            <div class="orderDetail">
                商品：熊猫dunk
              </div>
              <div class="orderDetail">
               尺码： 38
              </div>
              <div class="orderDetail">
              货号 ： CD5464-101
              </div>
            <div class="orderDetail">
              数量：
              <a>
                <i class="el-icon-remove-outline"></i>
              </a>
                {{this.quantity}}
                <a>
                  <i @click="add" class="el-icon-circle-plus-outline"></i>
                </a>
              </div>


              <div class="productNumber">
                <span style="color: red;" >￥3333</span>
              </div>
          
          </div>
        </div>

      </div>

      <div class="ui divider"></div>
        <span  class="amountDetail">合计:
          <span class="amount">
            ￥3333
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
export default {
    name: "Cart",
    data() {
    return {
      url: "https://img.picgo.net/2023/04/04/Nike-SB-Dunk-Low-Supreme-Black-Product7bd22cfa854e06f9.webp",
      value:'',
      quantity : 1
    };
  },
  methods:{
    add(){
      this.quantity = this.quantity + 1
    }
  }

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