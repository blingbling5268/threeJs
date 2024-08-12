<!--
 * @Author: liubo lb@hzguode.com
 * @Date: 2023-06-01 16:05:55
 * @LastEditors: liubo lb@hzguode.com
 * @LastEditTime: 2023-06-03 17:14:38
 * @FilePath: /guangde-map/src/components/GuodeSelect.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-select v-model="inValue" v-bind="$attrs">
    <el-option v-for=" item in options" :key="item.value" :label="item[optionLabel]" :value="item[optionValue]">
    </el-option>
  </el-select>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  value: String,
  options: Array,
  optionLabel: {
    type: String,
    default: 'label',
  },
  optionValue: {
    type: String,
    default: 'value',
  },
})

const emit = defineEmits(['input'])

const inValue = computed({
  get() {
    return props.value
  },
  set(value) {
    emit('input', props.value)
  },
})


</script>

<style>

</style>