import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login.vue'
import home from '@/components/home.vue'
import user from '@/components/users.vue'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: home,
    // redirect: {
    //   path: '/login'
    // }
    children: [{
      path: '/user',
      component: user

    }]
  },
  {
    path: '/login',
    component: login
  }
  ]
})
