<template>
  <!-- Ch10 CR450：时速滑块对比图 -->
  <div class="showcase-cr450">
    <h3 class="showcase-title">CR400 vs CR450 时速直观对比</h3>
    <p class="showcase-desc">拖动滑块对比两代高铁动车组的速度差异</p>

    <CompareSlider
      leftValue="350"
      leftLabel="CR400 · 复兴号"
      leftDesc="当前运营最高时速"
      leftTag="CR400"
      leftColor="#E74C3C"
      rightValue="450"
      rightLabel="CR450 · 新一代"
      rightDesc="试验时速创纪录453km/h"
      rightTag="CR450"
      rightColor="#CC0000"
      :initialPosition="40"
    />

    <!-- 速度仪表盘 -->
    <div class="speed-dashboard">
      <div class="speed-card">
        <div class="speed-gauge old">
          <svg viewBox="0 0 120 70" class="gauge-svg">
            <path d="M10,65 A50,50 0 0,1 110,65" fill="none" stroke="#E5E7EB" stroke-width="8" stroke-linecap="round"/>
            <path d="M10,65 A50,50 0 0,1 85,20" fill="none" stroke="#9CA3AF" stroke-width="8" stroke-linecap="round"/>
            <text x="60" y="55" text-anchor="middle" fill="#9CA3AF" font-size="24" font-weight="900" font-family="Arial Black">350</text>
            <text x="60" y="67" text-anchor="middle" fill="#9CA3AF" font-size="8">km/h</text>
          </svg>
          <span class="speed-label">CR400AF 运营时速</span>
        </div>
      </div>
      <div class="speed-arrow">→</div>
      <div class="speed-card highlight">
        <div class="speed-gauge new">
          <svg viewBox="0 0 120 70" class="gauge-svg">
            <path d="M10,65 A50,50 0 0,1 110,65" fill="none" stroke="#FFE5E5" stroke-width="8" stroke-linecap="round"/>
            <path d="M10,65 A50,50 0 0,1 105,40" fill="none" stroke="#CC0000" stroke-width="8" stroke-linecap="round"/>
            <text x="60" y="55" text-anchor="middle" fill="#CC0000" font-size="24" font-weight="900" font-family="Arial Black">450</text>
            <text x="60" y="67" text-anchor="middle" fill="#CC0000" font-size="8">km/h</text>
          </svg>
          <span class="speed-label">CR450 设计运营时速</span>
        </div>
      </div>
    </div>

    <!-- 提速对比 -->
    <div class="route-compare">
      <h4>典型线路耗时对比</h4>
      <div class="route-table">
        <div class="route-row header">
          <span>线路</span><span>CR400 (350km/h)</span><span>CR450 (450km/h)</span><span>节省</span>
        </div>
        <div v-for="r in routes" :key="r.route" class="route-row">
          <span class="route-name">{{ r.route }}</span>
          <span>{{ r.old }}</span>
          <span class="new-time">{{ r.new }}</span>
          <span class="save-time">{{ r.save }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CompareSlider from '../CompareSlider.vue'

const routes = [
  { route: '北京—上海', old: '4h18min', new: '3h20min', save: '-58min' },
  { route: '北京—广州', old: '7h50min', new: '6h05min', save: '-1h45min' },
  { route: '上海—成都', old: '12h', new: '9h20min', save: '-2h40min' },
  { route: '广州—武汉', old: '3h30min', new: '2h42min', save: '-48min' }
]
</script>

<style scoped>
.showcase-cr450 { display: flex; flex-direction: column; gap: 32px; }
.showcase-title { font-size: 18px; font-weight: 700; color: var(--text-primary); letter-spacing: 1px; }
.showcase-desc { font-size: 15px; color: var(--text-secondary); }

.speed-dashboard { display: flex; align-items: center; justify-content: center; gap: 32px; }
.speed-card {
  padding: 24px; background: white; border-radius: 14px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04); border: 1px solid rgba(0,0,0,0.04);
  text-align: center;
}
.speed-card.highlight { border-color: rgba(204,0,0,0.15); box-shadow: 0 4px 20px rgba(204,0,0,0.08); }
.gauge-svg { width: 160px; height: auto; }
.speed-label { display: block; font-size: 13px; color: var(--text-muted); margin-top: 8px; }
.speed-arrow { font-size: 32px; color: var(--text-muted); font-weight: 300; }

.route-compare {
  padding: 28px; background: rgba(204,0,0,0.03); border-radius: 14px;
  border: 1px solid rgba(204,0,0,0.06);
}
.route-compare h4 { font-size: 15px; font-weight: 700; color: var(--text-primary); margin-bottom: 16px; }
.route-table { display: flex; flex-direction: column; gap: 8px; }
.route-row {
  display: grid; grid-template-columns: 1.5fr 1fr 1fr 0.8fr; gap: 12px;
  padding: 10px 16px; border-radius: 8px; font-size: 14px; color: var(--text-secondary);
}
.route-row.header {
  font-weight: 700; color: var(--text-primary); font-size: 13px;
  background: rgba(0,0,0,0.04); border-radius: 8px;
}
.route-name { font-weight: 600; color: var(--text-primary); }
.new-time { font-weight: 700; color: #CC0000; }
.save-time { font-weight: 700; color: #27AE60; font-family: var(--font-num); }

@media (max-width: 767px) {
  .speed-dashboard { flex-direction: column; }
  .speed-arrow { transform: rotate(90deg); }
  .route-row { grid-template-columns: 1fr 1fr; gap: 4px; font-size: 12px; }
  .route-row.header span:nth-child(2), .route-row.header span:nth-child(3) { display: none; }
}
</style>
