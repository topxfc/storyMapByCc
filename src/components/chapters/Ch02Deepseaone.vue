<template>
  <!-- Ch02 深海一号：油气输送线路图 + 平台实景图 -->
  <div class="showcase-deepseaone">
    <h3 class="showcase-title">南海陵水海域油气输送线路图</h3>
    <div class="pipeline-map">
      <svg class="pipeline-svg" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="seaGrad2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#064E7B" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="#0E4429" stop-opacity="0.3"/>
          </linearGradient>
          <filter id="glow2">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <!-- 海域背景 -->
        <rect x="0" y="0" width="800" height="450" fill="#0A1628" rx="12"/>
        <rect x="0" y="0" width="800" height="450" fill="url(#seaGrad2)" rx="12"/>

        <!-- 海南岛轮廓（简化） -->
        <path d="M580,120 Q620,100 660,110 Q700,130 710,170 Q700,220 680,260 Q650,290 620,300 Q590,290 570,260 Q550,220 560,170 Q565,140 580,120"
              fill="#1A3A2E" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
        <text x="630" y="200" text-anchor="middle" fill="rgba(255,255,255,0.5)" font-size="14" font-weight="600">海南岛</text>

        <!-- 陵水标记 -->
        <circle cx="660" cy="250" r="4" fill="#E67E22"/>
        <text x="680" y="254" fill="#E67E22" font-size="11" font-weight="600">陵水终端</text>

        <!-- 深海一号平台位置 -->
        <g transform="translate(260, 280)">
          <circle cx="0" cy="0" r="12" fill="#E67E22" opacity="0.2">
            <animate attributeName="r" values="12;24;12" dur="3s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.2;0;0.2" dur="3s" repeatCount="indefinite"/>
          </circle>
          <rect x="-10" y="-8" width="20" height="16" fill="#E67E22" rx="3" stroke="white" stroke-width="1.5"/>
          <text x="0" y="4" text-anchor="middle" fill="white" font-size="7" font-weight="800">深1</text>
        </g>
        <text x="260" y="310" text-anchor="middle" fill="#E67E22" font-size="12" font-weight="700">深海一号平台</text>
        <text x="260" y="325" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-size="10">水深1563m</text>

        <!-- 海基一号 -->
        <circle cx="400" cy="220" r="5" fill="#3498DB" stroke="white" stroke-width="1.5"/>
        <text x="400" y="245" text-anchor="middle" fill="#3498DB" font-size="11" font-weight="600">海基一号导管架</text>

        <!-- 输送管网 -->
        <path d="M275,280 Q340,250 400,220" fill="none" stroke="#E67E22" stroke-width="2.5" stroke-dasharray="6 3" filter="url(#glow2)">
          <animate attributeName="stroke-dashoffset" values="0;-18" dur="2s" repeatCount="indefinite"/>
        </path>
        <path d="M400,220 Q500,180 550,160 Q600,140 660,248" fill="none" stroke="#3498DB" stroke-width="2.5" stroke-dasharray="6 3" filter="url(#glow2)">
          <animate attributeName="stroke-dashoffset" values="0;-18" dur="2s" repeatCount="indefinite"/>
        </path>

        <!-- 图例 -->
        <g transform="translate(30, 400)">
          <line x1="0" y1="0" x2="30" y2="0" stroke="#E67E22" stroke-width="2.5" stroke-dasharray="6 3"/>
          <text x="38" y="4" fill="rgba(255,255,255,0.5)" font-size="10">海底油气管道</text>
          <line x1="180" y1="0" x2="210" y2="0" stroke="#3498DB" stroke-width="2.5" stroke-dasharray="6 3"/>
          <text x="218" y="4" fill="rgba(255,255,255,0.5)" font-size="10">输送至陆地管道</text>
        </g>

        <!-- 标题 -->
        <text x="400" y="38" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="14" font-weight="700">
          南海陵水17-2气田油气输送管网
        </text>

        <!-- 产量标注 -->
        <g transform="translate(100, 100)">
          <rect x="0" y="0" width="140" height="65" rx="8" fill="rgba(0,0,0,0.4)"/>
          <text x="70" y="22" text-anchor="middle" fill="#E67E22" font-size="24" font-weight="900" font-family="Arial Black">30+</text>
          <text x="70" y="40" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="11">亿立方米/年</text>
          <text x="70" y="56" text-anchor="middle" fill="rgba(255,255,255,0.35)" font-size="9">年产天然气量</text>
        </g>
      </svg>
    </div>

    <!-- 平台实景图 -->
    <div class="platform-gallery">
      <div class="gallery-item large">
        <div class="image-placeholder">
          深海一号平台全景<br/>建议分辨率: 1920×1080<br/>格式: JPG/WebP
        </div>
        <span class="img-caption">深海一号超深水大气田生产平台全景</span>
      </div>
      <div class="gallery-item">
        <div class="image-placeholder">
          钻井作业画面<br/>建议分辨率: 1280×720
        </div>
        <span class="img-caption">深水钻井作业现场</span>
      </div>
      <div class="gallery-item">
        <div class="image-placeholder">
          海基一号导管架<br/>建议分辨率: 1280×720
        </div>
        <span class="img-caption">亚洲第一深水导管架"海基一号"</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.showcase-deepseaone { display: flex; flex-direction: column; gap: 32px; }
.showcase-title { font-size: 18px; font-weight: 700; color: var(--text-primary); letter-spacing: 1px; }
.pipeline-svg {
  width: 100%; height: auto; border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.12);
}
.platform-gallery {
  display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 16px;
}
.gallery-item { position: relative; border-radius: 12px; overflow: hidden; }
.gallery-item .image-placeholder { min-height: 200px; }
.gallery-item.large .image-placeholder { min-height: 280px; }
.img-caption {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 8px 12px; background: rgba(0,0,0,0.5); color: white; font-size: 12px;
}
@media (max-width: 767px) {
  .platform-gallery { grid-template-columns: 1fr; }
}
</style>
