<template>
  <!--随机文章-->
  <div class="ui segments m-box no-segments" style="margin-top: 0px; margin-bottom: 10px"> 
    <div class="ui segment">
      <i class="bookmark red shopping bag icon"></i>
      <span style="color: red">球鞋品牌</span>
    </div>
    <div class="ui red segment">
      <div v-for="productBrand in productCategoryList" :key="productBrand.id">
        <div class="productBrand">
            <div>
              <img  width="30" height="30" :src="productBrand.image"/>
            </div>
            <div class="productBrandName">
            <h5><a   @click="goProductCatepory(productBrand.id)" style=" color: #541010;" href="javascript:;">{{ productBrand.name }}</a></h5>
            </div>
        </div>
        <!-- <div class="m-item" v-for="blog in randomBlogList" :key="blog.id" @click.prevent="toBlog(blog)">
          <div class="img" :style="{ 'background-image': 'url(' + blog.firstPicture + ')' }"></div>
          <div class="info">
            <div class="date">
              {{ blog.createTime | dateFormat("YYYY-MM-DD") }}
            </div>
            <div class="title">{{ blog.title }}</div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { getProductCategories } from "@/api/productCategory";

export default {
  name: "RandomBlog",
  props: {
    randomBlogList: {
      type: Array,
      required: true,
    },
  },
    data() {
        return {
        productCategoryList: [],
        };
    },
    created() {
        this.getProductCategories();
    },
  methods: {
    toBlog(blog) {
      this.$store.dispatch("goBlogPage", blog);
    },
    getProductCategories() {
      getProductCategories()
        .then((res) => {
          if (res.code === 200) {
            // 递归处理数据，将没有子节点的节点的children属性设置为undefined 否则级联会出问题
            this.productCategoryList = this.formatData(res.data);
            console.log(this.productCategoryList);
          }
        })
        .catch(() => {
          this.msgError("请求失败");
        });
    },
    // 递归处理数据，将没有子节点的节点的children属性设置为undefined 否则级联会出问题
    formatData(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].children.length < 1) {
          data[i].children = undefined;
        } else {
          this.formatData(data[i].children);
        }
      }
      return data;
    },
    goProductCatepory(id){
        this.$router.push(`/product/${id}`)
    },
  },
};
</script>


<style scoped>
.secondary.segment {
  padding: 10px;
}

.ui.divided.items .m-item:first-child {
  margin-top: 0;
}

.ui.divided.items .m-item {
  margin-top: 1rem;
  height: 7rem;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
}

.ui.divided.items .m-item .img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  object-fit: cover;
  background-position-x: center;
  background-position-y: center;
  background-size: cover;
}

.ui.divided.items .m-item .info {
  z-index: 1;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.5rem !important;
  font-size: 12px;
  color: white;
}

.ui.divided.items .m-item .info .title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  word-break: break-word;
}
.productBrand{
    display: flex;
    flex-direction: row;
    justify-content: left;
    color: #541010;
    margin-bottom: 0;
}
/* 文字居中 */
.productBrandName{
    margin-left: 0.5rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 0.1rem;
    color: #541010;
}
</style>