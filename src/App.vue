<!--
 * @Author: liubo lb@hzguode.com
 * @Date: 2023-08-28 14:37:02
 * @LastEditors: liubo lb@hzguode.com
 * @LastEditTime: 2024-08-12 10:39:07
 * @FilePath: /guangde-map/src/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  console.log('=========>初始化', 初始化);
})
</script>


<style lang="scss">
html,
body,
#app {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
</style>

