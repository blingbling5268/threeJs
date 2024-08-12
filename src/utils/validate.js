/*
 * @Author: liubo lb@hzguode.com
 * @Date: 2023-05-06 13:58:08
 * @LastEditors: liubo lb@hzguode.com
 * @LastEditTime: 2023-07-18 11:06:09
 * @FilePath: /guangde-map/src/utils/validate.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
* @Author: liubo
* @description: 校验只能输入整型或浮点型数字
* @param {Object} obj
* @returns {string}
* @Date: 2022-08-22 15:11:40
*/
export function IntOrFloatNumber (obj) {
  obj.data = obj.data
    .replace(/[^\d\.]/g,'') // 先把非数字的都替换掉，除了数字和. 
    .replace(/^\./g,'') // 必须保证第一个为数字而不是.
    .replace(/^0{2,}/,'0') // 保证第一位只能有一个或0个0
    .replace(/^0[\d]/,'0') // 以0开始的第二位只能为小数点
    .replace(/\.{2,}/g,'.') // 保证只有出现一个.而没有多个. 
    .replace('.','$#$').replace(/\./g,'').replace('$#$','.') // 保证.只出现一次，而不能出现两次以上 
  return obj.data;
} 

/**
* @Author: liubo
* @description: 校验只能输入中英文数字和标准符号
* @param {Object} obj
* @returns {string}
* @Date: 2023-06-03 15:31:40
*/
export function validateCnOrEnOrCharacter (rule, value, callback) {
  if (!value) callback() 
  const regex = /^[a-zA-Z0-9\u4e00-\u9fa5\s\,\.\:\;\-\_\!\@\#\$\%\^\&\*\(\)\+\=\{\}\[\]\|\\\:\;\"\'\<\>\?\/]*$/;
  if (!regex.test(value)) {
    callback(new Error('只能输入中英文数字和标准符号'))
  } else {
    callback()
  }
} 


/**
* @Author: liubo
* @description: 校验只能输入数字，支持小数点
* @param {Object} obj
* @returns {string}
* @Date: 2023-06-03 15:31:40
*/
export function validateNumberOrFloat (rule, value, callback) {
  if (!value) callback() 
  const regex = /^[0-9]+(\.[0-9]{1,})?$/;
  if (!regex.test(value)) {
    callback(new Error('只能输入数字，并且支持小数点'))
  } else {
    callback()
  }
} 

/**
* @Author: liubo
* @description: 校验只能输入数字
* @param {Object} obj
* @returns {string}
* @Date: 2023-06-03 15:31:40
*/
export function validateNumber (rule, value, callback) {
  if (!value) callback() 
  const regex = /(^[0-9]\d*$)/g;
  if (!regex.test(value)) {
    callback(new Error('只能输入数字'))
  } else {
    callback()
  }
} 