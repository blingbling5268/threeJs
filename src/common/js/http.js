/*
 * @Author: gs 1454894461@qq.com
 * @Date: 2022-08-01 14:01:09
 * @LastEditors: liubo lb@hzguode.com
 * @LastEditTime: 2023-06-17 15:44:34
 * @FilePath: \guangde-map\src\common\js\http.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * Axios 二次封装
 * - 支持 mock 配置访问
 */

import axios from 'axios'
import config from '@/config'
//  import { Message } from 'element-plus'
import { getToken, setToken } from '@/common/js/auth'
import { getQueryStringRegExp } from '@/utils/common'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'


const TOKEN_INVALID = 'Token认证失败，请重新登录'
const NETWORK_ERROR = '网络请求异常，请稍后重试'

const service = axios.create({
  baseURL: config.baseURL,
  timeout: 120000,
})

service.interceptors.request.use((req) => {
  // TODO: token set
  let token, tenantId
  if (getQueryStringRegExp("token")) {
    token = getQueryStringRegExp("token")
    tenantId = getQueryStringRegExp("tenantId")
    sessionStorage.setItem('token', token)
    sessionStorage.setItem('tenantId', tenantId)
  } else {
    token = sessionStorage.getItem('token')
    tenantId = sessionStorage.getItem('tenantId')
  }

  // TODO: token set
  const headers = req.headers
  if (!headers.Authorization) {
    headers.Authorization = `Bearer ${token}`
  }
  headers['x-ltdno-header'] = localStorage.getItem('ltdno') || '214'
  headers['x-tenantid-header'] = tenantId || 1129
  headers['x-tenant-schema'] = localStorage.getItem('tenant') || ''
  headers['x-username-header'] = localStorage.getItem('username') || 'songwg '
  headers['x-userid-header'] = localStorage.getItem('userId') || '67'
  return req
})

service.interceptors.response.use(
  (res) => {
    const { code, data, message: msg } = res.data
    return res.data
  },
  (error) => {
    let res = error.response.data
    let resType = Object.prototype.toString.call(error.response.data).slice(8, -1)

    let feedbackMsg = ''
    if (resType === 'ArrayBuffer') {
      //转流文件报错信息
      let enc = new TextDecoder('utf-8')
      let data = JSON.parse(enc.decode(new Uint8Array(res)))
      feedbackMsg = data.details
    } else if (resType === 'Blob') {
      let blob = new Blob([res])
      let reader = new FileReader()
      reader.readAsText(blob, 'utf-8')
      reader.onload = () => {
        ElMessage.error({
          message: JSON.parse(reader.result).details,
          type: 'error',
          duration: 3 * 1000,
        })
      }
    } else {
      feedbackMsg = res.details && res.details.length > 0 ? res.details : res.message || res.errorMessage
    }
    if (resType !== 'Blob') {
      ElMessage.error({
        message: feedbackMsg,
        type: 'error',
        duration: 3 * 1000,
      })
    }

    return Promise.reject(error)
  }
)

function request(options) {
  options.method = options.method || 'get'
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data
  }

  // 局部 mock
  let isMock = config.mock
  if (typeof options.mock != 'undefined') {
    isMock = options.mock
  }
  if (config.env === 'production') {
    service.defaults.baseURL = config.baseURL
  } else {
    service.defaults.baseURL = isMock ? config.mockURL : config.baseURL
  }
  return service(options)
}

;['get', 'post', 'put', 'delete', 'patch'].forEach((item) => {
  request[item] = (url, data, options) => {
    return request({ url, data, method: item, ...options })
  }
})

request['getList'] = (that, paramsUrl, query, options) => {
  const inquery = (options && that[options.queryAlias]) || that.query || that.data
  let obj = Object.assign({}, inquery, query)
  delete obj.data
  // 处理分页数据
  if (obj.hasOwnProperty('pageInfo')) {
    obj['page'] = inquery.pageInfo.page
    obj['size'] = inquery.pageInfo.pageSize
    delete obj.pageInfo
  } else {
    that.$set(obj, 'page', 1)
    that.$set(obj, 'size', 10)
  }
  // 时间处理
  if (options && options.hasOwnProperty('daterange')) {
    options['daterange'].forEach((item) => {
      if (obj.hasOwnProperty(item) && obj[item] && obj[item][0]) {
        if (options.hasOwnProperty('datealias')) {
          obj[`${options['datealias'][0]}`] = dayjs(obj[item][0]).format(
            options.format || 'YYYY-MM-DD'
          )
          obj[`${options['datealias'][1]}`] = dayjs(obj[item][1]).format(
            options.format || 'YYYY-MM-DD'
          )
        } else {
          obj[`${item}Begin`] = dayjs(obj[item][0]).format(options.format || 'YYYY-MM-DD')
          obj[`${item}End`] = dayjs(obj[item][1]).format(options.format || 'YYYY-MM-DD')
        }
        delete obj[item]
      }
    })
  }
  return paramsUrl(obj)
}

export default request
