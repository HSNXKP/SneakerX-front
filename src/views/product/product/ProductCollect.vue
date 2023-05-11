<template>
    <div>
      <el-card>
        <h2 class="m-text-500" style="text-align: center">商品收藏</h2>
      <div class="ui  divider "></div>
      <div v-if="this.productCollectList.length === 0">
        <el-empty description="暂无商品 赶紧去收藏商品吧！"></el-empty>
      </div>
      <div v-else>
        <div>
          <el-button size="mini" @click="deleteCollectProduct">管理</el-button>
          <template v-if="deleteProductVisable">
            <el-button
              size="mini"
              type="danger"
              >删除</el-button
            >
            <el-button size="mini" @click="cancelDeteleCollectProduct">取消</el-button>
          </template>
        </div>
        <div class="ui divider"></div>
        <div >
            <!-- <el-checkbox
          v-model="checked"
          @change="checkedAllProductCollect()"
          v-if="deleteProductVisable" >全选</el-checkbox> -->
          <div
            class="productInfo"
            v-for="(product, index) in this.productCollectList"
            :key="index"
          >
          <!-- <el-checkbox
          v-model="product.checked"
          @change="checkedProductCollect(product)"
          v-if="deleteProductVisable" ></el-checkbox> -->
            <i
              class="el-icon-remove"
              style="color: red; padding-top: 4px; margin-left: 4px"
              v-if="deleteProductVisable"
              @click="cancelCollectProduct(product.id)"></i>
            <el-card class="imageInfo">

              <router-link :to="`/productInfo/${product.id}`">
                <el-image
                  style="width: 100%; height: 100%; padding: 0 0 0 0"
                  :src="product.image"
                ></el-image
              ></router-link>
            </el-card>
            <div>
              <div class="productDetail">商品：{{ product.name }}</div>
              <div class="productDetail">货号：{{ product.code }}</div>
            </div>
          </div>
        </div>
        <div class="ui divider"></div>
      </div>
    </el-card>
   </div>
  </template>
  
  <script>
  import {getProductCollect} from "@/api/user";
  import {cancelCollectProduct} from "@/api/product";
  import { mapState } from "vuex";

  export default {
    name: "ProductCollect",
    data() {
      return {
        productCollectList: [],
        deleteProductVisable: false,
        checked: 0,
      };
    },
    computed: {
      ...mapState(["user"]),
    },
    created() {
      this.getProductCollect();
    },
    methods: {
      getProductCollect(){
        const token = window.localStorage.getItem("adminToken");
        const userId = this.user.id;
        getProductCollect(token,userId).then(res => {
          if (res.code == 200) {
            this.productCollectList = res.data
          }else{
            this.msgError(res.msg);
          }
        });
      },
      deleteCollectProduct(){
        this.deleteProductVisable = true;
      },
      cancelDeteleCollectProduct(){
        this.deleteProductVisable = false;
      },
      cancelCollectProduct(id){
        const token = window.localStorage.getItem("adminToken");
        const userId = this.user.id;
        const productId = id;
        cancelCollectProduct(token,userId,productId).then(res=>{
          if(res.code==200){
            this.getProductCollect()
          }
        })
      }
    },
  };
  </script>
  
  <style scoped>
  .productInfo {
    margin-bottom: 5px;
    display: flex;
  }
  
  .productDetail {
    font-size: 12px;
    margin-left: 10px;
    color: #999;
  }


  .imageInfo {
    margin-left: 10px;
    width: 185px;
    height: 120px;
  }
  </style>