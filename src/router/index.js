import Vue from 'vue'
import VueRouter from 'vue-router'
import getPageTitle from '@/util/get-page-title'
import store from '@/store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [
	{
		path: '/login',
		component: () => import('@/views/Login'),
		meta: {title: '登录'}
	},
	{
		path: '/demo',
		component: () => import('@/views/demo'),
		meta: {title: 'demo'}
	},
	{
		path: '/',
		component: () => import('@/views/Index'),
		redirect: '/home',
		children: [
			{
				path: '/home',
				name: 'home',
				component: () => import('@/views/home/Home'),
				meta: {title: '首页'}
			},
			{
				path: '/brandSettled',
				name: 'brandSettled',
				component: () => import('@/views/brandSettled/BrandSettled'),
				meta: {title: '品牌入驻'}
			},
			{
				path: '/blog/:id',
				name: 'blog',
				component: () => import('@/views/blog/Blog'),
				meta: {title: '动态'}
			},
			{
				path: '/tag/:name',
				name: 'tag',
				component: () => import('@/views/tag/Tag'),
				meta: {title: '标签'}
			},
			{
				path: '/category/:name',
				name: 'category',
				component: () => import('@/views/category/Category'),
				meta: {title: '频道'}
			},
			{
				path: '/moments/:id',
				name: 'moments',
				component: () => import('@/views/moments/Moments'),
				meta: {title: '动态'}
			},
			{
				path: '/product/:id',
				name: 'product',
				component: () => import('@/views/product/product/Product'),
				meta: {title: '商城'}

			},
			{
				path: '/productInfo/:id',
				name: 'productInfo',
				component: () => import('@/views/product/product/ProductInfo'),
				meta: {title: '商品'}
				
			},
			{
				path: '/about',
				name: 'about',
				component: () => import('@/views/about/About'),
				meta: {title: '关于我们'}
			},
			{
				path: '/writeMoment',
				name: 'writeMoment',
				component: () => import('@/views/moments/WriteMoment'),
				meta : {title: '发布动态',needLogin:true}
			},
			{
				path: '/blog/edit/:id',
				name: 'editBlog',
				component: () => import('@/views/moments/WriteMoment'),
				meta: {title: '编辑动态',needLogin:true},
			},
			{
				path: '/userInfo',
				name: 'UserInfo',
				component: () => import('@/views/user/UserInfo'),
				meta : {title: '修改个人信息',needLogin:true}
			},
			{
				path: '/cart',
				name: 'Cart',
				component: () => import('@/views/product/cart/Cart'),
				meta : {title: '我的购物车',needLogin:true}
			},
			{
				path: '/order',
				name: 'Order',
				component: () => import('@/views/product/order/Order'),
				meta : {title: 'SneakerX订单管理',needLogin:true}
			},
			{
				path: '/pay/:orderNumber',
				name: 'Pay',
				component: () => import('@/views/product/pay/Pay'),
				meta : {title: 'SneakerX支付系统',needLogin:true}
			},
			{
				path: '/settleAccount/:id',
				name: 'SettleAccount',
				component: () => import('@/views/product/cart/SettleAccount'),
				meta : {title: 'SneakerX购物车结算',needLogin:true}
			},
			{
				path: '/productCollect',
				name: 'ProductCollect',
				component: () => import('@/views/product/product/ProductCollect'),
				meta : {title: '商品收藏',needLogin:true}
			},
		]
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
	store
})

//挂载路由守卫
router.beforeEach((to, from, next) => {
	if (to.meta.needLogin){
		if (window.localStorage.getItem('adminToken') != null ){
			next()
		}else{
			// 延长当前跳转时间 防止页面闪烁
			NProgress.start()
			// 延长0.5秒，防止进度条闪烁
			setTimeout(() => {
			// 不跳转 直接调接口 返回结果输出  
			  NProgress.done()
			}, 500)
				}
	}
	document.title = getPageTitle(to.meta.title)
	next()
})

export default router
