<!--
 * @Author: liubo lb@hzguode.com
 * @Date: 2023-05-08 09:22:39
 * @LastEditors: liubo lb@hzguode.com
 * @LastEditTime: 2023-09-26 14:07:28
 * @FilePath: /guangde-map/src/views/gis/components/CommonDialog.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-dialog :model-value="props.visible" :title="dialogConfig.title" :width="dialogConfig.width" :class="dialogConfig.className || 'gis-common-dialog'" :close-on-click-modal="false" :close-on-press-escape="false" destroy-on-close @close="close">
    <slot></slot>
  </el-dialog>
</template>

<script setup>
  const props = defineProps({
    visible: {
      type: Boolean,
      default: false,
    },
    dialogConfig: {
      type: Object
    }
  })
  const emits = defineEmits(['update:visible'])

  const close = () => {
    emits('update:visible', false)
  }

</script>

<style lang="scss" scoped>

</style>