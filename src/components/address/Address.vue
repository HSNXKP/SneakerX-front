<template>
    <div>
        <el-select v-model="orderForm.address"  size="small" @change="exportAddress" placeholder="请选择收获地址">
            <el-option v-for="item in address" :key="item.id" :label="item.name + item.addressDetail" :value="item.id">
                <span style="float: left">{{ item.name + item.phone }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.addressDetail }}</span>
            </el-option>
            <el-option :key="''" :value="''" v-if="address.length == 0">
                <span style="float: left">没有收货地址</span>
            </el-option>
        </el-select>

        <el-button style="margin-left: 10px;" size="mini" icon="el-icon-location-information" circle
            @click="addAddressDialg"></el-button>
              <!--添加地址框-->
          <el-dialog title="添加新的收货地址" width="50%" :visible.sync="addAddressDialgVisible"
            :before-close="dialogVisibleClosed">
            <!--内容主体-->
            <el-form label-width="80px"  ref="formRef" :model="form" :rules="formRules">
              <el-form-item label="收货姓名" prop="name" style="margin-bottom: 20px;" >
                <el-input  v-model="form.name" ></el-input>
              </el-form-item>
              <el-form-item label="收货电话" prop="phone" style="margin-bottom: 20px;">
                <el-input  v-model="form.phone" ></el-input>
              </el-form-item>
              <el-form-item label="详情省市" prop="address" style="margin-bottom: 20px;">
                <el-cascader  :options='options' v-model='selectedAddress' @change='addressChange'></el-cascader>
              </el-form-item>
              <el-form-item label="详情地址"  prop="addressDetail" style="margin-bottom: 20px;">
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
    </div>
    
</template>

<script>
import { regionData, CodeToText } from 'element-china-area-data'
import { mapState } from "vuex";
import { saveAddress ,getAddressList } from '@/api/address' 
import { checkPhone } from '@/common/reg';

export default {
    name: "Address",
    props: {
        addressId: {
            required: true,
        },
    },
     data() {
        return {
            address: [],
            orderForm: {
                address: ''
            },
            addAddressDialgVisible: false,
            options: regionData,
            selectedAddress: [],
          // 添加收货地址表单
          form:{
              name:'',
               phone:'',
                address:'',
               addressDetail:'',
               isDefaultAddress:false,
              },     
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
        }
    },
    created(){
          this.getAddressList()
    },
	computed: {
    ...mapState(['user']),
    },
    methods: {
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
          this.formatData(res.data)
          this.address=res.data
          // 请求成功后将数据传递给父组件
          this.$emit('backAddress',this.orderForm.address)    //将数据传递给父组件
        }else{
          this.msgError(res.msg)
        }
      })
    },
    // 将当前登录的用户Id查询出来的收货地址放到默认的地址上面去
    formatData(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].isDefaultAddress === true) {
            if(this.addressId === ''){
                this.orderForm.address = data[i].id
            }else{
                this.orderForm.address = this.addressId
            }
        } 
      }
      return data
    },
    // 点击事件也返回父组件
    exportAddress(){
      this.$emit('backAddress',this.orderForm.address)
    },
    // 回显数据
    

    },
}
</script>

<style scoped>

</style>