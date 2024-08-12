/*
 * @Author: liubo lb@hzguode.com
 * @Date: 2023-05-06 13:58:08
 * @LastEditors: liubo lb@hzguode.com
 * @LastEditTime: 2024-01-06 10:58:11
 * @FilePath: /GuangDe/vite.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ElementPlus from 'unplugin-element-plus/vite'
import qiankun from 'vite-plugin-qiankun'
import pkg from './package.json' assert { type: "json" };
import dotenv from 'dotenv'
import fs from 'fs'

// https://vitejs.dev/config/
export default ({ mode, command }) => {
  const name = pkg.name
  const envMap = dotenv.parse(fs.readFileSync(`.env.${mode}`))
  let _plugins = {
    development: [
      qiankun(name, {
        useDevMode: true
      })
    ],
    production: [
      qiankun(name, {
        useDevMode: false
      })
    ]
  }
  const base = envMap.VITE_BASE
  return defineConfig({
    base: base,
    plugins: [..._plugins[mode], ElementPlus(), vue()],
    server: {
      port: 9001,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      host: '0.0.0.0',
      proxy: {
        '/iot-api': {
          target: 'http://ws-uat-gateway.hzguode.com',
          ws: true,
          changeOrigin: true
          // rewrite: (path) => path.replace(/^\/iot-api/, ''),
        },
        '/oss-api': {
          target: 'http://ws-uat-gateway.hzguode.com',
          ws: true,
          changeOrigin: true
        },
        '/geoserver': {
          target: 'http://10.1.8.175:31180',
          ws: true,
          changeOrigin: true
        },
        
        '/map': {
          target: 'http://10.1.8.168:8082',
          ws: true,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/map/, ''),
        },
        // '/geoserver': {
        //   target: 'http://10.56.54.218:31231',
        //   ws: true,
        //   changeOrigin: true
        // },
        // '/gis-api': {
        //   target: 'http://10.1.8.175:31957',
        //   ws: true,
        //   changeOrigin: true,
        // },
        // '/system-api': {
        //   target: 'http://10.1.8.175:31957',
        //   ws: true,
        //   changeOrigin: true,
        // },
        '/api': {
          target: 'http://10.1.8.175:31957',
          // target: 'http://172.16.2.214:31957', //沈北
          ws: true,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        },
        '/revenue_api': {
          target: 'http://10.1.8.175:31151',
          ws: true,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/revenue_api/, '')
        },
        '/ali_areas': {
          target: 'https://geo.datav.aliyun.com',
          ws: true,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/ali_areas/, '')
        },
        '/sws-api': {
          // target: 'http://172.16.2.214:31957',
          target: 'http://ws-uat-gateway.hzguode.com/',
          ws: true,
          changeOrigin: true,
        }
      }
    },
    resolve: {
      alias: { '@': '/src' },
      extensions: ['.js', 'index.js', '.vue', 'index.vue', '.json', '.scss', '*']
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import '@/assets/css/variables.scss';`,
        },
      },
    },
  })
}
