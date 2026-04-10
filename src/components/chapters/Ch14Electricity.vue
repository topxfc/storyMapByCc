<template>
  <!-- Ch14 用电量：能源分布地图 + 数据统计图 + 能源结构滑块对比 -->
  <div class="showcase-electricity">
    <h3 class="showcase-title">清洁能源基地分布与用电量增长</h3>

    <!-- 1. 能源分布地图 -->
    <div class="energy-map">
      <div class="map-wrapper">
        <div id="energy-map" class="leaflet-map"></div>
        <div class="map-legend-box">
          <span class="legend-badge">全国清洁能源基地分布</span>
          <div class="legend-items">
            <span class="leg-item"><span class="leg-dot" style="background:#F1C40F"></span>光伏</span>
            <span class="leg-item"><span class="leg-dot" style="background:#3498DB"></span>风电</span>
            <span class="leg-item"><span class="leg-dot" style="background:#27AE60"></span>水电</span>
            <span class="leg-item"><span class="leg-dot" style="background:#E74C3C"></span>核电</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. 用电量增长曲线 -->
    <div class="charts-row">
      <div class="chart-card">
        <h4>十五五用电量增长曲线</h4>
        <div class="chart-area" ref="elecChartEl"></div>
      </div>

      <!-- 3. 能源结构滑块对比 -->
      <div class="chart-card">
        <h4>十五五初 vs 末 能源结构占比</h4>
        <CompareSlider
          leftTag="2026年初"
          rightTag="2030年末"
          :initialPosition="50"
          :isDark="false"
        >
          <template #left>
            <div class="energy-pie-wrap">
              <div class="pie-visual">
                <svg viewBox="0 0 120 120" class="pie-svg">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#E5E7EB" stroke-width="20"/>
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#4B83FF" stroke-width="20"
                    stroke-dasharray="94 220" stroke-dashoffset="-55" stroke-linecap="round"/>
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#F1C40F" stroke-width="20"
                    stroke-dasharray="63 251" stroke-dashoffset="-149" stroke-linecap="round"/>
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#27AE60" stroke-width="20"
                    stroke-dasharray="50 264" stroke-dashoffset="-212" stroke-linecap="round"/>
                  <text x="60" y="56" text-anchor="middle" fill="#1a1a2e" font-size="14" font-weight="900">30%</text>
                  <text x="60" y="72" text-anchor="middle" fill="#888" font-size="9">清洁能源</text>
                </svg>
              </div>
              <div class="pie-legend">
                <span>煤电 52% | 气电 18%</span>
                <span>风电 12% | 光伏 8% | 水电 7% | 核电 3%</span>
              </div>
            </div>
          </template>
          <template #right>
            <div class="energy-pie-wrap">
              <div class="pie-visual">
                <svg viewBox="0 0 120 120" class="pie-svg">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#E5E7EB" stroke-width="20"/>
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#4B83FF" stroke-width="20"
                    stroke-dasharray="126 188" stroke-dashoffset="-55" stroke-linecap="round"/>
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#F1C40F" stroke-width="20"
                    stroke-dasharray="75 239" stroke-dashoffset="-181" stroke-linecap="round"/>
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#27AE60" stroke-width="20"
                    stroke-dasharray="56 258" stroke-dashoffset="-256" stroke-linecap="round"/>
                  <text x="60" y="56" text-anchor="middle" fill="#27AE60" font-size="14" font-weight="900">45%</text>
                  <text x="60" y="72" text-anchor="middle" fill="#888" font-size="9">清洁能源</text>
                </svg>
              </div>
              <div class="pie-legend">
                <span>煤电 38% | 气电 17%</span>
                <span>风电 18% | 光伏 14% | 水电 8% | 核电 5%</span>
              </div>
            </div>
          </template>
        </CompareSlider>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import * as echarts from 'echarts'
import CompareSlider from '../CompareSlider.vue'

const elecChartEl = ref<HTMLElement>()
let map: L.Map | null = null
let chart: echarts.ECharts | null = null

