<template>
  <div>
    <div class="ui top attached segment" style="text-align: center">
      <h2 class="m-text-500">球鞋{{ }}</h2>
    </div>
    <div class="ui attached segment m-padding-bottom-large">
      <div class="ui divided items">
        <div class="imageInfo">
          <img
            src="https://img.picgo.net/2023/04/04/Nike-SB-Dunk-Low-Supreme-Black-Product7bd22cfa854e06f9.webp"
          />
        </div>
        <div class="ui divider"></div>
        <el-card shadow="always" style="text-align: center;">最新售出价格: <strong style="color: red;">US$142</strong></el-card>
        <div class="ui divider"></div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="选择尺码">
            <el-select v-model="value" placeholder="请选择您的尺码">
              <el-option
                v-for="item in cities"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{item.value}}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="即时配送">
            <el-switch v-model="form.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="收货地址">
            <el-select   v-model="value" placeholder="请选择收获地址">
              <el-option
                v-for="item in adress"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{item.value}}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="支付方式">
            <el-radio-group v-model="radio">
              <el-radio label="1" size="mini" border>微信</el-radio>
              <el-radio label="2" size="mini" border>支付宝</el-radio>
              <el-radio label="3" disabled size="mini" border>银联</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="onSubmit" size="medium">立即购买</el-button>
            <el-button size="medium">立即求购</el-button>
          </el-form-item>
        </el-form>
        <el-collapse v-model="activeNames" @change="handleChange">
          <el-collapse-item name="1">
            <template slot="title">
              <span class="productDescription"> 
                <i class="icon  el-icon-sell" ></i> 
                商品描述 Description </span>
            </template>
            <div >
              整体采用黑白「熊猫」配色方案，白色皮革为基底，黑色框架部分采用 Supreme x Dunk 同款鳄鱼纹皮革，高光泽皮面增添奢华气质。
            </div>
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
            <div>
              我们致力于赢得并保持你对我们的信任。如果我们出了错，我们会立即更正。
            </div>
          </el-collapse-item>
        </el-collapse>
        <div>
          <strong>商品详情</strong>
          <div class="productDetails">
            <ul class="productDetailsUl">
              <li>货号 : <strong>DD1503-101</strong></li>
              <li>配色：<strong>WHITE/BLACK</strong></li>
              <li>零售价：<strong>US$100</strong></li>
              <li>发布日期：<strong>2021/03/10</strong></li>
            </ul>
          </div>
        </div>
        <div class="ui divider"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductInfo",
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      activeNames: ["1"],
      radio1: "1",
      radio2: "4",
      radio3: "5",
      radio4: "6",
      radio: "3",
      cities: [
        {
          value: "$360",
          label: "US7",
        },
        {
          value: "$270",
          label: "US8",
        },
        {
          value: "$250",
          label: "US9",
        },
        {
          value: "$295",
          label: "US9.5",
        },
        {
          value: "$309",
          label: "US10",
        },
        {
          value: "$425",
          label: "US11",
        },
      ],
      adress: [
        {
          value: "邢台市东安村",
          label: "王硕15094458358",
        },
        {
          value: "$270",
          label: "US8",
        },
        {
          value: "$250",
          label: "US9",
        },
        {
          value: "$295",
          label: "US9.5",
        },
        {
          value: "$309",
          label: "US10",
        },
        {
          value: "$425",
          label: "US11",
        },
      ],
      value: "",
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleChange(val) {
      console.log(val);
    },
  },
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
.productDescription{
  font-size: 12px;
  color: blueviolet;
}




</style>