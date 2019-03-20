<template lang="pug">
  div(:style="internalStyle")
    slot
</template>

<script>
export default {
  name: 'Vue100vh',
  data () {
    return {
      forceRecompute: 0,
    }
  },
  props: {
    styles: {
      type: Object,
      default: () => ({ height: '100vvh' }),
    },
  },
  computed: {
    internalStyle () {
      const recompute = this.forceRecompute // eslint-disable-line
      return this.convertStyle()
    },
  },
  methods: {
    getWindowHeight () {
      return window.innerHeight
    },

    convertStyle () {
      const windowHeight = this.getWindowHeight()

      // throwOnBadArgs(givenStyle, windowHeight)

      const usedStyle = this.styles

      const convertedStyle = {}

      Object.keys(usedStyle).forEach(key => {
        convertedStyle[key] = typeof usedStyle[key] === 'string'
          ? this.replaceVvhWithPx(usedStyle[key], windowHeight)
          : usedStyle[key]
      })

      return convertedStyle
    },

    replaceVvhWithPx (propertyStringValue, windowHeight) {
      const vvhRegex = /(\d+(\.\d*)?)vvh(?!\w)/g

      return propertyStringValue.replace(
        vvhRegex,
        (_, vvh) => {
          return `${(windowHeight * parseFloat(vvh)) / 100}px`
        }
      )
    },

    updateStyle () {
      this.forceRecompute++
    },
  },
  mounted () {
    // this.updateStyle()
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
