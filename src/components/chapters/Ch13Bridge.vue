<template>
  <!-- Ch13 花江峡谷大桥：建设前后滑块对比图 + 文字说明 -->
  <div class="showcase-bridge">
    <h3 class="showcase-title">花江峡谷大桥建设前后对比</h3>
    <p class="showcase-desc">拖动滑块查看大桥建设前后的震撼变化</p>

    <CompareSlider
      leftTag="建设前"
      rightTag="建成后"
      :initialPosition="50"
    >
      <template #left>
        <div class="bridge-side before">
          <div class="image-placeholder bridge-img">
            花江峡谷原貌（建设前）<br/>建议分辨率: 1920×1080<br/>格式: JPG/WebP<br/><br/>深切峡谷、北盘江奔流
          </div>
        </div>
      </template>
      <template #right>
        <div class="bridge-side after">
          <div class="image-placeholder bridge-img">
            花江峡谷大桥全景（建成后）<br/>建议分辨率: 1920×1080<br/>格式: JPG/WebP<br/><br/>世界第一高桥横跨峡谷
          </div>
        </div>
      </template>
    </CompareSlider>

    <!-- 技术参数 -->
    <div class="bridge-specs">
      <h4>桥梁技术参数</h4>
      <div class="spec-grid">
        <div v-for="spec in specs" :key="spec.label" class="spec-item">
          <span class="spec-value" :style="`color:${spec.color}`">{{ spec.value }}</span>
          <span class="spec-unit">{{ spec.unit }}</span>
          <span class="spec-label">{{ spec.label }}</span>
        </div>
      </div>
    </div>

    <!-- 世界高桥排名 -->
    <div class="ranking-section">
      <h4>世界最高桥梁 TOP5</h4>
      <div class="ranking-bars">
        <div v-for="(b, i) in rankings" :key="b.name" class="rank-item">
          <span class="rank-num">#{{ i + 1 }}</span>
          <span class="rank-name">{{ b.name }}</span>
          <div class="rank-bar-track">
            <div class="rank-bar-fill" :style="`width:${(b.height/625)*100}%;background:${b.color}`">
              <span class="rank-val">{{ b.height }}m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CompareSlider from '../CompareSlider.vue'

const specs = [
  { value: '625', unit: '米', label: '桥面高度（世界第一）', color: '#CC0000' },
  { value: '1420', unit: '米', label: '主跨跨径', color: '#1A5CFF' },
  { value: '2890', unit: '米', label: '桥梁全长', color: '#D4A843' },
  { value: '270', unit: '米', label: '主塔高度', color: '#7F8C8D' }
]

const rankings = [
  { name: '花江峡谷大桥（中国）', height: 625, color: '#CC0000' },
  { name: '北盘江大桥（中国）', height: 565, color: '#E63939' },
  { name: '孟底沟大桥（中国）', height: 496, color: '#1A5CFF' },
  { name: '赛杜-沙班大桥（法国）', height: 270, color: '#3498DB' },
  { name: '比格苏尔大桥（美国）', height: 218, color: '#27AE60' }
]
</script>

<style scoped>
.showcase-bridge { display: flex; flex-direction: column; gap: 32px; }
.showcase-title { font-size: 18px; font-weight: 700; color: var(--text-primary); letter-spacing: 1px; }
.showcase-desc { font-size: 15px; color: var(--text-secondary); }
.bridge-side { width: 100%; height: 100%; }
.bridge-img { width: 100%; height: 100%; min-height: 380px !important; border-radius: 0 !important; }

.bridge-specs {
  padding: 28px; background: rgba(127,140,141,0.04); border-radius: 14px;
  border: 1px solid rgba(127,140,141,0.08);
}
.bridge-specs h4 { font-size: 15px; font-weight: 700; color: var(--text-primary); margin-bottom: 20px; }
.spec-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.spec-item { display: flex; flex-direction: column; align-items: center; text-align: center; }
.spec-value { font-size: 32px; font-weight: 900; font-family: var(--font-num); line-height: 1; }
.spec-unit { font-size: 14px; color: var(--text-muted); margin-top: 2px; }
.spec-label { font-size: 12px; color: var(--text-secondary); margin-top: 8px; }

.ranking-section { padding: 28px; background: white; border-radius: 14px; box-shadow: 0 2px 12px rgba(0,0,0,0.04); }
.ranking-section h4 { font-size: 15px; font-weight: 700; color: var(--text-primary); margin-bottom: 16px; }
.ranking-bars { display: flex; flex-direction: column; gap: 10px; }
.rank-item { display: grid; grid-template-columns: 30px 180px 1fr; gap: 10px; align-items: center; }
.rank-num { font-size: 14px; font-weight: 900; color: var(--text-muted); font-family: var(--font-num); }
.rank-name { font-size: 13px; font-weight: 600; color: var(--text-primary); }
.rank-bar-track { height: 24px; background: rgba(0,0,0,0.04); border-radius: 12px; overflow: hidden; }
.rank-bar-fill {
  height: 100%; border-radius: 12px; display: flex; align-items: center;
  justify-content: flex-end; padding-right: 8px; min-width: 50px; transition: width 1s ease-out;
}
.rank-val { font-size: 11px; font-weight: 700; color: white; font-family: var(--font-num); }

@media (max-width: 767px) {
  .spec-grid { grid-template-columns: repeat(2, 1fr); }
  .rank-item { grid-template-columns: 25px 120px 1fr; }
}
</style>
