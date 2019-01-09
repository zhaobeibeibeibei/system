// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import moment from 'moment'
import 'element-ui/lib/theme-chalk/index.css'
// 导入面包屑组件
import brand from '@/components/brand.vue'
// 引入axios
import axios from '@/plugins/http'
// 引入公共样式
import '@/assets/base.css'
// 让vue使用该插件
Vue.use(axios)
Vue.use(ElementUI)
// 在生产阶段关闭日志输出
Vue.config.productionTip = false
// 配置全局处理日期格式
Vue.filter('setdate', function (v) {
  return moment(v).format('YYYY-MM-DD')
})

// 声明一个全局组件
Vue.component(brand.name, brand)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
