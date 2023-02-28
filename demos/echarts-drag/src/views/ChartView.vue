<template>
  <div class="chart-view">
    <div class="chart-view__header">
      <el-button @click="openDrawer">图表</el-button>
    </div>

    <div class="chart-view__body"
      :class="{grid: showGrid}"
      ref="bodyRef"
      @drop="chooseChart"
      @dragover="onDragOver"
      @dragenter="onDragEnter">
      <!-- <div class="chart-view__body__mask" :class="{grid: showGrid}">
        <ul v-for="rowIndex in Number(row)" :key="rowIndex" class="mask-row">
          <li v-for="columnIndex in Number(column)" :key="columnIndex" class="mask-column mask-item"></li>
        </ul>
      </div>
      <div>{{ selectedBox }}</div> -->
        <grid-layout
          :layout.sync="layout"
          :col-num="column"
          :row-height="rowHeight"
          :max-rows="row"
          :is-draggable="true"
          :is-resizable="true"
          :is-mirrored="false"
          :vertical-compact="false"
          :margin="[10, 10]"
          :use-css-transforms="true"
        >
        <grid-item v-for="item in layout"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :key="item.i">
          <!-- {{item.i}} -->
          <component :is="chartMap[item.chartId]" />
        </grid-item>
    </grid-layout>
    </div>

    <el-drawer
      ref="drawerRef"
      title="我是标题"
      :visible.sync="drawerVisible"
      @dragenter.native="hideDrawerWhenDrag"
      @drop.native="chooseChart"
      :modal="false"
      direction="rtl"
      :before-close="handleClose">
      <p>
        <label for="row">
          行
          <input id="row" v-model.number="row" @change="updateRowHeight"></input>
        </label>
      </p>
      <p>
        <label for="row">
          列
          <input id="row" v-model.number="column"></input>
        </label>
      </p>
      <ul class="chart-box" @dragstart="onDragStart">
        <li class="chart-box__item red" draggable="true">red</li>
        <li class="chart-box__item blue" draggable="true">blue</li>
        <li class="chart-box__item green" draggable="true">green</li>
      </ul>
    </el-drawer>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import VueGridLayout from 'vue-grid-layout'

import PropertyChart from '@/components/charts/PropertyChart.vue'
import SchoolDegreeChart from '@/components/charts/SchoolDegreeChart.vue'

const GridLayout = VueGridLayout.GridLayout
const GridItem = VueGridLayout.GridItem

const chartMap = ref({
  propertyChart: PropertyChart,
  schoolDegreeChart: SchoolDegreeChart
})

let layoutContainer = null
onMounted(() => {
  layoutContainer = document.querySelector('.chart-view__body')
  updateRowHeight()
})

const layout = ref([
  { x: 0, y: 0, w: 1, h: 1, i: '0', chartId: 'propertyChart' },
  { x: 1, y: 0, w: 1, h: 1, i: '1', chartId: 'schoolDegreeChart' },
  { x: 2, y: 0, w: 1, h: 1, i: '2', chartId: 'propertyChart' }
])

const drawerVisible = ref(false)
const bodyRef = ref(null)
const drawerRef = ref(null)
const selectedBox = ref('请选择')
const showGrid = ref(false)
const row = ref(3)
const column = ref(3)
const rowHeight = ref(100)

function handleClose (done) {
  done()
}

function onDragStart (e) {
  if (e.target.nodeName !== 'LI' || !e.target.className.includes('box')) {
    return
  }
  selectedBox.value = e.target.innerText
  console.log('dragstart')
}

function onDragEnter (e) {
  console.log('drag enter')
  showGrid.value = true
}

function onDragOver (e) {
  console.log('drag over')
  e.preventDefault()
}

function chooseChart (ev) {
  ev.preventDefault()
  console.log(ev.target)
  console.log('choose chart')
  drawerVisible.value = true
  drawerRef.value.$el.style.display = 'block'
  showGrid.value = false
}

function openDrawer () {
  drawerVisible.value = true
  drawerRef.value.$el.style.display = 'block'
}

function hideDrawerWhenDrag (ev) {
  if (ev.target === document.querySelector('.el-drawer__container')) {
    drawerVisible.value = false
    drawerRef.value.$el.style.display = 'none'
  }
}

function showDrawerAfterDrag () {
  drawerVisible.value = true
  drawerRef.value.$el.style.display = 'block'
}

let timer = null
window.addEventListener('resize', (ev) => {
  console.log('resize')
  if (timer) {
    clearTimeout(timer)
    // rowHeight.value = layoutContainer.clientHeight / row.value
  }
  timer = setTimeout(updateRowHeight, 1000)
})

function updateRowHeight () {
  const marginHeight = 10
  rowHeight.value = (layoutContainer.clientHeight - marginHeight * (row.value + 1)) / row.value
}

</script>
<style lang="scss" scoped>
.chart-view {
  display: flex;
  height: 100%;
  flex-direction: column;
}
.chart-view__body {
  position: relative;
  flex-grow: 1;
  // border: 1px solid;
  // &.grid {
  //   background: orange;
  // }
}
.chart-view__body__mask {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .mask-row {
    flex-grow: 1;
    display: flex;
    justify-content: space-around;
    transition: border-color .2s;
  }
  .mask-column {
    flex-grow: 1;
    transition: border-color .2s;
  }
  .mask-item {
    border-left: 1px dashed transparent;
    border-bottom: 1px dashed transparent;
  }
  .mask-row:first-child {
    border-top: 1px dashed transparent;
  }
  .mask-column:last-child {
    border-right: 1px dashed transparent;
  }
  &.grid {
    .mask-row, .mask-column {
      border-color: orange;
    }
  }
}
.chart-box__item {
  width: 50px;
  height: 50px;
  &.red {
    background: red;
  }
  &.blue {
    background: blue;
  }
  &.green {
    background: green;
  }
}

.vue-grid-item {
  background: gray;
}
</style>
