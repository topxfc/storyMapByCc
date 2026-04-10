<template>
  <!-- Ch11 铁路里程：铁路网地图 + 里程增长统计图 -->
  <div class="showcase-railway">
    <h3 class="showcase-title">十五五末全国铁路网与里程增长</h3>

    <!-- 铁路网地图 -->
    <div class="railway-map">
      <div class="map-wrapper">
        <div id="railway-map" class="leaflet-map"></div>
        <div class="map-info-overlay">
          <span class="info-badge">全国铁路网分布图</span>
          <div class="info-stats">
            <div class="is-item"><span class="is-val">16.5</span><span class="is-unit">万公里</span><span class="is-lab">铁路总里程</span></div>
            <div class="is-item"><span class="is-val">4.6</span><span class="is-unit">万公里</span><span class="is-lab">高铁里程</span></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 增长统计图 -->
    <div class="railway-charts">
      <div class="chart-card">
        <h4>2026-2030年铁路/高铁里程增长</h4>
        <div class="chart-area" ref="railChartEl"></div>
      </div>
      <div class="chart-card">
        <h4>八纵八横高铁主通道完成率</h4>
        <div class="corridor-list">
          <div v-for="c in corridors" :key="c.name" class="corridor-item">
            <span class="cor-name">{{ c.name }}</span>
            <div class="cor-bar-track">
              <div class="cor-bar-fill" :style="`width:${c.pct}%;background:${c.color}`"></div>
            </div>
            <span class="cor-pct">{{ c.pct }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import * as echarts from 'echarts'

const railChartEl = ref<HTMLElement>()
let map: L.Map | null = null
let chart: echarts.ECharts | null = null

const corridors = [
  { name: '京沪通道', pct: 100, color: '#CC0000' },
  { name: '京港澳通道', pct: 95, color: '#E63939' },
  { name: '京哈通道', pct: 92, color: '#1A5CFF' },
  { name: '沿海通道', pct: 88, color: '#4B83FF' },
  { name: '兰新通道', pct: 78, color: '#D4A843' },
  { name: '包银海通道', pct: 72, color: '#E67E22' }
]

// 主要高铁线路节点（简化）
const railNodes = [
  { lat: 39.9, lng: 116.4, name: '北京' },
  { lat: 31.23, lng: 121.47, name: '上海' },
  { lat: 23.13, lng: 113.26, name: '广州' },
  { lat: 22.54, lng: 114.06, name: '深圳' },
  { lat: 30.57, lng: 104.07, name: '成都' },
  { lat: 30.59, lng: 114.3, name: '武汉' },
  { lat: 34.27, lng: 108.93, name: '西安' },
  { lat: 45.75, lng: 126.65, name: '哈尔滨' },
  { lat: 36.07, lng: 120.38, name: '青岛' },
  { lat: 28.23, lng: 112.94, name: '长沙' },
  { lat: 26.07, lng: 119.3, name: '福州' },
  { lat: 25.04, lng: 102.73, name: '昆明' },
  { lat: 36.62, lng: 101.77, name: '西宁' },
  { lat: 43.82, lng: 87.62, name: '乌鲁木齐' }
]

// 主要线路连线
const railLines: [number, number][][] = [
  [[39.9,116.4],[36.07,120.38],[31.23,121.47]], // 京沪
  [[39.9,116.4],[30.59,114.3],[28.23,112.94],[23.13,113.26],[22.54,114.06]], // 京广
  [[39.9,116.4],[45.75,126.65]], // 京哈
  [[31.23,121.47],[30.27,120.15],[26.07,119.3],[23.13,113.26]], // 沿海
  [[34.27,108.93],[36.62,101.77],[43.82,87.62]], // 兰新
  [[34.27,108.93],[30.57,104.07],[25.04,102.73]] // 西成昆
]

function initMap() {
  const el = document.getElementById('railway-map')
  if (!el) return
  map = L.map(el, { center: [35, 105], zoom: 4, zoomControl: false, attributionControl: false })
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd', maxZoom: 19
  }).addTo(map)

  // 线路
  const colors = ['#CC0000','#E63939','#1A5CFF','#4B83FF','#D4A843','#27AE60']
  railLines.forEach((line, i) => {
    L.polyline(line as [number,number][], {
      color: colors[i % colors.length], weight: 3, opacity: 0.6, dashArray: '8 4'
    }).addTo(map!)
  })

  // 节点
  railNodes.forEach(n => {
    L.circleMarker([n.lat, n.lng], {
      radius: 5, fillColor: '#CC0000', color: 'white', weight: 2, fillOpacity: 1
    }).addTo(map!).bindPopup(`<b>${n.name}</b>`)
  })
}

