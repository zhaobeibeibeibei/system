// 将axios包变成vue插件
// 引入axios
import axios from 'axios'
import {Message} from 'element-ui'
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
  axios.interceptors.response.use(function (response) {
    // 对响应数据做些事
    console.log('响应拦截---')
    console.log(response.data.meta.status)
    const st = response.data.meta.status
    const msg = response.data.meta.msg
    if (st !== 200 && st !== 201) {
      Message.warning(msg)
    }
    return response
  }, function (error) {
    // //请求错误时做些事
    return Promise.reject(error)
  })

  Vue.prototype.$http = axios
}

export default Http
