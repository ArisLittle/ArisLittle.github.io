<template>
  <!-- 产权信息 -->
  <div ref="chartRef" class="chart-item"></div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

// const props = defineProps({
//   chartType: {
//     type: String,
//     default: 'line'
//   },
//   options: {
//     type: Object,
//     default: () => ({})
//   }
// })

const chartRef = ref(null)

const option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
}

onMounted(() => {
  const chart = echarts.init(chartRef.value)
  chart.setOption(option)
})

</script>
<style scoped>
.chart-item {
  height: 100%;
}
</style>