function initChart() {
  if (!railChartEl.value) return
  chart = echarts.init(railChartEl.value)
  chart.setOption({
    backgroundColor: 'transparent',
    legend: { data: ['铁路总里程', '高铁里程'], top: 0, textStyle: { color: '#888', fontSize: 12 } },
    grid: { left: 50, right: 20, top: 40, bottom: 30 },
    xAxis: { type: 'category', data: ['2026','2027','2028','2029','2030'],
      axisLabel: { color: '#888' }, axisLine: { lineStyle: { color: '#ddd' } } },
    yAxis: { type: 'value', name: '万公里', nameTextStyle: { color: '#888' },
      axisLabel: { color: '#888' }, splitLine: { lineStyle: { color: '#f0f0f0' } } },
    series: [
      { name: '铁路总里程', type: 'line', smooth: true, data: [16.0,16.2,16.3,16.4,16.5],
        lineStyle: { color: '#CC0000', width: 3 }, itemStyle: { color: '#CC0000' },
        areaStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[
          { offset: 0, color: 'rgba(204,0,0,0.15)' }, { offset: 1, color: 'rgba(204,0,0,0)' }
        ])} },
      { name: '高铁里程', type: 'line', smooth: true, data: [4.2,4.3,4.4,4.5,4.6],
        lineStyle: { color: '#1A5CFF', width: 3 }, itemStyle: { color: '#1A5CFF' },
        areaStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[
          { offset: 0, color: 'rgba(26,92,255,0.15)' }, { offset: 1, color: 'rgba(26,92,255,0)' }
        ])} }
    ]
  })
}

const ro = new ResizeObserver(() => chart?.resize())
onMounted(() => {
  setTimeout(initMap, 300)
  setTimeout(initChart, 400)
  if (railChartEl.value) ro.observe(railChartEl.value)
})
onUnmounted(() => { ro.disconnect(); map?.remove(); chart?.dispose() })
</script>

<style scoped>
.showcase-railway { display: flex; flex-direction: column; gap: 32px; }
.showcase-title { font-size: 18px; font-weight: 700; color: var(--text-primary); letter-spacing: 1px; }
.map-wrapper {
  position: relative; height: 450px; border-radius: 12px; overflow: hidden;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08); border: 1px solid rgba(0,0,0,0.06);
}
.leaflet-map { width: 100%; height: 100%; }
.map-info-overlay {
  position: absolute; top: 16px; left: 16px; z-index: 500;
  display: flex; flex-direction: column; gap: 8px;
}
.info-badge { padding: 4px 14px; background: white; border-radius: 20px; font-size: 12px; font-weight: 600; color: var(--text-primary); box-shadow: 0 2px 8px rgba(0,0,0,0.1); display: inline-flex; align-self: flex-start; }
.info-stats { display: flex; gap: 12px; }
.is-item { padding: 8px 14px; background: white; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); display: flex; flex-direction: column; }
.is-val { font-size: 20px; font-weight: 900; color: #CC0000; font-family: var(--font-num); }
.is-unit { font-size: 12px; color: var(--text-muted); }
.is-lab { font-size: 10px; color: var(--text-muted); }

.railway-charts { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.chart-card { padding: 24px; background: white; border-radius: 14px; border: 1px solid rgba(0,0,0,0.04); box-shadow: 0 2px 12px rgba(0,0,0,0.04); }
.chart-card h4 { font-size: 15px; font-weight: 700; color: var(--text-primary); margin-bottom: 12px; }
.chart-area { width: 100%; height: 260px; }

.corridor-list { display: flex; flex-direction: column; gap: 12px; }
.corridor-item { display: grid; grid-template-columns: 100px 1fr 40px; gap: 10px; align-items: center; }
.cor-name { font-size: 13px; font-weight: 600; color: var(--text-primary); text-align: right; }
.cor-bar-track { height: 20px; background: rgba(0,0,0,0.04); border-radius: 10px; overflow: hidden; }
.cor-bar-fill { height: 100%; border-radius: 10px; transition: width 1s ease-out; }
.cor-pct { font-size: 13px; font-weight: 700; color: var(--text-primary); font-family: var(--font-num); }

@media (max-width: 767px) {
  .railway-charts { grid-template-columns: 1fr; }
  .map-wrapper { height: 300px; }
}
</style>
