<template>
  <!-- Ch06 电影票房：票房分布地图 + 自制统计图 -->
  <div class="showcase-boxoffice">
    <h3 class="showcase-title">全国电影票房城市分布与市场分析</h3>

    <!-- 热力地图 -->
    <div class="boxoffice-map">
      <div class="map-wrapper">
        <div id="boxoffice-map" class="leaflet-map"></div>
        <div class="map-tag-overlay">
          <span class="tag-badge">2025年全国票房分布热力图</span>
        </div>
      </div>
    </div>

    <!-- 统计图表组 -->
    <div class="boxoffice-charts">
      <div class="chart-card">
        <h4>十五五总票房增长曲线</h4>
        <div class="chart-area" ref="lineChartEl"></div>
      </div>
      <div class="chart-card">
        <h4>国产电影 vs 进口电影票房占比</h4>
        <div class="chart-area" ref="pieChartEl"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import * as echarts from 'echarts'

const lineChartEl = ref<HTMLElement>()
const pieChartEl = ref<HTMLElement>()
let map: L.Map | null = null
let lineChart: echarts.ECharts | null = null
let pieChart: echarts.ECharts | null = null

const boxofficeCities = [
  { lat: 39.9, lng: 116.4, name: '北京', value: 62 },
  { lat: 31.23, lng: 121.47, name: '上海', value: 58 },
  { lat: 23.13, lng: 113.26, name: '广州', value: 42 },
  { lat: 22.54, lng: 114.06, name: '深圳', value: 38 },
  { lat: 30.57, lng: 104.07, name: '成都', value: 35 },
  { lat: 30.27, lng: 120.15, name: '杭州', value: 28 },
  { lat: 29.56, lng: 106.55, name: '重庆', value: 32 },
  { lat: 30.59, lng: 114.3, name: '武汉', value: 26 },
  { lat: 36.07, lng: 120.38, name: '青岛', value: 18 },
  { lat: 34.27, lng: 108.93, name: '西安', value: 22 },
  { lat: 28.23, lng: 112.94, name: '长沙', value: 24 },
  { lat: 32.06, lng: 118.8, name: '南京', value: 27 }
]

function initMap() {
  const el = document.getElementById('boxoffice-map')
  if (!el) return
  map = L.map(el, { center: [35, 105], zoom: 4, zoomControl: false, attributionControl: false })
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd', maxZoom: 19
  }).addTo(map)
  boxofficeCities.forEach(c => {
    const r = Math.max(8, c.value / 2.5)
    L.circleMarker([c.lat, c.lng], {
      radius: r, fillColor: '#F39C12', color: '#F39C12', weight: 1, opacity: 0.7, fillOpacity: 0.4
    }).addTo(map!).bindPopup(`<b>${c.name}</b><br/>票房: ${c.value}亿元`)
  })
}

function initCharts() {
  if (lineChartEl.value) {
    lineChart = echarts.init(lineChartEl.value)
    lineChart.setOption({
      backgroundColor: 'transparent',
      grid: { left: 50, right: 20, top: 30, bottom: 30 },
      xAxis: { type: 'category', data: ['2026', '2027', '2028', '2029', '2030'],
        axisLabel: { color: '#888' }, axisLine: { lineStyle: { color: '#ddd' } } },
      yAxis: { type: 'value', name: '亿元', nameTextStyle: { color: '#888' },
        axisLabel: { color: '#888' }, splitLine: { lineStyle: { color: '#f0f0f0' } } },
      series: [{
        type: 'line', smooth: true,
        data: [518, 545, 580, 610, 650],
        lineStyle: { color: '#F39C12', width: 3 },
        itemStyle: { color: '#F39C12' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(243,156,18,0.3)' },
            { offset: 1, color: 'rgba(243,156,18,0)' }
          ])
        }
      }]
    })
  }
  if (pieChartEl.value) {
    pieChart = echarts.init(pieChartEl.value)
    pieChart.setOption({
      backgroundColor: 'transparent',
      tooltip: { trigger: 'item' },
      series: [{
        type: 'pie', radius: ['40%', '70%'], center: ['50%', '50%'],
        data: [
          { name: '国产电影', value: 68, itemStyle: { color: '#CC0000' } },
          { name: '进口电影', value: 32, itemStyle: { color: '#3498DB' } }
        ],
        label: { color: '#555', fontSize: 13 },
        labelLine: { lineStyle: { color: '#ccc' } }
      }]
    })
  }
}

const ro = new ResizeObserver(() => { lineChart?.resize(); pieChart?.resize() })
onMounted(() => {
  setTimeout(initMap, 300)
  setTimeout(initCharts, 400)
  if (lineChartEl.value) ro.observe(lineChartEl.value)
  if (pieChartEl.value) ro.observe(pieChartEl.value)
})
onUnmounted(() => {
  ro.disconnect(); map?.remove(); lineChart?.dispose(); pieChart?.dispose()
})
</script>

<style scoped>
.showcase-boxoffice { display: flex; flex-direction: column; gap: 32px; }
.showcase-title { font-size: 18px; font-weight: 700; color: var(--text-primary); letter-spacing: 1px; }
.map-wrapper {
  position: relative; height: 400px; border-radius: 12px; overflow: hidden;
  box-shadow: 0 4px 24px rgba(0,0,0,0.1);
}
.leaflet-map { width: 100%; height: 100%; }
.map-tag-overlay {
  position: absolute; top: 16px; left: 16px; z-index: 500;
}
.tag-badge {
  padding: 4px 14px; background: rgba(0,0,0,0.7); color: white;
  border-radius: 20px; font-size: 12px; font-weight: 600;
}
.boxoffice-charts { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.chart-card {
  padding: 24px; background: white; border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.04); box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}
.chart-card h4 { font-size: 15px; font-weight: 700; color: var(--text-primary); margin-bottom: 12px; }
.chart-area { width: 100%; height: 260px; }
@media (max-width: 767px) {
  .boxoffice-charts { grid-template-columns: 1fr; }
  .map-wrapper { height: 300px; }
}
</style>
