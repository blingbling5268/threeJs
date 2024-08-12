<!--
 * @Author: liubo lb@hzguode.com
 * @Date: 2023-05-29 15:02:26
 * @LastEditors: liubo lb@hzguode.com
 * @LastEditTime: 2024-01-29 14:17:56
 * @FilePath: /guangde-map/src/components/GuodePageList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

<template>
  <div class="common-pagelist">
    <div class="search-box" ref="pageRef" v-if="config.searchs">
      <GuodeForm :form="data" :rules="config.rules" :options="config.searchs" :label-width="labelWidth" :isSearch="true" @updateTable="handleUpdateTable" v-bind="$attrs">
        <template v-for="(searchItem, index) in slotMap" v-slot:[searchItem.slotName]="slotProps">
          <div :key="index">
            <slot :name="searchItem.slotName" :row="slotProps.row" :searchItem="searchItem" :index="index" />
          </div>
        </template>
      </GuodeForm>
    </div>
    <slot name="tableTop"></slot>
    <div class="table-box">
      <GuodeTable :loading="loading" :data="data.data" :pageInfo="data.pageInfo" :columns="config.columns" :config="config.tableConfig" :isPagination="isPagination" @updateTable="handleUpdateTable" v-bind="$attrs" ref="guodeTableRef" >
        <template v-for="(column, index) in config.columns ? config.columns.filter((it) => it.slotName) : []" v-slot:[column.slotName]="slotProps">
          <div :key="index">
            <slot :name="column.slotName" :row="slotProps.row" :column="column" :index="slotProps.index" />
          </div>
        </template>
      </GuodeTable>
      <el-pagination
        v-model:currentPage="data.pageInfo.page"
        v-model:page-size="data.pageInfo.size"
        :page-sizes="[10, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="data.pageInfo.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        v-bind="$attrs"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, watch, computed, nextTick, onMounted, reactive, watchEffect } from 'vue'

const props = defineProps({
  config: {
    type: Object,
    default: {}
  },
  data: {
    type: Object,
    default: () => {}
  },
  isPagination: {
    type: Boolean,
    default: true
  },
  labelWidth: {
    type: String,
    default: '100px'
  },
  loading: Boolean
})
const emits = defineEmits(['getTable'])
const guodeTableRef = ref(null)
let pageRef = ref(null)

const handleUpdateTable = () => {
  emits('getTable')
}

const handleSizeChange = (val) => {
  emits('getTable')
}
const handleCurrentChange = (val) => {
  emits('getTable')
}

let slotMap = computed(() => {
  const object = props.config.searchs
  if (toString.call(object) === "[object Array]") {
    return object.filter((it) => it.slotName)
  } else {
    const resMap = {}
    for (const key in object) {
      if (object[key].hasOwnProperty("slotName")) {
        resMap[key] = object[key]
      }
    }
    return resMap
  }
})

// 监听
watch(
  () => props.data,
  (val) => {
    if (!val?.hasOwnProperty("pageInfo") && props.isPagination) val["pageInfo"] = { page: 1, size: 10, total: 0 }
  },
  { immediate: true }
)

defineExpose({
  guodeTableRef,
})


</script>

<style scoped lang="scss">
.common-pagelist{
  height: 100%;
  display: flex;
  flex-direction: column;
  .search-box{
    margin-bottom: 10px;
  }
}
.table-box{
  flex: 1;
  overflow: hidden;
  position: relative;
}
</style>
