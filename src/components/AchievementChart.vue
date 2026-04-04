<template>
  <div class="chart-wrapper" ref="chartEl"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'
import type { ChartConfig } from '../types'

const props = defineProps<{ config: ChartConfig; color: string }>()
const chartEl = ref<HTMLElement>()
let chart: echarts.ECharts | null = null

function buildOption(): echarts.EChartsOption {
  const { type, title, data } = props.config
  const c = props.color
  const d = data as Record<string, unknown>

  const baseOption: echarts.EChartsOption = {
    backgroundColor: 'transparent',
    title: {
      text: title,
      textStyle: { color: '#ccc', fontSize: 12, fontWeight: 'normal' },
      top: 4, left: 4
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(10,14,26,0.92)',
      borderColor: c,
      textStyle: { color: '#fff', fontSize: 12 }
    },
    grid: { left: 40, right: 12, top: 40, bottom: 36 }
  }

  if (type === 'bar') {
    const cats = (d.categories as string[]) || []
    const vals = (d.values as number[]) || (d.after as number[]) || []
    return {
      ...baseOption,
      xAxis: {
        type: 'category', data: cats,
        axisLabel: { color: '#888', fontSize: 10, interval: 0, rotate: cats.length > 4 ? 15 : 0 },
        axisLine: { lineStyle: { color: '#333' } }
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#888', fontSize: 10 },
        splitLine: { lineStyle: { color: '#1e2235' } }
      },
      series: [{
        type: 'bar', data: vals,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: c },
            { offset: 1, color: c + '88' }
          ]),
          borderRadius: [4, 4, 0, 0]
        },
        emphasis: { itemStyle: { color: c } }
      }]
    }
  }

  if (type === 'line') {
    const years = (d.years || d.months || d.months) as (number | string)[]
    const vals = d.values as number[]
    return {
      ...baseOption,
      xAxis: {
        type: 'category', data: years.map(String),
        axisLabel: { color: '#888', fontSize: 10 },
        axisLine: { lineStyle: { color: '#333' } }
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#888', fontSize: 10 },
        splitLine: { lineStyle: { color: '#1e2235' } }
      },
      series: [{
        type: 'line', data: vals, smooth: true,
        lineStyle: { color: c, width: 2 },
        itemStyle: { color: c },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: c + '66' },
            { offset: 1, color: c + '00' }
          ])
        }
      }]
    }
  }

  if (type === 'radar') {
    const indicators = (d.indicators as string[]).map(name => ({ name, max: 100 }))
    const series = d.series as Array<{ name: string; values: number[] }>
    return {
      ...baseOption,
      grid: undefined,
      radar: {
        indicator: indicators,
        shape: 'polygon',
        splitArea: { areaStyle: { color: ['rgba(255,255,255,0.02)', 'rgba(255,255,255,0.04)'] } },
        axisName: { color: '#888', fontSize: 10 },
        splitLine: { lineStyle: { color: '#1e2235' } }
      },
      series: [{
        type: 'radar',
        data: series.map(s => ({
          name: s.name,
          value: s.values,
          itemStyle: { color: c },
          lineStyle: { color: c },
          areaStyle: { color: c + '44' }
        }))
      }]
    }
  }

  if (type === 'pie') {
    const segments = d.segments as Array<{ name: string; value: number }>
    const colors = ['#cc0000','#e67e22','#3498db','#2ecc71','#9b59b6','#1abc9c']
    return {
      backgroundColor: 'transparent',
      title: {
        text: title,
        textStyle: { color: '#ccc', fontSize: 12, fontWeight: 'normal' },
        top: 4, left: 4
      },
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(10,14,26,0.92)',
        borderColor: c,
        textStyle: { color: '#fff', fontSize: 12 }
      },
      series: [{
        type: 'pie', radius: ['40%', '68%'],
        center: ['50%', '55%'],
        data: segments.map((s, i) => ({
          name: s.name, value: s.value,
          itemStyle: { color: colors[i % colors.length] }
        })),
        label: { color: '#aaa', fontSize: 11 },
        labelLine: { lineStyle: { color: '#444' } }
      }]
    }
  }

  return baseOption
}

function initChart() {
  if (!chartEl.value) return
  chart = echarts.init(chartEl.value, 'dark')
  chart.setOption(buildOption())
}

watch(() => props.config, () => {
  chart?.setOption(buildOption(), true)
})

const resizeObserver = new ResizeObserver(() => chart?.resize())

onMounted(() => {
  initChart()
  if (chartEl.value) resizeObserver.observe(chartEl.value)
})

onUnmounted(() => {
  resizeObserver.disconnect()
  chart?.dispose()
})
</script>

<style scoped>
.chart-wrapper {
  width: 100%;
  height: 220px;
  min-height: 180px;
}
</style>
