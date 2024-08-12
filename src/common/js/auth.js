/*
 * @Author: gs 1454894461@qq.com
 * @Date: 2022-08-01 14:01:09
 * @LastEditors: Wenguang Song
 * @LastEditTime: 2022-11-07 14:28
 * @FilePath: \guangde-map\src\common\js\auth.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Cookies from 'js-cookie'

const TokenKey = 'token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
