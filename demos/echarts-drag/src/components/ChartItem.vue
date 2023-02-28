<template>
  <div ref="chart" class="chart-item"></div>
</template>
<script setup>
import { ref } from 'vue'

const props = defineProps({
  chartType: {
    type: String,
    default: 'line'
  },
  options: {
    type: Object,
    default: () => ({})
  }
})

const chart = ref(null)
</script>
