<template>
  <!-- 安保管理人员学历分布 -->
  <div ref="chartRef" class="chart-item"></div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)

const option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: true,
      backgroundStyle: {
        color: 'rgba(180, 180, 180, 0.2)'
      }
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
