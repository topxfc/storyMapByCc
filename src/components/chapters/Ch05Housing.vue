<template>
  <!-- Ch05 住房标准：专题地图 + 数据对比图 -->
  <div class="showcase-housing">
    <h3 class="showcase-title">全国保障性住房分布与居住品质提升</h3>

    <!-- 地图区 -->
    <div class="housing-map">
      <div class="map-wrapper" ref="mapRef">
        <div id="housing-map" class="leaflet-map"></div>
        <div class="map-legend">
          <span class="legend-title">保障性住房分布密度</span>
          <div class="legend-scale">
            <span class="scale-low">低</span>
            <div class="scale-bar"></div>
            <span class="scale-high">高</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 数据对比图 -->
    <div class="housing-charts">
      <div class="chart-card">
        <h4>十五五 vs 十四五 人均居住面积对比</h4>
        <div class="bar-compare">
          <div v-for="item in areaCompare" :key="item.label" class="compare-row">
            <span class="row-label">{{ item.label }}</span>
            <div class="row-bars">
              <div class="bar bar-old" :style="`width:${item.old / maxArea * 100}%`">
                <span>{{ item.old }}m²</span>
              </div>
              <div class="bar bar-new" :style="`width:${item.new / maxArea * 100}%`">
                <span>{{ item.new }}m²</span>
              </div>
            </div>
          </div>
          <div class="legend-row">
            <span class="legend-old">■ 十四五末</span>
            <span class="legend-new">■ 十五五末</span>
          </div>
        </div>
      </div>

      <div class="chart-card">
        <h4>不同城市住房改善率对比</h4>
        <div class="city-bars">
          <div v-for="city in cityImprovement" :key="city.name" class="city-row">
            <span class="city-name">{{ city.name }}</span>
            <div class="city-bar-track">
              <div class="city-bar-fill" :style="`width:${city.rate}%;background:${city.color}`">
                <span class="city-rate">{{ city.rate }}%</span>
              </div>
            </div>
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

const mapRef = ref<HTMLElement>()
let map: L.Map | null = null

const maxArea = 52
const areaCompare = [
  { label: '全国平均', old: 41.8, new: 48.5 },
  { label: '城镇居民', old: 39.8, new: 46.2 },
  { label: '农村居民', old: 48.9, new: 52.0 }
]

const cityImprovement = [
  { name: '北京', rate: 28, color: '#CC0000' },
  { name: '上海', rate: 32, color: '#E63939' },
  { name: '广州', rate: 35, color: '#1A5CFF' },
  { name: '深圳', rate: 38, color: '#4B83FF' },
  { name: '成都', rate: 42, color: '#27AE60' },
  { name: '杭州', rate: 36, color: '#D4A843' },
  { name: '武汉', rate: 40, color: '#E67E22' },
  { name: '重庆', rate: 44, color: '#CC0000' }
]

// 保障性住房热点城市
const housingHotspots = [
  { lat: 39.9, lng: 116.4, name: '北京', count: 128000 },
  { lat: 31.23, lng: 121.47, name: '上海', count: 156000 },
  { lat: 23.13, lng: 113.26, name: '广州', count: 98000 },
  { lat: 22.54, lng: 114.06, name: '深圳', count: 112000 },
  { lat: 30.57, lng: 104.07, name: '成都', count: 86000 },
  { lat: 30.27, lng: 120.15, name: '杭州', count: 74000 },
  { lat: 30.59, lng: 114.3, name: '武汉', count: 68000 },
  { lat: 29.56, lng: 106.55, name: '重庆', count: 92000 }
]

function initMap() {
  const el = document.getElementById('housing-map')
  if (!el) return
  map = L.map(el, {
    center: [35, 105], zoom: 4,
    zoomControl: false, attributionControl: false
  })
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd', maxZoom: 19
  }).addTo(map)

  housingHotspots.forEach(h => {
    const size = Math.min(40, Math.max(16, h.count / 5000))
    L.circleMarker([h.lat, h.lng], {
      radius: size, fillColor: '#27AE60', color: '#27AE60',
      weight: 1, opacity: 0.6, fillOpacity: 0.3
    }).addTo(map!).bindPopup(`<b>${h.name}</b><br/>保障性住房: ${(h.count/10000).toFixed(1)}万套`)
  })
}

onMounted(() => setTimeout(initMap, 300))
onUnmounted(() => { map?.remove(); map = null })
</script>

<style scoped>
.showcase-housing { display: flex; flex-direction: column; gap: 32px; }
.showcase-title { font-size: 18px; font-weight: 700; color: var(--text-primary); letter-spacing: 1px; }

.map-wrapper {
  position: relative; height: 400px; border-radius: 12px; overflow: hidden;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08); border: 1px solid rgba(0,0,0,0.06);
}
.leaflet-map { width: 100%; height: 100%; }
.map-legend {
  position: absolute; bottom: 16px; left: 16px; background: white;
  padding: 10px 14px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  z-index: 500;
}
.legend-title { font-size: 11px; font-weight: 700; color: var(--text-primary); display: block; margin-bottom: 6px; }
.legend-scale { display: flex; align-items: center; gap: 6px; }
.scale-low, .scale-high { font-size: 10px; color: var(--text-muted); }
.scale-bar { width: 80px; height: 6px; border-radius: 3px; background: linear-gradient(to right, #A8E6CF, #27AE60); }

.housing-charts { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.chart-card {
  padding: 24px; background: white; border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.04); box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}
.chart-card h4 { font-size: 15px; font-weight: 700; color: var(--text-primary); margin-bottom: 20px; }

.bar-compare { display: flex; flex-direction: column; gap: 16px; }
.compare-row { display: flex; flex-direction: column; gap: 6px; }
.row-label { font-size: 13px; font-weight: 600; color: var(--text-primary); }
.row-bars { display: flex; flex-direction: column; gap: 4px; }
.bar {
  height: 24px; border-radius: 12px; display: flex; align-items: center;
  padding-left: 10px; font-size: 12px; font-weight: 700; color: white;
  transition: width 1s ease-out; min-width: 50px;
}
.bar-old { background: #9CA3AF; }
.bar-new { background: #27AE60; }
.legend-row { display: flex; gap: 16px; font-size: 12px; }
.legend-old { color: #9CA3AF; }
.legend-new { color: #27AE60; }

.city-bars { display: flex; flex-direction: column; gap: 10px; }
.city-row { display: grid; grid-template-columns: 50px 1fr; gap: 10px; align-items: center; }
.city-name { font-size: 13px; font-weight: 600; color: var(--text-primary); text-align: right; }
.city-bar-track { height: 22px; background: rgba(0,0,0,0.04); border-radius: 11px; overflow: hidden; }
.city-bar-fill {
  height: 100%; border-radius: 11px; display: flex; align-items: center;
  justify-content: flex-end; padding-right: 8px; transition: width 1s ease-out; min-width: 40px;
}
.city-rate { font-size: 11px; font-weight: 700; color: white; font-family: var(--font-num); }

@media (max-width: 767px) {
  .housing-charts { grid-template-columns: 1fr; }
  .map-wrapper { height: 300px; }
}
</style>
