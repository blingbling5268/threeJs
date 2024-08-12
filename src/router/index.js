/*
 * @Author: liubo lb@hzguode.com
 * @Date: 2024-02-20 13:49:36
 * @LastEditors: liubo lb@hzguode.com
 * @LastEditTime: 2024-05-27 14:01:31
 * @FilePath: /threeJs/src/router/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createRouter, createWebHistory } from 'vue-router'
import Demo from '@/views/demo.vue'
import Demo1 from '@/views/demo1.vue'
import Demo2 from '@/views/demo2.vue'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'

const __POWERED_BY_QIANKUN__ = qiankunWindow.__POWERED_BY_QIANKUN__

const routes = [
  {
    path: '/',
    redirect: '/demo'
  },
  {
    path: '/demo',
    name: 'demo',
    component: Demo
  },
  {
    path: '/demo1',
    name: 'demo1',
    component: Demo1
  },
  {
    path: '/demo2',
    name: 'demo2',
    component: Demo2
  },
]

const router = () => {
  return createRouter({
    // base: __POWERED_BY_QIANKUN__ ? '/micros/gis' : '/',
    mode: 'history',
    history: createWebHistory(__POWERED_BY_QIANKUN__ ? '/app-gismap' : import.meta.env.VITE_BASE),
    routes
  })
}

export default router