const energyBases = [
  { lat: 40.5, lng: 109.8, name: '内蒙古风光基地', type: 'wind', color: '#3498DB' },
  { lat: 37.8, lng: 101.7, name: '青海光伏基地', type: 'solar', color: '#F1C40F' },
  { lat: 43.5, lng: 87.6, name: '新疆风光基地', type: 'wind', color: '#3498DB' },
  { lat: 36.5, lng: 95.0, name: '柴达木光伏', type: 'solar', color: '#F1C40F' },
  { lat: 29.5, lng: 103.0, name: '四川水电基地', type: 'hydro', color: '#27AE60' },
  { lat: 27.5, lng: 100.0, name: '云南水电基地', type: 'hydro', color: '#27AE60' },
  { lat: 21.5, lng: 109.0, name: '广西核电', type: 'nuclear', color: '#E74C3C' },
  { lat: 25.0, lng: 119.0, name: '福建核电', type: 'nuclear', color: '#E74C3C' },
  { lat: 39.0, lng: 117.0, name: '河北风电基地', type: 'wind', color: '#3498DB' },
  { lat: 47.0, lng: 125.0, name: '黑龙江风电', type: 'wind', color: '#3498DB' }
]

function initMap() {
  const el = document.getElementById('energy-map')
  if (!el) return
  map = L.map(el, { center: [35, 105], zoom: 4, zoomControl: false, attributionControl: false })
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd', maxZoom: 19
  }).addTo(map)
  energyBases.forEach(b => {
    L.circleMarker([b.lat, b.lng], {
      radius: 10, fillColor: b.color, color: b.color, weight: 1, opacity: 0.6, fillOpacity: 0.4
    }).addTo(map!).bindPopup(`<b>${b.name}</b>`)
  })
}

function initChart() {
  if (!elecChartEl.value) return
  chart = echarts.init(elecChartEl.value)
  chart.setOption({
    backgroundColor: 'transparent',
    grid: { left: 55, right: 20, top: 30, bottom: 30 },
    xAxis: { type: 'category', data: ['2026','2027','2028','2029','2030'],
      axisLabel: { color: '#888' }, axisLine: { lineStyle: { color: '#ddd' } } },
    yAxis: { type: 'value', name: '万亿kWh', nameTextStyle: { color: '#888' },
      axisLabel: { color: '#888' }, splitLine: { lineStyle: { color: '#f0f0f0' } } },
    series: [{ type: 'line', smooth: true, data: [10.2, 10.8, 11.4, 12.0, 12.8],
      lineStyle: { color: '#F1C40F', width: 3 }, itemStyle: { color: '#F1C40F' },
      areaStyle: { color: new echarts.graphic.LinearGradient(0,0,0,1,[
        { offset: 0, color: 'rgba(241,196,15,0.3)' }, { offset: 1, color: 'rgba(241,196,15,0)' }
      ])}
    }]
  })
}

const ro = new ResizeObserver(() => chart?.resize())
onMounted(() => {
  setTimeout(initMap, 300)
  setTimeout(initChart, 400)
  if (elecChartEl.value) ro.observe(elecChartEl.value)
})
onUnmounted(() => { ro.disconnect(); map?.remove(); chart?.dispose() })
</script>

<style scoped>
.showcase-electricity { display: flex; flex-direction: column; gap: 32px; }
.showcase-title { font-size: 18px; font-weight: 700; color: var(--text-primary); letter-spacing: 1px; }
.map-wrapper {
  position: relative; height: 400px; border-radius: 12px; overflow: hidden;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08); border: 1px solid rgba(0,0,0,0.06);
}
.leaflet-map { width: 100%; height: 100%; }
.map-legend-box {
  position: absolute; bottom: 16px; left: 16px; z-index: 500;
  background: white; padding: 10px 14px; border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.legend-badge { display: block; font-size: 12px; font-weight: 700; color: var(--text-primary); margin-bottom: 6px; }
.legend-items { display: flex; gap: 12px; }
.leg-item { display: flex; align-items: center; gap: 4px; font-size: 11px; color: var(--text-muted); }
.leg-dot { width: 8px; height: 8px; border-radius: 50%; }

.charts-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.chart-card {
  padding: 24px; background: white; border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.04); box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}
.chart-card h4 { font-size: 15px; font-weight: 700; color: var(--text-primary); margin-bottom: 12px; }
.chart-area { width: 100%; height: 260px; }

.energy-pie-wrap {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  height: 100%; padding: 20px; gap: 12px;
}
.pie-svg { width: 120px; height: 120px; }
.pie-legend { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.pie-legend span { font-size: 11px; color: var(--text-muted); text-align: center; }

@media (max-width: 767px) {
  .charts-row { grid-template-columns: 1fr; }
  .map-wrapper { height: 300px; }
}
</style>
