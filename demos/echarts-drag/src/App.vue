<template>
  <div id="app">
    <ChartView />
  </div>
</template>
<script>
import ChartView from './views/ChartView.vue'

export default {
  components: { ChartView }
}
</script>

<style scoped>
#app {
  height: 100%;
}
</style>
<style>
html, body {
  height: 100%;
  padding: 0;
  margin: 0;
}
ul, li {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}
</style>
