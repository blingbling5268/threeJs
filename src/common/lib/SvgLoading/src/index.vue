<template>
  <div class="screen-loading">
    <svg :width="width" :height="height" viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="22" fill="none" :stroke="outsideColor" stroke-width="3" stroke-linecap="round" stroke-dasharray="34">
        <animateTransform attributeName="transform" type="rotate" values="0 25 25;360 25 25" :dur="`${speed}s`" repeatCount="indefinite"></animateTransform>
        <animate attributeName="stroke" :values="outsideColorAnimation" :dur="`${+speed*2}s`" repeatCount="indefinite"></animate>
      </circle>
      <circle cx="25" cy="25" r="12" fill="none" :stroke="insideColor" stroke-width="3" stroke-linecap="round" stroke-dasharray="19">
        <animateTransform attributeName="transform" type="rotate" values="360 25 25;0 25 25" :dur="`${speed}s`" repeatCount="indefinite"></animateTransform>
        <animate attributeName="stroke" :values="insideColorAnimation" :dur="`${+speed*2}s`" repeatCount="indefinite"></animate>
      </circle>
    </svg>
    <slot></slot>
  </div>
</template>
<script>
const COMPONENT_NAME = 'screeLoading'
export default {
  name: COMPONENT_NAME,
  props: {
    width: { type: [String, Number], default: 50 },
    height: { type: [String, Number], default: 50 },
    outsideColor: { type: String, default: '#3be6cb' },
    insideColor: { type: String, default: '#02bcf3' },
    speed: { type: [String, Number], default: 2 },
  },
  computed: {
    outsideColorAnimation() {
      return `${this.insideColor};${this.outsideColor};${this.insideColor}`
    },
    insideColorAnimation() {
      return `${this.outsideColor};${this.insideColor};${this.outsideColor}`
    },
  },
}
</script>

<style lang="scss" scoped>
.screen-loading {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>