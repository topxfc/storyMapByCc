<template>
  <!-- Ch01 奋斗者号：深潜线路图 + 高清实景图 -->
  <div class="showcase-fendouzhe">
    <h3 class="showcase-title">马里亚纳海沟深潜线路图</h3>
    <div class="dive-route">
      <!-- SVG 深潜线路图 -->
      <svg class="route-svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet">
        <!-- 海面 -->
        <defs>
          <linearGradient id="oceanGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#0EA5E9" stop-opacity="0.3"/>
            <stop offset="50%" stop-color="#0369A1" stop-opacity="0.6"/>
            <stop offset="100%" stop-color="#0C4A6E" stop-opacity="0.9"/>
          </linearGradient>
          <linearGradient id="pathGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#00D4FF"/>
            <stop offset="100%" stop-color="#CC0000"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="800" height="500" fill="url(#oceanGrad)" rx="12"/>

        <!-- 海面波浪 -->
        <path d="M0,30 Q100,10 200,30 T400,30 T600,30 T800,30" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
        <text x="400" y="22" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="12" font-weight="600">海面 0m</text>

        <!-- 深度刻度 -->
        <line x1="60" y1="30" x2="60" y2="470" stroke="rgba(255,255,255,0.15)" stroke-width="1" stroke-dasharray="4 4"/>
        <text x="55" y="125" text-anchor="end" fill="rgba(255,255,255,0.4)" font-size="10">-2000m</text>
        <text x="55" y="220" text-anchor="end" fill="rgba(255,255,255,0.4)" font-size="10">-4000m</text>
        <text x="55" y="315" text-anchor="end" fill="rgba(255,255,255,0.4)" font-size="10">-7000m</text>
        <text x="55" y="410" text-anchor="end" fill="rgba(255,255,255,0.4)" font-size="10">-10000m</text>
        <text x="55" y="468" text-anchor="end" fill="#CC0000" font-size="11" font-weight="700">-10909m</text>

        <!-- 海沟地形 -->
        <path d="M100,480 Q250,480 350,440 Q420,420 500,460 Q600,490 700,480 L700,500 L100,500 Z"
              fill="#0C3547" opacity="0.5"/>

        <!-- 下潜路线 -->
        <path class="dive-path"
              d="M400,40 L390,100 L380,180 L370,260 L360,340 L355,400 L350,450 L348,470"
              fill="none" stroke="url(#pathGrad)" stroke-width="3" stroke-linecap="round"
              stroke-dasharray="8 4"/>

        <!-- 关键节点 -->
        <g class="node" v-for="(node, i) in diveNodes" :key="i">
          <circle :cx="node.x" :cy="node.y" r="6" :fill="node.color" stroke="white" stroke-width="2"/>
          <rect :x="node.x + 12" :y="node.y - 14" :width="node.labelW" height="28" rx="6"
                fill="rgba(0,0,0,0.6)" />
          <text :x="node.x + 18" :y="node.y + 1" fill="white" font-size="10" font-weight="600">
            {{ node.label }}
          </text>
          <text :x="node.x + 18" :y="node.y - 2" fill="rgba(255,255,255,0.6)" font-size="9">
            {{ node.depth }}
          </text>
        </g>

        <!-- 潜水器图标 -->
        <g transform="translate(340, 462)">
          <ellipse cx="0" cy="0" rx="14" ry="8" fill="#CC0000" opacity="0.3">
            <animate attributeName="rx" values="14;20;14" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite"/>
          </ellipse>
          <ellipse cx="0" cy="0" rx="8" ry="5" fill="#FFD700" stroke="white" stroke-width="1"/>
          <text x="0" y="3" text-anchor="middle" fill="#1a1a2e" font-size="6" font-weight="800">深</text>
        </g>
      </svg>
    </div>

    <!-- 实景图片区 -->
    <div class="scene-gallery">
      <div class="gallery-item main">
        <div class="image-placeholder">
          奋斗者号出水瞬间<br/>建议分辨率: 1920×1080<br/>格式: JPG/WebP
        </div>
        <span class="gallery-caption">奋斗者号从马里亚纳海沟成功浮出水面</span>
      </div>
      <div class="gallery-item">
        <div class="image-placeholder">
          舱内作业画面<br/>建议分辨率: 1280×720<br/>格式: JPG/WebP
        </div>
        <span class="gallery-caption">科研人员在深海舱内开展作业</span>
      </div>
      <div class="gallery-item">
        <div class="image-placeholder">
          深海生物采样<br/>建议分辨率: 1280×720<br/>格式: JPG/WebP
        </div>
        <span class="gallery-caption">万米深海发现的珍稀生物样本</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const diveNodes = [
  { x: 392, y: 80, depth: '-500m', label: '设备自检完成', color: '#00D4FF', labelW: 100 },
  { x: 378, y: 200, depth: '-3000m', label: '中层带穿越', color: '#0EA5E9', labelW: 90 },
  { x: 365, y: 330, depth: '-7000m', label: '深渊层进入', color: '#1A5CFF', labelW: 90 },
  { x: 350, y: 450, depth: '-10909m', label: '坐底！创纪录', color: '#CC0000', labelW: 100 }
]
</script>

<style scoped>
.showcase-fendouzhe { display: flex; flex-direction: column; gap: 32px; }
.showcase-title {
  font-size: 18px; font-weight: 700; color: var(--text-primary);
  letter-spacing: 1px; margin-bottom: 8px;
}
.dive-route { width: 100%; }
.route-svg {
  width: 100%; height: auto; border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.1);
}
.dive-path {
  animation: dashDraw 3s ease-in-out forwards;
  stroke-dashoffset: 600;
}
@keyframes dashDraw {
  to { stroke-dashoffset: 0; }
}
.scene-gallery {
  display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 16px;
}
.gallery-item { position: relative; border-radius: 12px; overflow: hidden; }
.gallery-item.main { grid-row: span 1; }
.gallery-item .image-placeholder { min-height: 200px; }
.gallery-caption {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 8px 12px; background: rgba(0,0,0,0.5); color: white;
  font-size: 12px;
}
@media (max-width: 767px) {
  .scene-gallery { grid-template-columns: 1fr; }
}
</style>
