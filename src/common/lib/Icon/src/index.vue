<template>
  <div class="icon-wrapper" :style="{...style}">
    <svg class="icon" aria-hidden="true">
      <use :xlink:href="iconName"></use>
    </svg>
  </div>

</template>
<script>
const COMPONENT_NAME = 'icon'
export default {
  name: COMPONENT_NAME,
  props: {
    name: String,
    style: Object,
    prefix: {
      type: String,
      default: 'icon-',
    },
  },
  computed: {
    iconName() {
      return `#${this.prefix}${this.name}`
    },
  },
}
</script>
<style >
.icon-wrapper {
  display: inline-block;
}
.icon {
  width: 100%;
  height: 100%;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
