<template>
  <!-- Ch03 福建舰：海试线路图 + 建造/海试实景图 -->
  <div class="showcase-fujian">
    <h3 class="showcase-title">福建舰海试线路图</h3>
    <div class="seatrial-map">
      <svg class="trial-svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="seaTrialGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#0C3547"/>
            <stop offset="100%" stop-color="#1A1A2E"/>
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="800" height="500" fill="url(#seaTrialGrad)" rx="12"/>

        <!-- 陆地轮廓（上海/江浙沿海简化） -->
        <path d="M0,100 Q80,80 160,120 Q200,150 250,140 Q300,120 350,150 Q400,180 450,160 Q500,130 550,150 L550,0 L0,0 Z"
              fill="#1A3A2E" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
        <text x="280" y="80" fill="rgba(255,255,255,0.4)" font-size="14" font-weight="600">江苏</text>
        <text x="450" y="100" fill="rgba(255,255,255,0.4)" font-size="14" font-weight="600">浙江</text>

        <!-- 上海江南造船厂 -->
        <circle cx="380" cy="150" r="6" fill="#CC0000" stroke="white" stroke-width="2"/>
        <text x="380" y="175" text-anchor="middle" fill="#CC0000" font-size="12" font-weight="700">江南造船厂</text>
        <text x="380" y="190" text-anchor="middle" fill="rgba(255,255,255,0.4)" font-size="10">上海</text>

        <!-- 东海海域标记 -->
        <text x="500" y="340" text-anchor="middle" fill="rgba(255,255,255,0.15)" font-size="32" font-weight="900">东 海</text>

        <!-- 海试路线 -->
        <path d="M385,155 Q420,200 450,250 Q480,300 500,320 Q540,350 580,340 Q620,320 640,290 Q650,260 630,240 Q600,230 570,250 Q550,270 540,290"
              fill="none" stroke="#CC0000" stroke-width="2.5" stroke-dasharray="8 4" stroke-linecap="round">
          <animate attributeName="stroke-dashoffset" values="0;-24" dur="3s" repeatCount="indefinite"/>
        </path>

        <!-- 路线关键点 -->
        <circle cx="450" cy="250" r="4" fill="#E67E22" stroke="white" stroke-width="1.5"/>
        <text x="465" y="245" fill="#E67E22" font-size="10" font-weight="600">出港通道</text>

        <circle cx="580" cy="340" r="4" fill="#E67E22" stroke="white" stroke-width="1.5"/>
        <text x="595" y="335" fill="#E67E22" font-size="10" font-weight="600">主动力测试区</text>

        <circle cx="630" cy="240" r="4" fill="#3498DB" stroke="white" stroke-width="1.5"/>
        <text x="645" y="235" fill="#3498DB" font-size="10" font-weight="600">弹射测试区</text>

        <circle cx="540" cy="290" r="5" fill="#CC0000" stroke="white" stroke-width="2"/>
        <text x="555" y="286" fill="#CC0000" font-size="10" font-weight="700">舰载机起降测试</text>

        <!-- 航母图标 -->
        <g transform="translate(535, 285)">
          <ellipse cx="0" cy="0" rx="18" ry="6" fill="rgba(204,0,0,0.15)">
            <animate attributeName="rx" values="18;28;18" dur="2.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.3;0;0.3" dur="2.5s" repeatCount="indefinite"/>
          </ellipse>
        </g>

        <!-- 信息框 -->
        <g transform="translate(50, 350)">
          <rect width="180" height="100" rx="10" fill="rgba(0,0,0,0.5)"/>
          <text x="90" y="25" text-anchor="middle" fill="white" font-size="11" font-weight="700">福建舰技术参数</text>
          <text x="15" y="48" fill="rgba(255,255,255,0.6)" font-size="10">排水量：~80,000吨</text>
          <text x="15" y="64" fill="rgba(255,255,255,0.6)" font-size="10">全长：约316米</text>
          <text x="15" y="80" fill="rgba(255,255,255,0.6)" font-size="10">弹射系统：电磁弹射×4</text>
        </g>
      </svg>
    </div>

    <!-- 实景图组 -->
    <div class="fujian-gallery">
      <div class="gallery-item">
        <div class="image-placeholder">福建舰下水仪式<br/>建议分辨率: 1920×1080<br/>格式: JPG/WebP</div>
        <span class="img-caption">2022年6月福建舰下水命名仪式</span>
      </div>
      <div class="gallery-item">
        <div class="image-placeholder">电磁弹射试验<br/>建议分辨率: 1920×1080</div>
        <span class="img-caption">电磁弹射系统试验</span>
      </div>
      <div class="gallery-item">
        <div class="image-placeholder">舰载机起降<br/>建议分辨率: 1920×1080</div>
        <span class="img-caption">舰载机着舰降落瞬间</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.showcase-fujian { display: flex; flex-direction: column; gap: 32px; }
.showcase-title { font-size: 18px; font-weight: 700; color: var(--text-primary); letter-spacing: 1px; }
.trial-svg { width: 100%; height: auto; border-radius: 12px; box-shadow: 0 4px 24px rgba(0,0,0,0.12); }
.fujian-gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
.gallery-item { position: relative; border-radius: 12px; overflow: hidden; }
.gallery-item .image-placeholder { min-height: 220px; }
.img-caption {
  position: absolute; bottom: 0; left: 0; right: 0;
  padding: 8px 12px; background: rgba(0,0,0,0.5); color: white; font-size: 12px;
}
@media (max-width: 767px) { .fujian-gallery { grid-template-columns: 1fr; } }
</style>
