<template>
  <div class="map-container" ref="mapRef">
    <div id="china-map" class="leaflet-map"></div>
    <div class="map-controls">
      <button class="ctrl-btn" @click="zoomIn" title="放大">＋</button>
      <button class="ctrl-btn" @click="zoomOut" title="缩小">－</button>
      <button class="ctrl-btn" @click="resetView" title="重置">
        <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
          <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch, computed } from 'vue'
import { useStore } from 'vuex'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { categoryColors } from '../data/achievements'
import type { Achievement } from '../types'

const store = useStore()
let map: L.Map | null = null
const markers: Record<string, L.Marker> = {}

const filteredAchievements = computed(() => store.getters.filteredAchievements)
const selectedId = computed(() => store.state.selectedId)

function createIcon(a: Achievement, selected: boolean) {
  const color = categoryColors[a.category] || '#2563eb'
  const size = selected ? 48 : 38
  const ring = selected
    ? `<circle cx="24" cy="24" r="22" fill="none" stroke="${color}" stroke-width="2" opacity="0.4">
         <animate attributeName="r" values="18;26;18" dur="2s" repeatCount="indefinite"/>
         <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite"/>
       </circle>` : ''
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
      ${ring}
      <circle cx="24" cy="24" r="17" fill="${color}" />
      <circle cx="24" cy="24" r="14" fill="white" opacity="0.18"/>
      <text x="24" y="29" text-anchor="middle" font-size="13" font-weight="800"
        fill="white" font-family="Arial Black,Arial,sans-serif">${a.index}</text>
    </svg>`
  const shortTitle = a.title.length > 5 ? a.title.slice(0, 5) + '…' : a.title
  const label = `<div style="
    margin-top:3px;padding:2px 7px;
    background:rgba(255,255,255,0.94);
    border:1px solid rgba(0,0,0,0.07);
    border-radius:6px;font-size:11px;font-weight:700;
    color:#1a1a2e;white-space:nowrap;
    box-shadow:0 1px 4px rgba(0,0,0,0.1);
    pointer-events:none;
  ">${shortTitle}</div>`
  const totalH = size + 26
  return L.divIcon({
    html: `<div style="display:flex;flex-direction:column;align-items:center;">${svg}${label}</div>`,
    className: 'custom-marker' + (selected ? ' selected' : ''),
    iconSize: [80, totalH],
    iconAnchor: [40, size / 2],
    popupAnchor: [0, -(size / 2)]
  })
}

function popupHtml(a: Achievement) {
  const color = categoryColors[a.category] || '#2563eb'
  return `
    <div class="map-popup">
      <div class="popup-header" style="border-left:3px solid ${color}">
        <span class="popup-index">${a.index}</span>
        <div>
          <div class="popup-title">${a.title}</div>
          <div class="popup-subtitle">${a.subtitle}</div>
        </div>
      </div>
      <div class="popup-stat">
        <span class="popup-num" style="color:${color}">${a.heroStat}</span>
        <span class="popup-unit">${a.heroUnit}</span>
      </div>
      <div class="popup-desc">${a.heroDesc}</div>
      <button class="popup-btn" style="background:${color}"
        onclick="window.__mapSelect('${a.id}')">查看详情 →</button>
    </div>`
}

function initMap() {
  if (!document.getElementById('china-map')) return
  map = L.map('china-map', {
    center: [36, 105],
    zoom: 4,
    zoomControl: false,
    attributionControl: false,
    minZoom: 3,
    maxZoom: 10
  })

  // ─────────────────────────────────────────────────────────────────
  // 底图配置 — 如需中文标注+国界线，把下面的 URL 替换为以下选项之一：
  //
  // ① OpenStreetMap（免费，中文标注，有国界线，无需注册）
  //    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  //    subdomains: 'abc'
  //
  // ② 高德地图矢量底图（中文，有国界，仅供学习）
  //    url: 'https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
  //    subdomains: '1234'
  //
  // ③ 高德卫星底图（加中文注记叠加层，共两层）
  //    卫星: 'https://webst0{s}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
  //    注记: 'https://webst0{s}.is.autonavi.com/appmaptile?style=8&x={x}&y={y}&z={z}'
  //    subdomains: '1234'
  //
  // ④ 天地图（官方，中文，有国界，需在 https://www.tianditu.gov.cn 申请 token）
  //    url: 'https://t{s}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=你的TOKEN'
  //    subdomains: '01234567'
  // ─────────────────────────────────────────────────────────────────
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map)

  addMarkers()
  ;(window as unknown as Record<string, unknown>).__mapSelect = (id: string) => {
    store.dispatch('selectAchievement', id)
    map?.closePopup()
  }
}

function addMarkers() {
  if (!map) return
  Object.values(markers).forEach(m => m.remove())
  Object.keys(markers).forEach(k => delete markers[k])

  filteredAchievements.value.forEach((a: Achievement) => {
    const icon = createIcon(a, a.id === selectedId.value)
    const m = L.marker([a.geo.lat, a.geo.lng], { icon })
      .addTo(map!)
      .bindPopup(popupHtml(a), { maxWidth: 260, className: 'custom-popup' })
    m.on('click', () => updateIcons(a.id))
    markers[a.id] = m
  })
}

function updateIcons(activeId: string) {
  filteredAchievements.value.forEach((a: Achievement) => {
    markers[a.id]?.setIcon(createIcon(a, a.id === activeId))
  })
}

function flyTo(id: string) {
  const a = store.state.achievements.find((x: Achievement) => x.id === id)
  if (!a || !map) return
  map.flyTo([a.geo.lat, a.geo.lng], 6, { duration: 1.2 })
  setTimeout(() => markers[id]?.openPopup(), 1400)
}

function zoomIn() { map?.zoomIn() }
function zoomOut() { map?.zoomOut() }
function resetView() { map?.flyTo([36, 105], 4, { duration: 0.9 }) }

watch(selectedId, id => {
  if (id) { flyTo(id); updateIcons(id) }
  else updateIcons('')
})
watch(filteredAchievements, () => addMarkers())

onMounted(initMap)
onUnmounted(() => { map?.remove(); map = null })
</script>

<style scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  background: #e8edf2;
}
.leaflet-map { width: 100%; height: 100%; }

.map-controls {
  position: absolute;
  right: 12px;
  bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 500;
}
.ctrl-btn {
  width: 32px;
  height: 32px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  color: #374151;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  transition: all 0.15s;
}
.ctrl-btn:hover { background: #f3f4f6; color: #2563eb; border-color: #2563eb; }
</style>
