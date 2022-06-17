import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [{
  path: '/',
  name: 'HomeIndex',
  component: () => import(/* webpackChunkName: 'HomeIndex' */ '../views/home/HomeIndex.vue')
}, {
  path: '/shop/:id',
  name: 'ShopIndex',
  component: () => import(/* webpackChunkName: 'ShopIndex' */ '../views/shop/ShopIndex.vue')
}, {
  path: '/orderConfirmation/:id',
  name: 'OrderConfirmation',
  component: () => import(/* webpackChunkName: 'RegisterIndex' */ '../views/OrderConfirmation/OrderConfirmation.vue')
}, {
  path: '/login',
  name: 'LoginIndex',
  component: () => import(/* webpackChunkName: 'LoginIndex' */ '../views/login/LoginIndex.vue'),
  beforeEnter (to, from, next) {
    const isLogin = localStorage.isLogin
    isLogin ? next({ name: 'HomeIndex' }) : next()
  }
}, {
  path: '/register',
  name: 'RegisterIndex',
  component: () => import(/* webpackChunkName: 'RegisterIndex' */ '../views/register/RegisterIndex.vue')
}, {
  path: '/cart',
  name: 'CartIndex',
  component: () => import(/* webpackChunkName: 'CartIndex' */ '../views/cart/CartIndex.vue')
}, {
  path: '/orderList',
  name: 'OrderList',
  component: () => import(/* webpackChunkName: 'OrderList' */ '../views/orderList/OrderList.vue')
}, {
  path: '/userInfo',
  name: 'UserInfo',
  component: () => import(/* webpackChunkName: 'UserInfo' */ '../views/userInfo/userInfo.vue')
}, {
  path: '/search',
  name: 'SearchIndex',
  component: () => import(/* webpackChunkName: 'SearchIndex' */ '../views/search/SearchIndex.vue')
}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage
  const { name } = to
  const isLoginOrRegister = (name === 'LoginIndex' || name === 'RegisterIndex')
  isLogin || isLoginOrRegister ? next() : next({ name: 'LoginIndex' })
})

export default router
