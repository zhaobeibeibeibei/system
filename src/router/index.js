import Vue from 'vue'
import Router from 'vue-router'
// import login from '@/components/login.vue'
// import home from '@/components/home.vue'
// import user from '@/components/users.vue'
// import rights from '@/components/rights.vue'
// import part from '@/components/part.vue'
// import goods from '@/components/goods.vue'
// import goodsadd from '@/components/goodsadd.vue'
// import params from '@/components/params.vue'
// import categories from '@/components/categories.vue'
// import orders from '@/components/orders.vue'
// import reports from '@/components/reports.vue'
// 路由懒加载

const login = () => import('@/components/login.vue')
const home = () => import('@/components/home.vue')
const user = () => import('@/components/users.vue')
const rights = () => import('@/components/rights.vue')
const part = () => import('@/components/part.vue')
const goods = () => import('@/components/goods.vue')
const goodsadd = () => import('@/components/goodsadd.vue')
const params = () => import('@/components/params.vue')
const categories = () => import('@/components/categories.vue')
const orders = () => import('@/components/orders.vue')
const reports = () => import('@/components/reports.vue')

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: home,
    // redirect: {
      //   path: '/login'
    // }
    children: [{
      path: '/users',
      component: user
    }, { path: '/rights',
      component: rights
    }, {
      path: '/roles',
      component: part
    }, {
      path: '/goods',
      component: goods
    }, {
      path: '/goodsadd',
      component: goodsadd
    }, {
      path: '/params',
      component: params
    }, {
      path: '/categories',
      component: categories
    }, {
      path: '/orders',
      component: orders
    },
    {
      path: '/reports',
      component: reports
    }]
  },
  {
    path: '/login',
    component: login
  }]

})
