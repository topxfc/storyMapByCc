<template>
  <!-- Ch12 C919：文字说明 + 运营实景图 -->
  <div class="showcase-c919">
    <h3 class="showcase-title">C919大规模商业运营全景</h3>

    <!-- 运营数据看板 -->
    <div class="ops-dashboard">
      <div v-for="s in opsStats" :key="s.label" class="ops-card">
        <span class="ops-value" :style="`color:${s.color}`">{{ s.value }}</span>
        <span class="ops-unit">{{ s.unit }}</span>
        <span class="ops-label">{{ s.label }}</span>
      </div>
    </div>

    <!-- 运营介绍 -->
    <div class="c919-intro">
      <div class="intro-text">
        <p>C919国产大型客机自2023年正式交付东方航空投入商业运营以来，已累计承运旅客突破100万人次。
        飞机运行状态稳定，旅客反馈良好，多家航空公司陆续引进，机队规模持续扩大。</p>
        <p>C919采用先进的空气动力学设计和先进的航电系统，客舱宽度达到3.96米（经济舱），
        较同级别竞品提供更宽敞的乘坐空间。全机使用了第三代铝锂合金、复合材料等先进材料，
        在安全性、经济性和舒适性方面均达到国际先进水平。</p>
      </div>
    </div>

    <!-- 实景图组 -->
    <div class="c919-gallery">
      <div class="gallery-card hero-img">
        <div class="image-placeholder lg">
          C919机场起降全景<br/>建议分辨率: 1920×1080<br/>格式: JPG/WebP
        </div>
        <div class="card-overlay">
          <span class="overlay-title">C919降落瞬间</span>
          <span class="overlay-desc">国产大飞机在繁忙机场的日常运营</span>
        </div>
      </div>
      <div class="gallery-card">
        <div class="image-placeholder">
          C919客舱内部<br/>建议分辨率: 1280×720
        </div>
        <div class="card-overlay">
          <span class="overlay-title">经济舱空间</span>
          <span class="overlay-desc">3.96米客舱宽度，舒适乘坐体验</span>
        </div>
      </div>
      <div class="gallery-card">
        <div class="image-placeholder">
          C919驾驶舱<br/>建议分辨率: 1280×720
        </div>
        <div class="card-overlay">
          <span class="overlay-title">先进驾驶舱</span>
          <span class="overlay-desc">国产综合航电系统</span>
        </div>
      </div>
      <div class="gallery-card">
        <div class="image-placeholder">
          机组人员<br/>建议分辨率: 1280×720
        </div>
        <div class="card-overlay">
          <span class="overlay-title">C919机组</span>
          <span class="overlay-desc">专业机组团队保障安全飞行</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const opsStats = [
  { value: '100', unit: '万人次', label: '累计承运旅客', color: '#2C3E50' },
  { value: '36', unit: '架', label: '交付机队规模', color: '#1A5CFF' },
  { value: '99.8', unit: '%', label: '航班正常率', color: '#27AE60' },
  { value: '158', unit: '座', label: '典型客舱布局', color: '#D4A843' }
]
</script>

<style scoped>
.showcase-c919 { display: flex; flex-direction: column; gap: 32px; }
.showcase-title { font-size: 18px; font-weight: 700; color: var(--text-primary); letter-spacing: 1px; }

.ops-dashboard { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.ops-card {
  display: flex; flex-direction: column; align-items: center; padding: 20px;
  background: white; border-radius: 12px; border: 1px solid rgba(0,0,0,0.04);
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
}
.ops-value { font-size: 36px; font-weight: 900; font-family: var(--font-num); line-height: 1; }
.ops-unit { font-size: 13px; color: var(--text-muted); margin-top: 4px; }
.ops-label { font-size: 12px; color: var(--text-secondary); margin-top: 8px; }

.c919-intro { max-width: 720px; }
.intro-text p { font-size: 16px; color: var(--text-secondary); line-height: 2; margin-bottom: 16px; }

.c919-gallery { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; }
.gallery-card { position: relative; border-radius: 12px; overflow: hidden; }
.gallery-card .image-placeholder { min-height: 200px; border-radius: 0; }
.gallery-card .image-placeholder.lg { min-height: 320px; }
.hero-img { grid-row: span 2; }
.hero-img .image-placeholder.lg { min-height: 100%; }
.card-overlay {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 12px 16px; background: linear-gradient(transparent, rgba(0,0,0,0.7));
}
.overlay-title { display: block; font-size: 14px; font-weight: 700; color: white; }
.overlay-desc { display: block; font-size: 12px; color: rgba(255,255,255,0.6); }

@media (max-width: 1024px) { .ops-dashboard { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 767px) {
  .c919-gallery { grid-template-columns: 1fr; }
  .hero-img { grid-row: span 1; }
}
</style>
