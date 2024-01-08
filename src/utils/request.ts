import axios, { AxiosRequestConfig, Method } from 'axios'
import { message as AMessage } from 'antd'
import { getI18n } from 'react-i18next'
import { useUserStore } from 'store'
import globalConfig from 'config'

// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: globalConfig.requestURL,
  // 超时
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// request拦截器
service.interceptors.request.use(
  (config) => {
    const i18n = getI18n()
    config.headers['Accept-Language'] = i18n.language || 'en'

    const token = useUserStore.getState().token
    // 是否需要设置 token
    const isNotToken = (config.headers || {}).isToken === false
    if (token && !isNotToken) {
      config.headers['Access-Token'] = token // 让每个请求携带自定义token 请根据实际情况自行修改
    }

    return config
  },
  (error) => {
    console.log(error)
    Promise.reject(error)
  }
)

const toastErrorMessage = (err: string, status?: number) => {
  const errMsg = err || `system error, code: ${status}`
  AMessage.error(errMsg, 2)
}

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    console.log(res)
    const { headers, data: resData } = res
    // 如果返回的header头中存在token, 则更新token
    if (headers['access-token'] || headers['Access-Token']) {
      try {
        useUserStore
          .getState()
          .setToken(headers['access-token'] || headers['Access-Token'])
      } catch (err) {
        console.log(err)
      }
    }

    const { status, msg, data } = resData
    // 处理返回数据
    if (status === 1) {
      return Promise.resolve(data)
    } else if (status == 40004) {
      useUserStore.getState().logout()
      return Promise.reject(JSON.stringify(data))
    } else {
      toastErrorMessage(msg, status)
      return Promise.reject(JSON.stringify(data))
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default function request<T = any>(
  url: string,
  method: Method,
  data?: any,
  config?: AxiosRequestConfig
) {
  let reqData: AxiosRequestConfig = { data }
  if (method === 'GET' || method === 'get') reqData = { params: data }
  return service<any, T>({
    url: url,
    method: method,
    ...reqData,
    ...config
  })
}
