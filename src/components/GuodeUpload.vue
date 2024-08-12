<!--
 * @Author: liubo lb@hzguode.com
 * @Date: 2023-06-01 16:05:55
 * @LastEditors: Wenguang Song
 * @LastEditTime: 2023-08-04 18:06
 * @FilePath: /GuangDe/src/components/GuodeUpload.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <el-upload
    v-model:file-list="props.fileList"
    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
  >
    <el-icon></el-icon>
  </el-upload>
  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue';
// import { Plus } from '@icons'

const props = defineProps({
  fileList: { type: Array, default: () => [] }
})

let dialogVisible = ref(false)
let dialogImageUrl = ref('')



</script>

<style>

</style>