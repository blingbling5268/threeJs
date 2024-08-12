<template>
  <div :class="[`echarts${uuid}`]"></div>
</template>
<script>
import { v4 as uuidv4 } from "uuid"
import * as ECharts from "echarts"
const COMPONENT_NAME = "vEchart"
export default {
  name: COMPONENT_NAME,
  props: {
    options: Object,
    theme: {
      type: String,
      default: "dark",
    },
  },
  data() {
    return { uuid: null }
  },
  watch: {
    options: {
      handler() {
        if (!this.chart) {
          this.initChart()
        }
      },
    },
  },
  created() {
    this.uuid = uuidv4()
  },
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      this.dom = document.getElementsByClassName(`echarts${this.uuid}`)[0]
      this.chart = ECharts.init(this.dom, this.theme)
      this.chart.setOption(this.options)
    },
  },
}
</script>
<style lang="scss"></style>
