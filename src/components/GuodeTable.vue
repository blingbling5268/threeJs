<!--
 * @Author: liubo lb@hzguode.com
 * @Date: 2023-05-29 15:10:50
 * @LastEditors: liubo lb@hzguode.com
 * @LastEditTime: 2023-12-25 15:42:50
 * @FilePath: /guangde-map/src/components/GuodeTable.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <el-table class="common-table" :data="data" border stripe empty-text="暂无数据" v-loading="loading" :highlight-current-row="config?.highlightCurrentRow || false" :show-overflow-tooltip="true" v-bind="$attrs" ref="tableRef">
    <el-table-column v-for="(item, index) in columns" :key='item.prop' :prop="item.prop" :label="item.label" align="center" v-bind="columns[index]">
      <template v-if="item.slotName" v-slot="slotProps">
        <slot :name="item.slotName" :row="slotProps.row" :column="item" :index="slotProps.$index" v-if="item.slotName"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
import { watch, ref } from 'vue'
const props = defineProps({
  data: Array,
  columns: Array,
  pageInfo: Object,
  loading: Boolean,
  config: Object,
})
const emits = defineEmits(['updateTable'])
const tableRef = ref(null)

defineExpose({
  tableRef,
})

</script>

<style scoped lang="scss">
  .common-table{
    height: calc(100% - 60px)
  }
</style>
