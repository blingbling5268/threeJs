/*
 * @Author: liubo lb@hzguode.com
 * @Date: 2023-08-28 14:37:02
 * @LastEditors: liubo lb@hzguode.com
 * @LastEditTime: 2023-10-09 15:21:16
 * @FilePath: /guangde-map/src/common/lib/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Svg from "./Svg"
import Icon from "./Icon"
import SvgLoading from "./SvgLoading"
import VueEcharts from "./VueEcharts"

let components = [Svg, Icon, SvgLoading, VueEcharts]

const install = function (Vue, opts = {}) {
  components.forEach((component) => {
    Vue.component(component.name, component)
  })
}
/* istanbul ignore if */
if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue)
}

export default {
  version: "0.0.1",
  install,
}
