// 将axios包变成vue插件
// 引入axios
import axios from 'axios'
const Http = {}
Http.install = function (Vue) {
  axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
  axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log(config)
    if (config.url !== 'login') {
      const AUTH_TOKEN = localStorage.getItem('token')
      config.headers.Authorization = AUTH_TOKEN
    }
    return config
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  })
  Vue.prototype.$http = axios
}

export default Http
