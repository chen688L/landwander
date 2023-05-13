//第一步导入axios
import axios from 'axios'
import Vue from 'vue'
import NetworkIp from '../config/index'
// 创建axios对象
const instance = axios.create({
  baseURL: NetworkIp,
  timeout: 5000//请求超时
})

//第三步 设置请求拦截
instance.interceptors.request.use(function(config) {
  if(sessionStorage.getItem("token")){
    config.headers.Authorization=sessionStorage.getItem("token")
  }
  return config
}, function(err) {
  throw new Error(err)

})

//第四步 设置响应拦截
instance.interceptors.response.use(response => {
  switch (response.data.state) {
    case 401:
      // 登录失效
      Vue.prototype.$message.error(response.data.message)
      sessionStorage.removeItem('DT')
      router.push('/login')
      break
    case 404:
      if (response.data.message !== null) {
        Vue.prototype.$message.error(response.data.message)
      } else {
        Vue.prototype.$message.error('未知错误')
      }
      break
    case 500:
      if (response.data.message !== null) {
        Vue.prototype.$message.error(response.data.message)
      } else {
        Vue.prototype.$message.error('未知错误')
      }
      break
    default:
      return response.data
  }
  return response.data
}, err => {
  return Promise.reject(err)
})


//导出  导出这个模块
export default instance
