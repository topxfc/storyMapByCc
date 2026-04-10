<template>
  <!-- Ch04 锦屏大设施：高清实景图组 -->
  <div class="showcase-jinping">
    <h3 class="showcase-title">世界最深地下实验室 · 多角度实景</h3>
    <p class="showcase-desc">
      锦屏大设施（CJPL-II）位于四川凉山锦屏山地下2400米深处，
      是全球宇宙射线通量最低的地下实验室，为暗物质探测等前沿研究提供极致低本底环境。
    </p>

    <div class="jinping-gallery">
      <div class="gallery-card main-card">
        <div class="image-placeholder large">
          锦屏山隧道入口<br/>建议分辨率: 1920×1080<br/>格式: JPG/WebP
        </div>
        <div class="card-info">
          <span class="info-tag">入口通道</span>
          <p>锦屏山交通隧道入口，通往地下实验室的唯一通道</p>
        </div>
      </div>

      <div class="gallery-card">
        <div class="image-placeholder">
          地下隧道通道<br/>建议分辨率: 1280×720
        </div>
        <div class="card-info">
          <span class="info-tag">隧道内部</span>
          <p>岩石覆盖2400米，有效屏蔽宇宙射线</p>
        </div>
      </div>

      <div class="gallery-card">
        <div class="image-placeholder">
          实验设备（PandaX）<br/>建议分辨率: 1280×720
        </div>
        <div class="card-info">
          <span class="info-tag">暗物质探测器</span>
          <p>PandaX-4T暗物质探测实验装置</p>
        </div>
      </div>

      <div class="gallery-card">
        <div class="image-placeholder">
          超净实验室<br/>建议分辨率: 1280×720
        </div>
        <div class="card-info">
          <span class="info-tag">洁净实验环境</span>
          <p>极低放射性本底的超净实验空间</p>
        </div>
      </div>

      <div class="gallery-card">
        <div class="image-placeholder">
          科研团队<br/>建议分辨率: 1280×720
        </div>
        <div class="card-info">
          <span class="info-tag">科学家团队</span>
          <p>来自多国的科研人员在此开展前沿研究</p>
        </div>
      </div>
    </div>

    <!-- 深度对比信息图 -->
    <div class="depth-infographic">
      <h4>全球深地实验室深度对比</h4>
      <div class="depth-bars">
        <div v-for="lab in labs" :key="lab.name" class="depth-bar-item">
          <span class="bar-name">{{ lab.name }}</span>
          <div class="bar-track">
            <div class="bar-fill" :style="`width:${(lab.depth/2400)*100}%;background:${lab.color}`">
              <span class="bar-value">{{ lab.depth }}m</span>
            </div>
          </div>
          <span class="bar-country">{{ lab.country }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const labs = [
  { name: '锦屏 CJPL-II', depth: 2400, country: '中国', color: '#CC0000' },
  { name: 'SNOLAB', depth: 2070, country: '加拿大', color: '#3498DB' },
  { name: 'Sudbury', depth: 2000, country: '加拿大', color: '#4B83FF' },
  { name: 'Homestake', depth: 1480, country: '美国', color: '#9B59B6' },
  { name: 'Gran Sasso', depth: 1400, country: '意大利', color: '#2ECC71' }
]
</script>

<style scoped>
.showcase-jinping { display: flex; flex-direction: column; gap: 32px; }
.showcase-title { font-size: 18px; font-weight: 700; color: var(--text-primary); letter-spacing: 1px; }
.showcase-desc { font-size: 15px; color: var(--text-secondary); line-height: 1.8; max-width: 640px; }

.jinping-gallery {
  display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 16px;
}
.gallery-card { border-radius: 12px; overflow: hidden; background: white; box-shadow: 0 2px 12px rgba(0,0,0,0.06); }
.gallery-card .image-placeholder { min-height: 180px; border-radius: 0; }
.gallery-card .image-placeholder.large { min-height: 300px; }
.main-card { grid-row: span 2; }
.main-card .image-placeholder.large { min-height: 100%; }
.card-info { padding: 12px 16px; }
.info-tag {
  display: inline-block; font-size: 11px; font-weight: 700; color: #8e44ad;
  background: rgba(142,68,173,0.08); padding: 2px 10px; border-radius: 10px; margin-bottom: 6px;
}
.card-info p { font-size: 13px; color: var(--text-muted); line-height: 1.5; }

.depth-infographic {
  padding: 28px; background: rgba(142,68,173,0.04); border-radius: 14px;
  border: 1px solid rgba(142,68,173,0.08);
}
.depth-infographic h4 { font-size: 15px; font-weight: 700; color: var(--text-primary); margin-bottom: 20px; }
.depth-bars { display: flex; flex-direction: column; gap: 12px; }
.depth-bar-item { display: grid; grid-template-columns: 120px 1fr 60px; gap: 12px; align-items: center; }
.bar-name { font-size: 13px; font-weight: 600; color: var(--text-primary); text-align: right; }
.bar-track { height: 24px; background: rgba(0,0,0,0.04); border-radius: 12px; overflow: hidden; }
.bar-fill {
  height: 100%; border-radius: 12px; display: flex; align-items: center; justify-content: flex-end;
  padding-right: 8px; transition: width 1s ease-out;
}
.bar-value { font-size: 11px; font-weight: 700; color: white; font-family: var(--font-num); }
.bar-country { font-size: 12px; color: var(--text-muted); }

@media (max-width: 767px) {
  .jinping-gallery { grid-template-columns: 1fr; }
  .main-card { grid-row: span 1; }
  .depth-bar-item { grid-template-columns: 80px 1fr 50px; }
}
</style>
