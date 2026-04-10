<template>
  <!-- Ch15 空间站：三维地球 + 星空背景 + 轨道动画 -->
  <div class="showcase-space">
    <div class="space-scene" ref="sceneEl">
      <!-- 星空背景 -->
      <canvas class="starfield" ref="starsCanvas"></canvas>

      <!-- 三维地球（CSS 3D 模拟） -->
      <div class="earth-container">
        <div class="earth">
          <div class="earth-surface"></div>
          <div class="earth-atmosphere"></div>
          <!-- 轨道环 -->
          <div class="orbit-ring">
            <div class="station-icon">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect x="4" y="12" width="20" height="4" rx="1" fill="#00D4FF"/>
                <rect x="12" y="4" width="4" height="20" rx="1" fill="#B0B8C8"/>
                <rect x="8" y="8" width="12" height="12" rx="2" fill="none" stroke="#00D4FF" stroke-width="1.5"/>
                <circle cx="14" cy="14" r="2" fill="#00D4FF"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- 信息叠加层 -->
      <div class="space-info">
        <div class="info-card orbit-info">
          <span class="info-icon">🛰️</span>
          <div>
            <span class="info-title">中国空间站（天宫）</span>
            <span class="info-detail">轨道高度: ~400km | 轨道倾角: 41.5° | 常驻3名航天员</span>
          </div>
        </div>
        <div class="info-card module-info">
          <span class="info-label">T字构型</span>
          <div class="modules">
            <span class="module" style="--mc:#00D4FF">天和核心舱</span>
            <span class="module" style="--mc:#4B83FF">问天实验舱</span>
            <span class="module" style="--mc:#7C3AED">梦天实验舱</span>
          </div>
        </div>
      </div>

      <!-- 轨道参数面板 -->
      <div class="orbit-panel">
        <div class="param-item" v-for="p in orbitParams" :key="p.label">
          <span class="param-val">{{ p.value }}</span>
          <span class="param-lab">{{ p.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const starsCanvas = ref<HTMLCanvasElement>()
const sceneEl = ref<HTMLElement>()

const orbitParams = [
  { value: '400km', label: '轨道高度' },
  { value: '41.5°', label: '轨道倾角' },
  { value: '92min', label: '轨道周期' },
  { value: '7.68km/s', label: '飞行速度' },
  { value: '110m', label: '组合体翼展' }
]

let animFrame = 0
function initStars() {
  const canvas = starsCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const resize = () => {
    canvas.width = canvas.clientWidth
    canvas.height = canvas.clientHeight
  }
  resize()
  window.addEventListener('resize', resize)

  interface Star { x: number; y: number; size: number; alpha: number; speed: number }
  const stars: Star[] = []
  for (let i = 0; i < 200; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.002 + 0.001
    })
  }

  function animate() {
    if (!ctx || !canvas) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const t = Date.now()
    stars.forEach(s => {
      const twinkle = Math.sin(t * s.speed) * 0.3 + 0.7
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(200,210,230,${s.alpha * twinkle})`
      ctx.fill()
    })
    animFrame = requestAnimationFrame(animate)
  }
  animate()
}

onMounted(initStars)
onUnmounted(() => cancelAnimationFrame(animFrame))
</script>

<style scoped>
.showcase-space { width: 100%; }
.space-scene {
  position: relative; width: 100%; height: 560px; border-radius: 16px; overflow: hidden;
  background: radial-gradient(ellipse at 40% 50%, #0A1628 0%, #050810 70%);
  box-shadow: 0 4px 40px rgba(0,0,0,0.3);
}

.starfield { position: absolute; inset: 0; z-index: 0; width: 100%; height: 100%; }

/* 地球 */
.earth-container {
  position: absolute; top: 50%; left: 45%; transform: translate(-50%, -50%); z-index: 1;
}
.earth {
  width: 260px; height: 260px; position: relative;
  animation: earthSpin 60s linear infinite;
}
@keyframes earthSpin { to { transform: rotate(360deg); } }

.earth-surface {
  width: 100%; height: 100%; border-radius: 50%;
  background: radial-gradient(circle at 35% 35%,
    #1A5CFF 0%, #0D47A1 30%, #0A3D91 50%, #052D5E 80%, #021B3D 100%);
  box-shadow: inset -20px -10px 40px rgba(0,0,0,0.5), 0 0 60px rgba(26,92,255,0.2);
  /* 简易陆地纹理 */
  background-image:
    radial-gradient(ellipse at 30% 40%, rgba(39,174,96,0.3) 0%, transparent 40%),
    radial-gradient(ellipse at 70% 35%, rgba(39,174,96,0.25) 0%, transparent 35%),
    radial-gradient(ellipse at 50% 70%, rgba(39,174,96,0.2) 0%, transparent 30%);
}

.earth-atmosphere {
  position: absolute; inset: -8px; border-radius: 50%;
  background: transparent;
  border: 2px solid rgba(100,180,255,0.15);
  box-shadow: inset 0 0 30px rgba(100,180,255,0.05), 0 0 40px rgba(100,180,255,0.1);
}

/* 轨道 */
.orbit-ring {
  position: absolute; top: 50%; left: 50%;
  width: 340px; height: 340px;
  margin: -170px 0 0 -170px;
  border: 1.5px solid rgba(0,212,255,0.25);
  border-radius: 50%;
  transform: rotateX(70deg) rotateZ(-20deg);
  animation: none;
}
.station-icon {
  position: absolute; top: -14px; left: 50%; transform: translateX(-50%);
  animation: orbitStation 20s linear infinite;
  transform-origin: 0 184px;
}
@keyframes orbitStation {
  from { transform: translateX(-50%) rotate(0deg) translateY(-170px) rotate(0deg); }
  to { transform: translateX(-50%) rotate(360deg) translateY(-170px) rotate(-360deg); }
}

/* 信息面板 */
.space-info {
  position: absolute; top: 24px; left: 24px; z-index: 10;
  display: flex; flex-direction: column; gap: 12px;
}
.info-card {
  padding: 12px 16px; background: rgba(10,22,40,0.8); backdrop-filter: blur(8px);
  border: 1px solid rgba(0,212,255,0.15); border-radius: 10px;
}
.info-icon { font-size: 20px; margin-right: 8px; }
.info-title { display: block; font-size: 14px; font-weight: 700; color: #00D4FF; }
.info-detail { display: block; font-size: 11px; color: rgba(255,255,255,0.5); margin-top: 2px; }
.orbit-info { display: flex; align-items: flex-start; }
.info-label { font-size: 12px; font-weight: 700; color: rgba(255,255,255,0.6); margin-bottom: 6px; display: block; }
.modules { display: flex; gap: 6px; flex-wrap: wrap; }
.module {
  font-size: 11px; padding: 3px 10px; border-radius: 6px;
  background: rgba(255,255,255,0.06); color: var(--mc); border: 1px solid var(--mc);
  border-color: color-mix(in srgb, var(--mc) 30%, transparent);
}

.orbit-panel {
  position: absolute; bottom: 24px; right: 24px; z-index: 10;
  display: flex; gap: 16px; padding: 16px 20px;
  background: rgba(10,22,40,0.8); backdrop-filter: blur(8px);
  border: 1px solid rgba(0,212,255,0.1); border-radius: 12px;
}
.param-item { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.param-val { font-size: 14px; font-weight: 800; color: #00D4FF; font-family: var(--font-num); }
.param-lab { font-size: 10px; color: rgba(255,255,255,0.4); }

@media (max-width: 767px) {
  .space-scene { height: 420px; }
  .earth { width: 180px; height: 180px; }
  .orbit-ring { width: 240px; height: 240px; margin: -120px 0 0 -120px; }
  .orbit-panel { flex-wrap: wrap; gap: 10px; bottom: 12px; right: 12px; padding: 10px; }
  .space-info { left: 12px; top: 12px; }
}
</style>
