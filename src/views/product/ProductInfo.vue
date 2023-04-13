<template>
  <div>
    <div class="ui top attached segment" style="text-align: center">
      <h2 class="m-text-500">{{ this.product.name }}</h2>
    </div>
    <div class="ui attached segment m-padding-bottom-large">
      <div class="ui divided items">
        <div class="imageInfo">
          <img :src=this.product.image />
        </div>
        <div class="ui divider"></div>
        <el-card shadow="always" style="text-align: center;">当前最低售出价格: <strong style="color: red;">{{  '￥' + this.product.price }}</strong></el-card>
        <div class="ui divider"></div>
         <!-- 订单表 -->
        <el-form ref="orderFormRef" :model="orderForm"  label-width="90px">
          <el-form-item label="选择尺码">
            <el-select v-model="orderForm.sizeWithPrice" placeholder="请选择您的尺码">
              <el-option v-for="item in sizeWithPrice" :key="item.id" :label="item.name" :value="item.id">
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: red; font-size: 13px">{{ '￥' + item.productPrice }}</span>
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="即时配送">
            <el-switch v-model="orderForm.delivery"></el-switch>
            <span class="delivery">（开启后48小时内紧急发货）</span>
          </el-form-item>

          <el-form-item label="默认地址">
            <el-switch v-model="orderForm.isDefaultAddress"></el-switch>
            <span class="address">（设置当前选择地址为默认地址）</span>
          </el-form-item>

          <el-form-item label="收货地址">
            <el-select v-model="orderForm.address" placeholder="请选择收获地址" >
              <el-option v-for="item in address" :key="item.id" :label="item.name + item.addressDetail" :value="item.id">
                <span style="float: left">{{ item.name + item.phone }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.addressDetail }}</span>
              </el-option>
              <el-option  :key="''"  :value=" ''"  v-if="address.length == 0">
                <span style="float: left">没有收货地址</span>
              </el-option>
            </el-select>
            <el-button style="margin-left: 5px;" icon="el-icon-location-information" circle @click="addAddressDialg"></el-button>
          </el-form-item>

          <!--添加地址框-->
          <el-dialog title="添加新的收货地址" width="50%" :visible.sync="addAddressDialgVisible"
            :before-close="dialogVisibleClosed">
            <!--内容主体-->
            <el-form label-width="80px"  ref="formRef" :model="form" :rules="formRules">
              <el-form-item label="收货姓名" prop="name" >
                <el-input  v-model="form.name" ></el-input>
              </el-form-item>
              <el-form-item label="收货电话" prop="phone" >
                <el-input  v-model="form.phone" ></el-input>
              </el-form-item>
              <el-form-item label="详情省市" prop="address" >
                <el-cascader  :options='options' v-model='selectedAddress' @change='addressChange'></el-cascader>
              </el-form-item>
              <el-form-item label="详情地址"  prop="addressDetail">
                <el-input  v-model="form.addressDetail"></el-input>
              </el-form-item>
              <el-form-item style="float: left;"  label="默认地址" >
					      <el-switch v-model="form.isDefaultAddress" ></el-switch>
			      	</el-form-item>
            </el-form>
            <!--底部-->
            <span slot="footer">
              <el-button type="primary" @click="saveAddress">确 定</el-button>
              <el-button @click="dialogVisibleClosed">取 消</el-button>
            </span>
          </el-dialog>

          <el-form-item label="支付方式">
            <el-radio-group v-model="orderForm.payType">
              <el-radio label="1" size="mini" border disabled>微信</el-radio>
              <el-radio label="2" size="mini" border>支付宝</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="选择数量">
            <el-input-number size="mini" v-model="orderForm.quantity"  :min="1" :max="5" ></el-input-number>
            <span class="purchaseRestrictions">（该商品限购{{ this.product.purchaseRestrictions }}件）</span>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="submitOrder" size="medium">立即购买</el-button>
            <el-button size="medium" @click="addProductToCart">加入购物车</el-button>
          </el-form-item>
        </el-form>
        <el-collapse v-model="activeNames">
          <el-collapse-item name="1">
            <template slot="title">
              <span class="productDescription">
                <i class="icon  el-icon-sell"></i>
                商品描述 Description </span>
            </template>
            <div v-html="this.product.description"></div>
          </el-collapse-item>
          <el-collapse-item name="3">
            <template slot="title">
              <span class="collapseText">
                <i class="icon el-icon-circle-check"></i>
                已通过SneakerX鉴定 </span>
            </template>
            <div>
              “经过 已通过SneakerX鉴定
              鉴定”是我们自己的称谓和做法，表示我们每次都会对每件商品进行检查。
            </div>
          </el-collapse-item>
          <el-collapse-item name="4">
            <template slot="title">
              <span class="collapseTextCommitment">
                <i class="icon el-icon-star-on"></i>
                我们的承诺 </span>
            </template>
            <!-- <svg viewBox="0 0 18 23" focusable="false" class="icon"><path d="M8.75 20L8.51136 19.9219C0.238637 16.9531 0 10.7812 0 10.5469V2.03125L8.75 0L17.5 2.03125V10.4688C17.5 10.7812 17.2614 16.9531 8.98864 19.8438L8.75 20ZM1.19318 2.96875V10.4688C1.19318 10.7031 1.43182 16.0156 8.75 18.6719C16.0682 16.0156 16.3068 10.625 16.3068 10.4688V2.96875L8.75 1.17188L1.19318 2.96875Z" fill="black"></path><path d="M13.9204 8.35937C13.9204 6.875 12.7272 5.625 11.1363 5.625C10.1022 5.625 9.30677 6.40625 8.67041 7.26563C8.11359 6.40625 7.31814 5.625 6.2045 5.625C4.69314 5.625 3.42041 6.79687 3.42041 8.35937C3.42041 8.67187 3.49996 9.0625 3.5795 9.29687C4.05677 10.8594 8.59086 14.6875 8.59086 14.6875C8.59086 14.6875 13.125 10.8594 13.6022 9.29687C13.8409 8.98437 13.9204 8.67187 13.9204 8.35937Z" fill="black"></path></svg> -->
            <div  >
              我们致力于赢得并保持你对我们的信任。如果我们出了错，我们会立即更正。
            </div>
          </el-collapse-item>
        </el-collapse>
        
        <div style="margin-top:10px">
          <strong>商品详情</strong>
          <div class="productDetails">
            <ul class="productDetailsUl">
              <li>货号 : <strong>{{ this.product.code }}</strong></li>
              <li>配色：<strong>{{ this.product.color }}</strong></li>
              <li>零售价：<strong>{{ '￥' + this.product.retail}}</strong></li>
              <li>发布日期：<strong>{{ this.product.createTime | dateFormat('YYYY-MM-DD') }}</strong></li>
            </ul>
          </div>
        </div>
        <div class="ui divider"></div>
      </div>
    </div>
  </div>
