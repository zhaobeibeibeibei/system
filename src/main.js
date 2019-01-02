// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入axios
import axios from '@/plugins/http'
// 引入公共样式
import '@/assets/base.css'
// 让vue使用该插件
Vue.use(axios)
Vue.use(ElementUI)
// 在生产阶段关闭日志输出
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
