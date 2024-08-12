/*
 * @Author: liubo lb@hzguode.com
 * @Date: 2023-06-1 13:50:15
 * @LastEditors: liubo lb@hzguode.com
 * @LastEditTime: 2023-12-19 14:38:08
 * @FilePath: /guangde-map/src/api/gis/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Http from "@/common/js/http"
const isMock = false
const BASE_API = '/api'

// 根据字典编码查已启用的字典配置列表(非本页面使用,前端查询枚举下拉框通用)
export function getEnabledDict(ddCode) {
  return Http.get(`${BASE_API}/system-api/api/v1/sys-dd-value/getEnabledDict`, {ddCode}, {
    mock: isMock,
  })
}

// 获取业务参数
export function getBusinessParams(type) {
  return Http.get(`${BASE_API}/system-api/api/v1/busi-para-branch/parano/${type}`, {type}, {
    mock: isMock,
  })
}

// 获取地图中心点
export function getBusiParaBranch(params) {
  return Http.get(`${BASE_API}/gis-api/api/v1/gis-center`, params, {
    mock: isMock,
  })
}

// 更新地图中心位置
export function updateMapOptions(data) {
  return Http.put(`${BASE_API}/gis-api/api/v1/gis-center/update`, data, {
    mock: isMock,
  })
}

