import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login.vue'
import home from '@/components/home.vue'
import user from '@/components/users.vue'
import rights from '@/components/rights.vue'
import part from '@/components/part.vue'
import goods from '@/components/goods.vue'
import goodsadd from '@/components/goodsadd.vue'
import params from '@/components/params.vue'
import categories from '@/components/categories.vue'
import orders from '@/components/orders.vue'

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
    }, {
      path: '/rights',
      component: rights
    }, {
      path: '/roles',
      component: part
    }, {
      path: '/goods',
      component: goods
    },
    {
      path: '/goodsadd',
      component: goodsadd
    }, {
      path: '/params',
      component: params
    }, {
      path: '/categories',
      component: categories
    }, {
      path:'/orders',
      component: orders
    }]

  },
  {
    path: '/login',
    component: login
  }
  ]
})