</template>

<script>

import { regionData, CodeToText } from 'element-china-area-data'
import { saveAddress ,getAddressList } from '@/api/address' 
import { getProductSizeWithPriceByProductId } from '@/api/productSize'
import { mapState } from "vuex";
import { checkPhone } from '@/common/reg';
import { getProductById } from '@/api/product';
import { addCart } from '@/api/cart';
import { order } from '@/api/order';

export default {
  name: "ProductInfo",
  data() {
    return {
      activeNames: ["1"],
      address: [],
      // 用于展示当前userId的收获地址 和当前productId的商品信息
      sizeWithPrice:[],
      addAddressDialgVisible: false,
      orderForm: {
        userId: '',
        productId: '',
        payType:'2',
        sizeWithPrice:'',
        delivery:false,
        isDefaultAddress:false,
        address: '',
        quantity: 1,
      },
      // 添加收货地址表单
      form:{
        name:'',
        phone:'',
        address:'',
        addressDetail:'',
        isDefaultAddress:false,
      },
      options: regionData,
      selectedAddress:[],
      formRules: {
				name: [
					{ required: true, message: '请输入收货人姓名', trigger: 'blur' },
				],
				phone: [
					{ required: true, message: '请输入收货人电话', trigger: 'blur' },
          {validator:checkPhone}
				],
				addressDetail: [
					{ required: true, message: '请输入收货人详细地址', trigger: 'blur' },
				]
			},
      product:{},
    }
  },
  created(){
    this.getProductById()
    if(this.user){
          this.getAddressList()
        }
    this.getProductSizeWithPriceByProductId()
  },
	computed: {
    ...mapState(['user']),
    productId(){
      return parseInt(this.$route.params.id)
    }
    },
    beforeRouteUpdate(to, from, next) {
			// 在路由 beforeRouteUpdate 中判断路径是否改变
			// 如果跳转到其它页面，to.path!==from.path 就放行 next()
			if (to.path !== from.path) {
        // 请求商品详情
				this.getProductById(to.params.id)
         // 如果用户登录了 请求用户收货地址 
         if(this.user){
          this.getAddressList()
         }
         // 请求当前的商品关联的价格尺码
        this.getProductSizeWithPriceByProductId(to.params.id)
				next()
			}
		},
  methods: {
    // 提交订单
    submitOrder() {
      this.orderForm.userId = this.user.id
      this.orderForm.productId = this.productId
      const token = window.localStorage.getItem('adminToken') 
      console.log(this.orderForm)
      if(this.orderForm.address == ''){
          return  this.msgError('请选择收货地址')
      }
      if(this.orderForm.sizeWithPrice == ''){
          return  this.msgError('请选择购买的商品尺码')
      }
      this.$refs.orderFormRef.validate((valid) => {
        if (valid) {
          order(token,this.orderForm).then(res=>{
            if(res.code==200){
            this.$refs.orderFormRef.resetFields();
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
      });
    },
    // 加入购物车
    addProductToCart() {
      this.orderForm.userId = this.user.id
      this.orderForm.productId = this.productId
      const token = window.localStorage.getItem('adminToken') 
      if(this.orderForm.sizeWithPrice == ''){
          return  this.msgError('请选择购买的商品尺码')
      }
      this.$refs.orderFormRef.validate((valid) => {
        if (valid) {
          addCart(token,this.orderForm).then(res=>{
            if(res.code==200){
              this.$notify({
							title: res.msg,
							type: 'success'
						})
            }else{
              this.$notify({
							title: res.msg,
							type: 'warning'
						})
            }
          })
        } 
      });
      console.log(this.orderForm);
    },
    addAddressDialg() {
      this.addAddressDialgVisible = true;
    },
    dialogVisibleClosed() {
      this.addAddressDialgVisible = false;
    },
    // 省市区联动
    addressChange (arr) {
		      // console.log(this.selectedOptions) //  Proxy {0: '120000', 1: '120100', 2: '120101'}
		      // console.log(arr) //  Proxy {0: '120000', 1: '120100', 2: '120101'}  和上句一样
          // addressText为el-cascader的值 北京市 市辖区 朝阳区
			  var addressText=CodeToText[arr[0]]+CodeToText[arr[1]]+CodeToText[arr[2]]
        console.log(this.form.address)
			  console.log(addressText) 
        this.form.address=addressText
	  },
    // 保存地址
    saveAddress(){
      const token = window.localStorage.getItem('adminToken') 
      // 获得user的id
      const id = this.user.id
      // 转换成Long类型
      saveAddress(token,this.form,id).then(res=>{
        if(res.code==200){
          this.msgSuccess(res.msg)
          // 清空表单 因为没有ref 所以只能这样清空
          this.form = {}
          // 关闭弹窗
          this.dialogVisibleClosed()
          // 更新收货地址
          this.getAddressList()
        }else{
          this.msgError(res.msg)
        }
      })
    },
    // 获取当前用户的收货地址
    getAddressList(id = this.user.id){
      const token = window.localStorage.getItem('adminToken') 
      getAddressList(token,id).then(res=>{
        if(res.code==200){
          console.log(res.data)
          this.formatData(res.data)
          this.address=res.data
        }else{
          this.msgError(res.msg)
        }
      })
    },
    // 将当前登录的用户Id查询出来的收货地址放到默认的地址上面去
    formatData(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].isDefaultAddress === true) {
          this.orderForm.address = data[i].id
        } 
      }
      return data
    },
    // 获得当前商品的尺码和价格
    getProductSizeWithPriceByProductId(id = this.productId){
      getProductSizeWithPriceByProductId(id).then(res=>{
        if(res.code==200){
          console.log(res.data)
          // 传值需要传到data中的数据 ，传给后端订单需要一个确切的值
          this.sizeWithPrice= res.data
        }else{
          this.msgError(res.msg)
        }
      })
    },
    // 获得当前商品的详情
    getProductById(id = this.productId){
      getProductById(id).then(res=>{
        if(res.code==200){
          console.log(res.data)
          // 传值需要传到data中的数据 ，传给后端订单需要一个确切的值
          this.product= res.data
        }else{
          this.msgError(res.msg)
        }
      })
    },
    

    
  } 
};
</script>

<style scoped>
.imageInfo {
  text-align: center;
}

.collapseText {
  font-size: 12px;
  color: rgb(212, 27, 27);
}

.collapseTextCommitment {
  font-size: 12px;
  color: green;
}

.productDetails {
  font-size: 12px;
}

.productDetailsUl {
  padding-left: 0.4rem;
  list-style-type: none;
}

.productDescription {
  font-size: 12px;
  color: blueviolet;
}
/* 限购 */
.purchaseRestrictions{
  font-size: 10px;
  zoom: 0.8;
  color: red;
}
.delivery{
  font-size: 10px;
  zoom: 0.8;
  color: red;
} 
.address{
  font-size: 10px;
  zoom: 0.8;
  color: red;
}
</style>