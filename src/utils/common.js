/*
 * @Author: liubo lb@hzguode.com
 * @Date: 2023-05-11 16:19:57
 * @LastEditors: liubo lb@hzguode.com
 * @LastEditTime: 2023-10-30 13:37:06
 * @FilePath: /guangde-map/src/utils/common.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import dayjs from "dayjs";

// 解析路由中的所有参数
export function getQueryStringRegExp(name) {
  var reg = new RegExp("(^|\\?|&)"+ name +"=([^&]*)(\\s|&|$)", "i"); 
  if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " ")); return "";
}

// 解析路由中的所有参数
export function getAssetsFile(folder, name) {
  return new URL(`../assets/img/${folder}/${name}.png`, import.meta.url).href
}

// 根据表单的schema, 生成表单对象
export function generateFormObject(schema) {
  let obj = {}
  Object.keys(schema).forEach((item) => {
    obj[item] = ''
  })

  return obj
}

// 判断字符串是否是一个链接
export function isValidURL(str) {
  let regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
  return regex.test(str)
}


// 获取数组维度
export function getArrayDimension(arr) {
  if(arr instanceof Array) {
    return Math.max(...arr.map(e => {
      return 1 + parseInt(getArrayDimension(e))
    }))
  } else {
      return 0
  }
}



/**
 * 计算 当前时间 和传入时间 间隔 几年几月几日, 并返回相应格式
 * @param val
 */

export function setCompareRegistrationTimeText(startDate, endDate) {
  // if (!val) {
  //   this.ruleForm.compareRegistrationTimeText = '--'
  //   return
  // }
  const date = new Date(startDate) // 转换时间格式
  const year = date.getFullYear() // 取当年的年
  const month = date.getMonth() + 1 // 取当年的月(月份加一)
  const dd = date.getDate() // 取当年的日期
  const nowDate = new Date(endDate) // 取现在的时间
  const nowYear = nowDate.getFullYear() // 取现在的年
  const nowMonth = nowDate.getMonth() + 1 // 取现在的月(月份加一)
  const nowDd = nowDate.getDate() // 取现在的日期
  /**
   * 日期计算(结束 - 开始)
   * 1-1当差值为正，就相差多少天
   * 1-1-1例如: (2021/3/15 - 2022/4/18) ===== 18-15 > 0 日期相差3天
   * 1-2当差值为负，计算从开始时间的日期到结束时间的日期相差几天
   * 1-2-1例如：(2021/3/15 - 2022/4/10) ===== 10-15 < 0
   * 其实就是计算从3/15 到 4、10号中间过了多少天
   * 1-2-1-1：方法： 其实就是计算3/15 到 3/31 号过了多少天，再加上 4月过的10天
   */
  const restDd =
    nowDd - dd < 0 ? lastDay(nowMonth - 1, year) - dd + nowDd : nowDd - dd
  /**
   * 月份计算(结束 - 开始)
   * 1-1当差值为正，就相差多少月
   * 1-1-1例如: (2021/3/15 - 2022/4/18) ===== 4-3 > 0 月份相差1月
   * 1-2当差值为负，计算从开始时间的月份到结束时间的月份相差几天
   * 1-2-1例如：(2021/5/15 - 2022/4/10) ===== 4-5 < 0
   * 其实就是计算从5月到第二年4月过了多少月
   * 1-2-1-1：方法： 向年借一年为12月计算过了多少月
   */
  const restMonth =
    nowMonth - month < 0 ? 12 + nowMonth - month : nowMonth - month
  /**
   * 年份计算(结束 - 开始)
   * 直接限制结束比开始大，只有0/正数
   */
  const restYear = nowYear - year
  /**
   * 计算借位的问题
   */
  let resultMonth = restMonth
  let resultYear = restYear
  // 日期小说明借了月
  if (nowDd < dd) {
    resultMonth = restMonth - 1 < 0 ? restMonth - 1 + 12 : restMonth - 1
  }
  // 月份小借了年 或者 日期小，月份刚好一致，因为日期借了月份，导致月份减1，所以减年
  if (nowMonth < month || (nowDd < dd && nowMonth === month)) {
    resultYear = restYear - 1
  }
  let str = {
    year: resultYear,
    month: resultMonth,
    day: restDd
  }
  return `${resultYear}年${resultMonth}月${restDd}天`
}
/**
 * 判断每年的每个月的最后一天是几号
 * @param mo-月份
 * @param year-年份
 * @returns {number}
 */
export function lastDay(mo, year) {
  if (mo === 4 || mo === 6 || mo === 9 || mo === 11) {
    return 30
  }
  //2月
  else if (mo === 2) {
    if (isLeapYear(year)) {
      return 29
    } else {
      return 28
    }
  }
  //大月
  else {
    return 31
  }
}
/**
 * 判断是否是闰年
 * @param Year-年份
 * @returns {boolean}
 */
export function isLeapYear(Year) {
  return (Year % 4 === 0 && Year % 100 !== 0) || Year % 400 === 0
}


/**
 * @description 处理管道长度
 * @param line 管线 
 * @return res 管道长度
 */
export function getPipeLength (line) {
  let res = line;
  if (res.indexOf('km') >= 0) {
    res = Number(res.replaceAll(' km', '')) * 1000
  } else {
    res = Number(res.replaceAll(' m', ''))
  }
  return res
}

/**
 * @description 将驼峰命名改为横线隔开的形式
 * @param camelCase 驼峰命名名称 
 * @return res 返回结果
 */
export function getIconName (camelCase) {
  return camelCase.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

/**
 * @description 获取wms路径
 * @param mapUrl 地图路径 
 * @return res 返回结果
 */
export function getWmsUrl (mapUrl) {
  const url = new URL('https://example.com' + mapUrl)
  const params = Object.fromEntries(url.searchParams.entries())
  return {
    wmsUrl: `${import.meta.env.VITE_BASE}${url.pathname}`,
    params
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function sleep(){
  let timer = null
  return function(t) {
    return new Promise(function(resolve, reject){
      if(timer) clearTimeout(timer)
      timer = setTimeout(function() {
        resolve()
      }, t)
    })
  }
}

/**
 * 处理弹窗中的数据格式
 * @param { object } data: 详情接口返回数据
 * @param { object } schema: 弹窗中的内容
 * @return { array } 重组后的弹窗内容 
 */
export function handlePopupLineInfo(data, schema) {
  let popupLineInfo = {
    // 图表
    chart: { data: [] },
    // 实时数据
    realtimeInfo: { title: '实时数据', data: [] },
    // 基础信息
    baseInfo: { title: '基础信息', data: [] },
  }
  Object.keys(schema).forEach((item) => {
    if (schema[item].slotName === 'chart') {
      popupLineInfo.chart.data.push({ slotName: 'chart', id: schema[item].id })
      return
    }
    if (!schema[item].hasOwnProperty('slotName')){
      popupLineInfo.baseInfo.data.push({ label: schema[item]?.label, value: schema[item]?.type === 'time' ? setCompareRegistrationTimeText(data.startDate, dayjs().format('YYYY-MM-DD')) : data[item] ?? '--'})
      return
    }
    let slotData = JSON.parse(data[item])
    Object.keys(slotData).forEach((it) => {
      popupLineInfo.realtimeInfo.data.push({ label: it, value: slotData[it]})
    })
  })

  return popupLineInfo
}
