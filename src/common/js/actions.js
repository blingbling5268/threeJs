/*
 * @Author: zhe.mu
 * @Date: 2022-05-11 14:35:19
 * @LastEditors: Wenguang Song
 * @LastEditTime: 2022-11-25 17:39
 * @FilePath: \guangde-map\src\common\js\actions.js
 * @Description:
 */
function emptyAction() {
  // 警告：提示当前使用的是空 Action
  console.warn("Current execute action is empty!")
}

// 我们首先设置一个用于通信的Actions类

class Actions {
  actions = {
    onGlobalStateChange: emptyAction,
    setGlobalState: emptyAction,
  }
  constructor() {}
  // 默认值为空Action

  // 设置actions
  setActions(actions) {
    this.actions = actions
  }

  // 映射
  onGlobalStateChange(...args) {
    return this.actions.onGlobalStateChange(...args)
  }
  // 映射
  setGlobalState(...args) {
    return this.actions.setGlobalState(...args)
  }
}
const actions = new Actions()
export const curDocument = window.__POWERED_BY_QIANKUN__ ? actions.actions.container : document
export default actions
