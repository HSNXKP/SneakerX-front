<template>
  <div>
    <el-card>
      <h2 class="m-text-500" style="text-align: center">我的购物车</h2>
    <div class="ui  divider "></div>
    <div v-if="this.cartList.length === 0">
      <el-empty description="暂无商品 赶紧加入购物车吧！"></el-empty>
    </div>
    <div v-else>
      <div  style="display: flex;">
        <Address v-model="addressId"   :addressId="addressId" @backAddress="getAddress($event)" />
        <div style="margin-left: 10px; display:flex;align-items: center;justify-content: center;" >
          <el-button size="mini" @click="changeDeteleCart">管理</el-button>
        <template v-if="deleteCartVisable">
          <el-button
            size="mini"
            type="danger"
            @click="deleteCartByProductCategoryId"
            >删除</el-button
          >
          <el-button size="mini" @click="cancelDeteleCart">取消</el-button>
        </template>
        </div>
      
      </div>

      <div class="ui divider"></div>
      <div v-for="(item, index) in cartList" :key="index">
        <el-checkbox
          v-model="item.checked"
          @change="changeproductCategoryIdChecked(item)"
        ></el-checkbox>

        <router-link
          style="margin-left: 10px"
          :to="`/product/${item.productCategoryId}`"
          ><i class="el-icon-goods" style="color: red">{{
            item.productCategoryName
          }}</i></router-link
        >
        <div
          class="orderInfo"
          v-for="(cart, index) in item.cartList"
          :key="index"
        >
          <el-checkbox
            v-model="cart.checked"
            @change="changeCaetIdChecked(cart)"
          ></el-checkbox>
          <i
            class="el-icon-remove"
            style="color: red; padding-top: 4px; margin-left: 4px"
            v-if="deleteCartVisable"
            @click="deleteCart(cart.id)"
          ></i>
          <el-card class="imageInfo">
            <router-link :to="`/productInfo/${cart.productId}`">
              <el-image
                style="width: 100%; height: 100%; padding: 0 0 0 0"
                :src="cart.image"
              ></el-image
            ></router-link>
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
      <div class="ui divider"></div>
      <span class="amountDetail"
        >合计:
        <span class="amount"> ￥{{ this.amount }} </span>
      </span>
      <div class="amounts">
        <el-button type="danger" @click="settleAccount" size="mini">结算</el-button>
      </div>
      <div></div>
    </div>
  </el-card>
 </div>
</template>

<script>
import { mapState } from "vuex";
import {
  cart,
  deleteCart,
  addQuantity,
  downQuantity,
  changeproductCategoryIdChecked,
  changeCaetIdChecked,
} from "@/api/cart";
import Address from "@/components/address/Address";

export default {
  name: "Cart",
  components: {Address},
  data() {
    return {
      value: 1,
      cartList: [],
      amount: 0,
      // 校验
      deleteCartVisable: false,
      checked: false,
      addressId: '',
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    this.cart();
  },
  methods: {
    addQuantity(id) {
      const token = window.localStorage.getItem("adminToken");
      const userId = this.user.id;
      addQuantity(token, id, userId).then((res) => {
        if (res.code == 200) {
          this.cart();
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
          this.cart();
        } else {
          this.msgError(res.msg);
        }
      });
    },
    cart() {
      const token = window.localStorage.getItem("adminToken");
      const userId = this.user.id;
      cart(token, userId).then((res) => {
        if (res.code == 200) {
          this.cartList = res.data;
          this.computeAmount(res.data);
          this.computeIsChecked(res.data);
        } else {
          this.msgError(res.msg);
        }
      });
    },
    // 计算总价
    computeAmount(data) {
      var amount = 0;
      for (var i = 0; i < data.length; i++) {
        for (var y = 0; y < data[i].cartList.length; y++) {
          amount = amount + data[i].cartList[y].amount;
          this.amount = amount;
        }
      }
    },
    // 计算每次结算的时候是否有选中的状态
    computeIsChecked(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].checked) {
          this.checked = true;
        } else {
          this.checked = false;
        }
        for (var y = 0; y < data[i].cartList.length; y++) {
          if (data[i].cartList[y].checked) {
            this.checked = true;
          } else {
            this.checked = false;
          }
        }
      }
    },
    // 方法不同 接口相同 通过当前的type来判断 productCategoryId是分类下的所有商品
    changeproductCategoryIdChecked(data) {
      console.log(data);
      const id = data.productCategoryId;
      const token = window.localStorage.getItem("adminToken");
      const userId = this.user.id;
      const type = "productCategoryId";
      const checked = data.checked;
      changeproductCategoryIdChecked(token, id, type, userId, checked).then(
        (res) => {
          if (res.code == 200) {
            this.cart();
          } else {
            this.msgError(res.msg);
          }
        }
      );
    },
    // 方法不同 接口相同 通过当前的type来判断 cartId单个商品
    changeCaetIdChecked(data) {
      const id = data.id;
      const token = window.localStorage.getItem("adminToken");
      const userId = this.user.id;
      const type = "cartId";
      const checked = data.checked;
      changeCaetIdChecked(token, id, type, userId, checked).then((res) => {
        if (res.code == 200) {
          this.cart();
        } else {
          this.msgError(res.msg);
        }
      });
    },
    changeDeteleCart() {
      this.deleteCartVisable = true;
    },
    cancelDeteleCart() {
      this.deleteCartVisable = false;
    },
    deleteCart(id) {
      this.$confirm("确定删除该商品？ 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          const token = window.localStorage.getItem("adminToken");
          const userId = this.user.id;
          const type = 'deleteCartByCartId'
          deleteCart(token, id, userId,type).then((res) => {
            if (res.code == 200) {
              this.msgSuccess(res.msg);
              this.cart()
            } else {
              this.msgError(res.msg);
            }
          });
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    deleteCartByProductCategoryId() {
      this.$confirm("确定删除选中的商品吗？ 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          const id = 0
          const token = window.localStorage.getItem("adminToken");
          const userId = this.user.id;
          const type = 'deleteCartByProductCategoryId'
          deleteCart(token,id,userId,type).then((res) => {
            if (res.code == 200) {
              this.msgSuccess(res.msg);
              this.cart()
            } else {
              this.msgError(res.msg);
            }
          });
        }).catch((e) => {
          console.console(e)
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      console.log(this.cartList);
    },
    settleAccount(){
      if(this.checked == false){
        this.$message({
          type: "error",
          message: "请勾选结算的商品",
        });
        return
      }
      this.$router.push({path:`/settleAccount/${this.addressId}`})
    },
    getAddress(address){
      this.addressId = address
    }
  },
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