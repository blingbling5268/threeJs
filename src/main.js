/*
 * @Author: liubo lb@hzguode.com
 * @Date: 2023-05-06 13:58:08
 * @LastEditors: liubo lb@hzguode.com
 * @LastEditTime: 2024-02-20 13:56:33
 * @FilePath: /GuangDe/src/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// import 'element-plus/dist/index.css'
import '@/assets/css/common.scss' //app公共样式
import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
import actions from '@/common/js/actions'
import CommonComponent from '@/components/index'
import '@/assets/iconfont/iconfont.css'

import Lib from '@/common/lib/index.js'

let qiankunRouter = null
let instance = null

function redirectPopup(container) {
  // 插入到body的classname
  const whiteList = ['approval-popover', 'el-loading-parent--relative', 'el-dialog__wrapper', 'el-message-box__wrapper', 'v-model', 'el-dropdown-menu']
  // 保存原有document.body.appendChild方法
  let originFn = document.body.appendChild.bind(document.body)

  // 重写appendChild方法
  document.body.appendChild = (dom) => {
    // 根据标记，来区分是否用新的挂载方式
    if ((whiteList.some((item) => dom.className.split(' ').includes(item)) || dom.className.indexOf('v-modal') > -1) && dom.className.indexOf('union') < 0) {
      container.querySelector('#app').appendChild(dom)
    } else {
      originFn(dom)
    }
  }
}

function render(props) {
  if (props) actions.setActions(props)
  const { container } = props
  qiankunRouter = router()
  instance = createApp(App)
  instance
    .use(qiankunRouter)
    .use(store)
    .use(ElementPlus, { locale: zhCn })
    .use(Lib)
    .use(CommonComponent)
    .mount(container ? container.querySelector('#app') : '#app')
}

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({})
}

renderWithQiankun({
  mount(props) {
    console.log('mount')
    const { container } = props
    redirectPopup(container)
    render(props)
    container.querySelector('#app').setAttribute('data-platform', 'union')
  },
  bootstrap(props) {
    console.log('bootstrap', props)
  },
  unmount(props) {
    console.log('one unmount', props)
    const { container } = props
    // document.body.appendChild = originFn
    instance.unmount()
    // instance.$el.innerHTML = ''
    instance = null
    qiankunRouter = null
    container.querySelector('#app').removeAttribute('data-platform')
  }
})
