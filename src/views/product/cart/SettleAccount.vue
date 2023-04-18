<template>
  <div>
    <el-card>
      <h2 class="m-text-500"  style="text-align: center">SneakerX购物车结算</h2>
    <!-- <div class="ui attached segment m-padding-bottom-large" >
      <el-empty description="暂无订单，快去下单吧！" ></el-empty>
    </div> -->
    <div class="ui  divider "></div>
    <div  v-if="this.cartList.length === 0">
      <el-empty description="暂无商品 赶紧加入购物车吧！"></el-empty>
    </div>
    <div  v-else>
      <div>
        <el-select v-model="orderForm.address" placeholder="请选择收获地址">
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
import { regionData, CodeToText } from "element-china-area-data";
import { saveAddress, getAddressList } from "@/api/address";
import { checkPhone } from "@/common/reg";
import { getCartList } from '@/api/cart';
import { mapState } from "vuex";
import { addQuantity, downQuantity} from "@/api/cart";
import { order } from '@/api/order';

export default {
  name: "SettleAccount",
  data() {
    return {
      cartList:[],
      amount:0,
      orderForm:{
        userId:'',
        address:'',
        payType:'2'
      },
      form: {
        name: "",
        phone: "",
        address: "",
        addressDetail: "",
        isDefaultAddress: false,
      },
      address : [],
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
      addAddressDialgVisible: false,
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
    this.getAddressList()
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
    getAddressList() {
      const id = this.user.id;
      const token = window.localStorage.getItem("adminToken");
      getAddressList(token, id).then((res) => {
        if (res.code == 200) {
          this.address = res.data;
        } else {
          this.msgError(res.msg);
        }
      });
    },
    // 将当前购物车选中的id放到默认的地址上面去
    cartSettleAccountAddress(id = this.cartAddressId) {
      console.log(this.cartAddressId)
          this.orderForm.address = id
          console.log(this.addressId)
    },
    addAddressDialg() {
      this.addAddressDialgVisible = true;
    },
    dialogVisibleClosed() {
      this.addAddressDialgVisible = false;
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
          console.log(this.orderForm)
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