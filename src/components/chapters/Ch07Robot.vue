<template>
  <!-- Ch07 人形机器人：高清产品图 + 演示视频 -->
  <div class="showcase-robot">
    <h3 class="showcase-title">中国人形机器人产品矩阵与应用场景</h3>

    <!-- 产品图组 -->
    <div class="robot-products">
      <div v-for="r in robots" :key="r.name" class="product-card">
        <div class="image-placeholder">
          {{ r.name }}产品图<br/>建议分辨率: 800×1000<br/>格式: PNG(透明背景)
        </div>
        <div class="product-info">
          <span class="product-name">{{ r.name }}</span>
          <span class="product-maker">{{ r.maker }}</span>
          <span class="product-spec">{{ r.spec }}</span>
        </div>
      </div>
    </div>

    <!-- 视频展示区 -->
    <div class="robot-videos">
      <div class="video-card">
        <div class="video-placeholder">
          <div class="play-icon"></div>
          工业应用场景视频<br/>建议时长: 15-30秒<br/>格式: MP4 (H.264)<br/>分辨率: 1920×1080
        </div>
        <span class="video-caption">人形机器人在汽车工厂产线协作</span>
      </div>
      <div class="video-card">
        <div class="video-placeholder">
          <div class="play-icon"></div>
          家庭服务场景视频<br/>建议时长: 15-30秒<br/>格式: MP4 (H.264)<br/>分辨率: 1920×1080
        </div>
        <span class="video-caption">人形机器人家庭服务与人机交互</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const robots = [
  { name: '优必选 Walker S', maker: '深圳优必选', spec: '身高170cm · 全身41自由度' },
  { name: '小米 CyberOne', maker: '小米机器人', spec: '身高177cm · 双足行走' },
  { name: '傅利叶 GR-2', maker: '傅利叶智能', spec: '身高175cm · 负载50kg' },
  { name: '宇树 H1', maker: '宇树科技', spec: '身高180cm · 时速5km/h' }
]
</script>

<style scoped>
.showcase-robot { display: flex; flex-direction: column; gap: 32px; }
.showcase-title { font-size: 18px; font-weight: 700; color: var(--text-primary); letter-spacing: 1px; }
.robot-products { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
.product-card {
  background: white; border-radius: 12px; overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.06); border: 1px solid rgba(0,0,0,0.04);
  transition: transform 0.2s;
}
.product-card:hover { transform: translateY(-4px); }
.product-card .image-placeholder { min-height: 200px; border-radius: 0; }
.product-info { padding: 12px 14px; }
.product-name { display: block; font-size: 14px; font-weight: 700; color: var(--text-primary); }
.product-maker { display: block; font-size: 12px; color: var(--text-muted); margin-top: 2px; }
.product-spec { display: block; font-size: 11px; color: var(--tech-blue); margin-top: 4px; font-family: var(--font-num); }

.robot-videos { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.video-card { border-radius: 12px; overflow: hidden; }
.video-card .video-placeholder { min-height: 280px; }
.video-caption {
  display: block; padding: 10px 14px; background: #1a1a2e; color: rgba(255,255,255,0.7);
  font-size: 13px;
}
@media (max-width: 1024px) { .robot-products { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 767px) {
  .robot-products { grid-template-columns: 1fr; }
  .robot-videos { grid-template-columns: 1fr; }
}
</style>
