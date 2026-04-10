<template>
  <!-- Ch09 低空经济：文字说明 + 应用场景图 -->
  <div class="showcase-lowalt">
    <h3 class="showcase-title">低空经济三大应用领域</h3>

    <div class="domain-cards">
      <div v-for="domain in domains" :key="domain.title" class="domain-card">
        <div class="domain-img">
          <div class="image-placeholder">
            {{ domain.imgDesc }}<br/>建议分辨率: 1280×720<br/>格式: JPG/WebP
          </div>
          <span class="domain-badge" :style="`background:${domain.color}`">{{ domain.badge }}</span>
        </div>
        <div class="domain-content">
          <h4>{{ domain.title }}</h4>
          <p>{{ domain.desc }}</p>
          <ul class="domain-points">
            <li v-for="p in domain.points" :key="p">{{ p }}</li>
          </ul>
          <div class="domain-stat">
            <span class="ds-value" :style="`color:${domain.color}`">{{ domain.stat }}</span>
            <span class="ds-label">{{ domain.statLabel }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 应用场景图组 -->
    <div class="scene-gallery">
      <div v-for="scene in scenes" :key="scene.label" class="scene-item">
        <div class="image-placeholder">{{ scene.label }}<br/>{{ scene.desc }}</div>
        <span class="scene-caption">{{ scene.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const domains = [
  {
    title: '无人机物流',
    badge: '01',
    color: '#3498DB',
    imgDesc: '无人机物流配送场景',
    desc: '利用无人机实现城市末端配送、应急物资投送和跨区域货运，大幅降低物流成本、提升效率。',
    points: ['城市即时配送覆盖主要城区', '应急物资偏远山区投送', '冷链生鲜无人机专线运营'],
    stat: '28%', statLabel: '占低空经济市场份额'
  },
  {
    title: '低空旅游',
    badge: '02',
    color: '#E67E22',
    imgDesc: '低空旅游观光场景',
    desc: '以eVTOL、直升机、热气球等低空飞行器为载体，打造城市空中观光、景区低空游览新体验。',
    points: ['城市地标空中观光线路', '景区低空穿越体验', '跨城空中旅游巴士'],
    stat: '10%', statLabel: '文旅消费占比'
  },
  {
    title: '通用航空',
    badge: '03',
    color: '#27AE60',
    imgDesc: '通用航空作业场景',
    desc: '包括农业植保、测绘巡检、医疗救援等专业领域的低空飞行服务，实现精准高效的空中作业。',
    points: ['农业植保面积超12亿亩', '电力线路/管道巡检常态化', '空中120急救网络覆盖'],
    stat: '40%', statLabel: '占低空经济市场份额'
  }
]

const scenes = [
  { label: '无人机编队配送', desc: '建议分辨率: 640×480' },
  { label: 'eVTOL城市空中交通', desc: '建议分辨率: 640×480' },
  { label: '农业植保无人机作业', desc: '建议分辨率: 640×480' },
  { label: '低空应急救援', desc: '建议分辨率: 640×480' }
]
</script>

<style scoped>
.showcase-lowalt { display: flex; flex-direction: column; gap: 32px; }
.showcase-title { font-size: 18px; font-weight: 700; color: var(--text-primary); letter-spacing: 1px; }
.domain-cards { display: flex; flex-direction: column; gap: 24px; }
.domain-card {
  display: grid; grid-template-columns: 1fr 1.2fr; gap: 24px;
  background: white; border-radius: 14px; overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.04); border: 1px solid rgba(0,0,0,0.04);
}
.domain-card:nth-child(even) { direction: rtl; }
.domain-card:nth-child(even) > * { direction: ltr; }
.domain-img { position: relative; }
.domain-img .image-placeholder { min-height: 280px; border-radius: 0; }
.domain-badge {
  position: absolute; top: 12px; left: 12px;
  width: 32px; height: 32px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 800; color: white; font-family: var(--font-num);
}
.domain-content { padding: 28px; }
.domain-content h4 { font-size: 20px; font-weight: 700; color: var(--text-primary); margin-bottom: 12px; }
.domain-content p { font-size: 15px; color: var(--text-secondary); line-height: 1.8; margin-bottom: 16px; }
.domain-points {
  list-style: none; padding: 0; display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px;
}
.domain-points li {
  display: flex; align-items: center; gap: 8px; font-size: 14px; color: var(--text-secondary);
}
.domain-points li::before {
  content: '✓'; color: #27AE60; font-weight: 700; font-size: 12px;
}
.domain-stat { display: flex; align-items: baseline; gap: 8px; }
.ds-value { font-size: 32px; font-weight: 900; font-family: var(--font-num); }
.ds-label { font-size: 13px; color: var(--text-muted); }

.scene-gallery { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; }
.scene-item { position: relative; border-radius: 10px; overflow: hidden; }
.scene-item .image-placeholder { min-height: 150px; font-size: 12px !important; }
.scene-caption {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 6px 10px; background: rgba(0,0,0,0.5); color: white; font-size: 11px;
}

@media (max-width: 1024px) {
  .domain-card { grid-template-columns: 1fr; }
  .domain-card:nth-child(even) { direction: ltr; }
  .scene-gallery { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 767px) { .scene-gallery { grid-template-columns: 1fr; } }
</style>
