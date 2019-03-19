<template lang="pug">
  div(:style="internalStyle")
    slot
</template>

<script>
import getWindowHeight from '../scripts/getWindowHeight.js'
import convertStyle from '../scripts/convertStyle.js'
import defaultStyle from '../scripts/defaultStyle.js'

export default {
  name: 'Vue100vh',
  data () {
    return {
      internalStyle: {},
    }
  },
  props: {
    styles: {
      type: Object,
      default: () => defaultStyle,
    },
  },
  methods: {
    updateStyle () {
      const convertedStyle = convertStyle(this.styles, getWindowHeight())
      this.internalStyle = convertedStyle
    },
  },
  mounted () {
    this.updateStyle()
    window.addEventListener('resize', this.updateStyle)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.updateStyle)
  },
}
</script>

<style lang="postcss" scoped>
.root {}
</style>
