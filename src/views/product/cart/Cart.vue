<template>
  <div>
    <el-card>
      <h2 class="m-text-500" style="text-align: center">我的购物车</h2>
    <div class="ui  divider "></div>
    <div v-if="this.cartList.length === 0">
      <el-empty description="暂无商品 赶紧加入购物车吧！"></el-empty>
    </div>
    <div v-else>
      <div>
        <el-select v-model="addressId" placeholder="请选择收获地址">
          <el-option
            v-for="item in address"
            :key="item.id"
            :label="item.name + item.addressDetail"
            :value="item.id"
          >
            <span style="float: left">{{ item.name + item.phone }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              item.addressDetail
            }}</span>
          </el-option>
          <el-option :key="''" :value="''" v-if="address.length == 0">
            <span style="float: left">没有收货地址</span>
          </el-option>
        </el-select>
        <el-button
          style="margin-left: 5px"
          icon="el-icon-location-information"
          size="mini"
          circle
          @click="addAddressDialg"
        ></el-button>
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

      <!--添加地址框-->
      <el-dialog
        title="添加新的收货地址"
        width="50%"
        :visible.sync="addAddressDialgVisible"
        :before-close="dialogVisibleClosed"
      >
        <!--内容主体-->
        <el-form
          label-width="80px"
          ref="formRef"
          :model="form"
          :rules="formRules"
        >
          <el-form-item label="收货姓名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="收货电话" prop="phone">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="详情省市" prop="address">
            <el-cascader
              :options="options"
              v-model="selectedAddress"
              @change="addressChange"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="详情地址" prop="addressDetail">
            <el-input v-model="form.addressDetail"></el-input>
          </el-form-item>
          <el-form-item style="float: left" label="默认地址">
            <el-switch v-model="form.isDefaultAddress"></el-switch>
          </el-form-item>
        </el-form>
        <!--底部-->
        <span slot="footer">
          <el-button type="primary" @click="saveAddress">确 定</el-button>
          <el-button @click="dialogVisibleClosed">取 消</el-button>
        </span>
      </el-dialog>

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
import { regionData, CodeToText } from "element-china-area-data";
import { mapState } from "vuex";
import { saveAddress, getAddressList } from "@/api/address";
import { checkPhone } from "@/common/reg";
import {
  cart,
  deleteCart,
  addQuantity,
  downQuantity,
  changeproductCategoryIdChecked,
  changeCaetIdChecked,
} from "@/api/cart";

export default {
  name: "Cart",
  data() {
    return {
      value: 1,
      cartList: [],
      amount: 0,
      address: [],
      addressId: "",
      // 添加收货地址表单
      addAddressDialgVisible: false,
      form: {
        name: "",
        phone: "",
        address: "",
        addressDetail: "",
        isDefaultAddress: false,
      },
      options: regionData,
      selectedAddress: [],
      // 校验
      formRules: {
        name: [
          { required: true, message: "请输入收货人姓名", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入收货人电话", trigger: "blur" },
          { validator: checkPhone },
        ],
        addressDetail: [
          { required: true, message: "请输入收货人详细地址", trigger: "blur" },
        ],
      },
      deleteCartVisable: false,
      checked: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    this.cart();
    this.getAddressList();
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
    addAddressDialg() {
      this.addAddressDialgVisible = true;
    },
    dialogVisibleClosed() {
      this.addAddressDialgVisible = false;
    },
    // 保存地址
    saveAddress() {
      const token = window.localStorage.getItem("adminToken");
      // 获得user的id
      const id = this.user.id;
      // 转换成Long类型
      saveAddress(token, this.form, id).then((res) => {
        if (res.code == 200) {
          this.msgSuccess(res.msg);
          // 清空表单 因为没有ref 所以只能这样清空
          this.form = {};
          // 关闭弹窗
          this.dialogVisibleClosed();
          // 更新收货地址
          this.getAddressList();
        } else {
          this.msgError(res.msg);
        }
      });
    },
    // 省市区联动
    addressChange(arr) {
      // console.log(this.selectedOptions) //  Proxy {0: '120000', 1: '120100', 2: '120101'}
      // console.log(arr) //  Proxy {0: '120000', 1: '120100', 2: '120101'}  和上句一样
      // addressText为el-cascader的值 北京市 市辖区 朝阳区
      var addressText =
        CodeToText[arr[0]] + CodeToText[arr[1]] + CodeToText[arr[2]];
      this.form.address = addressText;
    },
    // 获取当前用户的收货地址
    getAddressList(id = this.user.id) {
      const token = window.localStorage.getItem("adminToken");
      getAddressList(token, id).then((res) => {
        if (res.code == 200) {
          this.formatData(res.data);
          this.address = res.data;
        } else {
          this.msgError(res.msg);
        }
      });
    },
    // 将当前登录的用户Id查询出来的收货地址放到默认的地址上面去
    formatData(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].isDefaultAddress === true) {
          this.addressId = data[i].id;
        }
      }
      return data;
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

    // computedDeleteId(data){
    //   const checked = []
    //   for (var i = 0; i < data.length; i++) {
    //     if(data[i].checked){
    //       checked
    //     }else{
    //       for(var y = 0; y < data[i].cartList.length;y++){
    //       checked[y] = data[i].cartList[y].checked
    //       this.amount = amount
    //     }
    //     }
    //   }
    // }
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