/*
 * @Author: liubo lb@hzguode.com
 * @Date: 2023-06-01 15:38:41
 * @LastEditors: liubo lb@hzguode.com
 * @LastEditTime: 2023-06-01 15:56:29
 * @FilePath: /guangde-map/src/components/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineAsyncComponent } from 'vue';

const components = import.meta.glob('./*.vue');

export default function install(app) {
  for (const [key, value] of Object.entries(components)) {
    // ./HelloWorld.vue 截取中间部分做名字
    const name = key.slice(key.lastIndexOf('/') + 1, key.lastIndexOf('.'));
    app.component(name, defineAsyncComponent(value));
  }

}