<template lang="pug">
  #app
    vue100vh(:styles="thing")
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      thing: { minHeight: '100vvh' },
    }
  },
  mounted () {
    // setTimeout(() => {
    //   this.thing = { minHeight: '50vvh' }
    // }, 1000)
    // setTimeout(() => {
    //   this.thing = { minHeight: '70vvh' }
    // }, 3000)
  },
}
</script>

<style>
#app {
}
</style>
