<template>
  <div ref="nav" class="ui fixed inverted stackable pointing menu"
    :class="{ 'transparent': $route.name === 'home' && clientSize.clientWidth > 768 }">
    <div class="ui container">
      <router-link to="/">
        <h3 class="ui header item m-blue">{{ blogName }}</h3>
      </router-link>
      <router-link to="/home" class="item" :class="{ 'm-mobile-hide': mobileHide, 'active': $route.name === 'home' }">
        <i class="home icon"></i>首页
      </router-link>
      <!-- 分类 -->
      <el-dropdown trigger="click" @command="categoryRoute">
        <span class="el-dropdown-link item" :class="{ 'm-mobile-hide': mobileHide, 'active': $route.name === 'category' }">
          <i class="idea icon"></i>分类<i class="caret down icon"></i>
        </span>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="category.name" v-for="(category, index) in categoryList" :key="index">
            {{ category.name }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <router-link to="/archives" class="item" :class="{ 'm-mobile-hide': mobileHide, 'active': $route.name === 'archives' }">
        <i class="clone icon"></i>日志
      </router-link>

      <router-link to="/moments" class="item" :class="{ 'm-mobile-hide': mobileHide, 'active': $route.name === 'moments' }">
        <i class="comment alternate outline icon"></i>动态
      </router-link>

      <!--      <router-link to="/friends" class="item" :class="{'m-mobile-hide': mobileHide,'active':$route.name==='friends'}">-->
      <!--        <i class="users icon"></i>友人帐-->
      <!--      </router-link>-->

      <router-link to="/about" class="item" :class="{ 'm-mobile-hide': mobileHide, 'active': $route.name === 'about' }">
        <i class="info icon"></i>关于我们
      </router-link>
      <!--      搜索框-->
      <el-autocomplete v-model="queryString" :fetch-suggestions="debounceQuery" placeholder=" Search...."
        class="right item m-search" :class="{ 'm-mobile-hide': mobileHide }" popper-class="m-search-item"
        @select="handleSelect">
        <i class="search icon el-input__icon" style="margin-left: 5px" slot="prefix"></i>
        <template slot-scope="{ item }">
          <div class="title">{{ item.title }}</div>
          <span class="content">{{ item.content }}</span>
        </template>
      </el-autocomplete>

      <!--      登录按钮-->
      <el-dropdown class="item m-avatar" :class="{ 'm-mobile-hide': mobileHide, 'active': $route.name === 'about' }"
        :disabled="!user == null ? true : false">
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item @click.native="toLogOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
        <a class=" right item " v-if="!user == ''">
          <img :src="user.avatar">
        </a>
        <!--        未登录状态-->
        <el-button class="right item m-blue-dark" type="text" style="margin-left: 10px" @click="toLogin" v-else >
          <i class="user icon"></i>Log in
        </el-button>
      </el-dropdown>

      <!--      手机端按钮-->
      <button class="ui menu black icon button m-right-top m-mobile-show" @click="toggle">
        <i class="sidebar icon"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { getSearchBlogList } from "@/api/blog";
import { logOut } from "@/api/login";
import { mapState } from 'vuex'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default {
  name: "Nav",
  props: {
    blogName: {
      type: String,
      required: true
    },
    categoryList: {
      type: Array,
      required: true
    },
  },
  data() {
    return {
      mobileHide: true,
      queryString: '',
      queryResult: [],
      timer: null
    }
  },
  computed: {
    ...mapState(['clientSize', 'user'])
  },
  watch: {
    //路由改变时，收起导航栏
    '$route.path'() {
      this.mobileHide = true
    }
  },
  mounted() {
    //监听页面滚动位置，改变导航栏的显示
    window.addEventListener('scroll', () => {
      //首页且不是移动端
      if (this.$route.name === 'home' && this.clientSize.clientWidth > 768) {
        if (window.scrollY > this.clientSize.clientHeight / 2) {
          this.$refs.nav.classList.remove('transparent')
        } else {
          this.$refs.nav.classList.add('transparent')
        }
      }
    })
    //监听点击事件，收起导航菜单
    document.addEventListener('click', (e) => {
      //遍历冒泡
      let flag = this.$refs.nav.contains(e.target)
      //如果导航栏是打开状态，且点击的元素不是Nav的子元素，则收起菜单
      if (!this.mobileHide && !flag) {
        this.mobileHide = true
      }
    })
  },
  methods: {
    toggle() {
      this.mobileHide = !this.mobileHide
    },
    categoryRoute(name) {
      this.$router.push(`/category/${name}`)
    },
    debounceQuery(queryString, callback) {
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(() => this.querySearchAsync(queryString, callback), 1000)
    },
    querySearchAsync(queryString, callback) {
      if (queryString == null
        || queryString.trim() === ''
        || queryString.indexOf('%') !== -1
        || queryString.indexOf('_') !== -1
        || queryString.indexOf('[') !== -1
        || queryString.indexOf('#') !== -1
        || queryString.indexOf('*') !== -1
        || queryString.trim().length > 20) {
        return
      }
      getSearchBlogList(queryString).then(res => {
        if (res.code === 200) {
          this.queryResult = res.data
          if (this.queryResult.length === 0) {
            this.queryResult.push({ title: '无相关搜索结果' })
          }
          callback(this.queryResult)
        }
      }).catch(() => {
        this.msgError("请求失败")
      })
    },
    handleSelect(item) {
      if (item.id) {
        this.$router.push(`/blog/${item.id}`)
      }
    },
    toLogOut() {
      logOut().then(res => {
        if (res.code === 200) {
          this.$store.commit('user', '')
          window.localStorage.removeItem('user')
          window.localStorage.removeItem('token')
          // 如果不是在首页，跳转到首页
          if (!this.$route.name === 'home') {
          this.$router.push('home')
          }
        }
      }).catch(() => {
        this.msgError("请求失败")
      })
    },
    toLogin() {
      NProgress.start()
      // 延长0.5秒，防止进度条闪烁
      setTimeout(() => {
        this.$router.push('/login')
        NProgress.done()
      }, 500)
    }
  }
}
</script>

<style>
.ui.fixed.menu .container {
  width: 1400px !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

.ui.fixed.menu {
  transition: .3s ease-out;
}

.ui.inverted.pointing.menu.transparent {
  background: transparent !important;
}

.ui.inverted.pointing.menu.transparent .active.item:after {
  background: transparent !important;
  transition: .3s ease-out;
}

.ui.inverted.pointing.menu.transparent .active.item:hover:after {
  background: transparent !important;
}

.el-dropdown-link {
  outline-style: none !important;
  outline-color: unset !important;
  height: 100%;
  cursor: pointer;
}

.el-dropdown-menu {
  margin: 7px 0 0 0 !important;
  padding: 0 !important;
  border: 0 !important;
  background: #1b1c1d !important;
}

.el-dropdown-menu__item {
  padding: 0 15px !important;
  color: rgba(255, 255, 255, .9) !important;
}

.el-dropdown-menu__item:hover {
  background: rgba(255, 255, 255, .08) !important;
}

.el-popper .popper__arrow::after {
  content: none !important;
}

.popper__arrow {
  display: none !important;
}

.m-avatar {
  min-width: 90px;
  padding: 0 !important;
}

.m-avatar img {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}

.m-search {
  min-width: 220px;
  padding: 0 !important;
}

.m-search input {
  color: rgba(255, 255, 255, .9);
  ;
  border: 0px !important;
  background-color: inherit;
  padding: .67857143em 2.1em .67857143em 1em;
}

.m-search i {
  color: rgba(255, 255, 255, .9) !important;
}

.m-search-item {
  min-width: 350px !important;
}

.m-search-item li {
  line-height: normal !important;
  padding: 8px 10px !important;
}

.m-search-item li .title {
  text-overflow: ellipsis;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.87);
}

.m-search-item li .content {
  text-overflow: ellipsis;
  font-size: 12px;
  color: rgba(0, 0, 0, .70);
}
</style>
