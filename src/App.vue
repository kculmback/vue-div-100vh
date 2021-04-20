<template lang="pug">
  #app
    vue100vh.main(:style="thing")
      span Hey There
</template>

<script>

export default {
  name: 'app',
  data () {
    return {
      thing: { minHeight: '100vvh' },
    }
  },
}
</script>

<style>
html, body {
  padding: 0;
  margin: 0;
}

.main {
  background: lightcoral;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
