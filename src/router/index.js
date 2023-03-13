import Vue from 'vue'
import VueRouter from 'vue-router'
import getPageTitle from '@/util/get-page-title'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
	{
		path: '/login',
		component: () => import('@/views/Login'),
		meta: {title: '登录'}
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
				path: '/archives',
				name: 'archives',
				component: () => import('@/views/archives/Archives'),
				meta: {title: '日志',needLogin: true}
			},
			{
				path: '/blog/:id',
				name: 'blog',
				component: () => import('@/views/blog/Blog'),
				meta: {title: '动态',needLogin: true}
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
				meta: {title: '分类'}
			},
			{
				path: '/moments',
				name: 'moments',
				component: () => import('@/views/moments/Moments'),
				meta: {title: '动态'}
			},
			// {
			// 	path: '/friends',
			// 	name: 'friends',
			// 	component: () => import('@/views/friends/Friends'),
			// 	meta: {title: '友人帐'}
			// },
			{
				path: '/about',
				name: 'about',
				component: () => import('@/views/about/About'),
				meta: {title: '关于我们'}
			}
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
	if (to.needLogin){
		if (window.localStorage.getItem('token')){
			next()
		}else{
			// 未登录，跳转到登录页面
			next('/login')
				}
	}else if (to.path === '/home'){
		if (!window.localStorage.getItem('userInfo') == null){
			// 将window.localStorage.getItem('userInfo')转换为JSON对象传给store
			store.commit('user', JSON.parse(window.localStorage.getItem('userInfo')))
			next()
		}else{
			next()
		}
	}
	document.title = getPageTitle(to.meta.title)
	next()
})

export default router
