<!--
 * @Author: liubo lb@hzguode.com
 * @Date: 2023-06-01 15:58:31
 * @LastEditors: liubo lb@hzguode.com
 * @LastEditTime: 2023-09-27 16:38:52
 * @FilePath: /guangde-map/src/components/GuodeForm.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="common-form">
    <el-form :model="form" :rules="rules" :label-width="labelWidth || '100px'" ref="ruleForm" v-bind="$attrs" @submit.native.prevent>
      <el-row :gutter="20">
        <el-col :span="item.span || 6" v-for="(item, k) in options" :key="k">
          <el-form-item :label="item.label" :prop="k" v-bind="item">
            <component :is="item.component" v-model="form[k]" :schema="item" style="width: 100%" v-bind="item" v-if="!item.slotName"  @keydown.enter="search" ></component>
            <slot :name="item.slotName" :item="item" :data="form[k]" v-else />
          </el-form-item>
        </el-col>
        <div class="search-btn" v-if="isSearch">
          <el-button type="primary" @click="search">查询</el-button>
        </div>
      </el-row>
    </el-form>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps({
  form: { type: Object },
  rules: { type: Object },
  options: { type: [Array, Object] },
  defaultSearch: { type: Object },
  isSearch: { type: Boolean },
  labelWidth: { type: String },
})
const emits = defineEmits(['updateTable'])
const ruleForm = ref(null)


const search = () => {
  if (!props.isSearch) return
  emits('updateTable')
}

const validate = (callback) => {
  if (!ruleForm) return
  return ruleForm.value.validate(callback)
}

defineExpose({
  validate
})

</script>

<style lang="scss" scoped>
.common-form{
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.search-btn{
  display: inline-block;
  margin-left: 10px;
}
</style>
