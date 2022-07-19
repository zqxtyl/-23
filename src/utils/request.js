/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net' // 接口的基准路径
})

// 请求拦截器

request.interceptors.request.use(
  (config)=>{
    const token=store.state.user.token
    if(token){
      config.headers.Authorization=`Bearer ${store.state.user.token}`
    }
    return config
  },
  (error)=>{
    return Promise.reject(error)
  }
)
// 响应拦截器

export default request
