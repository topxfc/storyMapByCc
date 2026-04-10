<template>
  <!-- Ch16 天问二号：三维太阳系 + 小行星轨道 + 探测器图标 -->
  <div class="showcase-tianwen">
    <div class="solar-scene" ref="sceneEl">
      <canvas class="starfield" ref="starsCanvas"></canvas>

      <!-- 太阳系场景 -->
      <div class="solar-system">
        <!-- 太阳 -->
        <div class="sun">
          <div class="sun-glow"></div>
          <span class="sun-label">太阳</span>
        </div>

        <!-- 行星轨道 -->
        <div class="planet-orbit orbit-1">
          <div class="planet mercury"><span class="planet-label">水星</span></div>
        </div>
        <div class="planet-orbit orbit-2">
          <div class="planet venus"><span class="planet-label">金星</span></div>
        </div>
        <div class="planet-orbit orbit-3">
          <div class="planet earth-p"><span class="planet-label">地球</span></div>
        </div>
        <div class="planet-orbit orbit-4">
          <div class="planet mars"><span class="planet-label">火星</span></div>
        </div>

        <!-- 天都星（小行星2016 HO3）轨道 -->
        <div class="asteroid-orbit">
          <div class="asteroid">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <polygon points="8,1 10,5 15,6 11,10 12,15 8,12 4,15 5,10 1,6 6,5" fill="#D4A843" opacity="0.8"/>
            </svg>
            <span class="asteroid-label">天都星 (2016 HO3)</span>
          </div>
        </div>

        <!-- 天问二号飞行轨迹 -->
        <svg class="trajectory-svg" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="trajGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#00D4FF"/>
              <stop offset="50%" stop-color="#1A5CFF"/>
              <stop offset="100%" stop-color="#D4A843"/>
            </linearGradient>
          </defs>
          <!-- 飞行轨迹弧线 -->
          <path d="M300,260 Q350,200 380,160 Q420,100 400,80 Q370,60 340,90 Q310,120 330,170 Q360,230 400,280 Q440,330 420,370"
            fill="none" stroke="url(#trajGrad)" stroke-width="2" stroke-dasharray="6 4" opacity="0.6">
            <animate attributeName="stroke-dashoffset" values="0;-20" dur="3s" repeatCount="indefinite"/>
          </path>
        </svg>

        <!-- 天问二号探测器 -->
        <div class="probe" :style="probeStyle">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="8" y="6" width="8" height="12" rx="2" fill="#B0B8C8" stroke="#00D4FF" stroke-width="1"/>
            <rect x="2" y="10" width="6" height="4" rx="1" fill="#1A5CFF"/>
            <rect x="16" y="10" width="6" height="4" rx="1" fill="#1A5CFF"/>
            <circle cx="12" cy="9" r="1.5" fill="#00D4FF"/>
            <path d="M10,18 L12,22 L14,18" fill="#D4A843"/>
          </svg>
          <span class="probe-label">天问二号</span>
          <div class="probe-trail"></div>
        </div>
      </div>

      <!-- 任务信息 -->
      <div class="mission-info">
        <div class="mission-card">
          <span class="mission-tag">🚀 小行星采样返回</span>
          <h4>天问二号深空探测</h4>
          <div class="mission-timeline-mini">
            <div v-for="step in missionSteps" :key="step.year" class="ms-item">
              <span class="ms-year">{{ step.year }}</span>
              <span class="ms-event">{{ step.event }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 距离面板 -->
      <div class="distance-panel">
        <div class="dist-item" v-for="d in distances" :key="d.label">
          <span class="dist-val">{{ d.value }}</span>
          <span class="dist-lab">{{ d.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const starsCanvas = ref<HTMLCanvasElement>()
const sceneEl = ref<HTMLElement>()

const probeStyle = computed(() => ({
  position: 'absolute' as const,
  top: '35%',
  left: '58%',
  transform: 'translate(-50%, -50%)',
  zIndex: 20
}))

const missionSteps = [
  { year: '2025', event: '天问二号发射升空' },
  { year: '2026', event: '飞越金星引力加速' },
  { year: '2028', event: '抵近天都星' },
  { year: '2030', event: '完成采样返回地球' }
]

const distances = [
  { value: '4300万km', label: '当前飞行距离' },
  { value: '~4m', label: '天都星直径' },
  { value: '311P', label: '伴飞目标彗星' }
]

// 星空背景
let animFrame = 0
function initStars() {
  const canvas = starsCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  const resize = () => { canvas.width = canvas.clientWidth; canvas.height = canvas.clientHeight }
  resize()
  window.addEventListener('resize', resize)

  interface Star { x: number; y: number; size: number; alpha: number; speed: number }
  const stars: Star[] = []
  for (let i = 0; i < 180; i++) {
    stars.push({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      size: Math.random() * 1.2 + 0.3, alpha: Math.random() * 0.7 + 0.2,
      speed: Math.random() * 0.003 + 0.001
    })
  }

  function animate() {
    if (!ctx || !canvas) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const t = Date.now()
    stars.forEach(s => {
      const tw = Math.sin(t * s.speed) * 0.3 + 0.7
      ctx.beginPath()
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(180,200,220,${s.alpha * tw})`
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
.showcase-tianwen { width: 100%; }
.solar-scene {
  position: relative; width: 100%; height: 560px; border-radius: 16px; overflow: hidden;
  background: radial-gradient(ellipse at 30% 50%, #0D1B2E 0%, #050810 80%);
  box-shadow: 0 4px 40px rgba(0,0,0,0.3);
}
.starfield { position: absolute; inset: 0; z-index: 0; width: 100%; height: 100%; }

.solar-system { position: absolute; inset: 0; z-index: 1; }

/* 太阳 */
.sun {
  position: absolute; top: 50%; left: 12%; transform: translate(-50%, -50%);
  width: 50px; height: 50px; border-radius: 50%;
  background: radial-gradient(circle, #FFF3B0 0%, #F39C12 40%, #E67E22 100%);
  box-shadow: 0 0 40px rgba(243,156,18,0.6), 0 0 80px rgba(243,156,18,0.3);
}
.sun-glow {
  position: absolute; inset: -20px; border-radius: 50%;
  background: radial-gradient(circle, rgba(243,156,18,0.2) 0%, transparent 70%);
  animation: pulseGlow 3s ease-in-out infinite;
}
.sun-label {
  position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%);
  font-size: 10px; color: rgba(243,156,18,0.7); white-space: nowrap;
}

/* 行星轨道 */
.planet-orbit {
  position: absolute; top: 50%; left: 12%;
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 50%; transform: translate(-50%, -50%);
}
.orbit-1 { width: 120px; height: 120px; }
.orbit-2 { width: 190px; height: 190px; }
.orbit-3 { width: 280px; height: 280px; }
.orbit-4 { width: 380px; height: 380px; }

.planet {
  position: absolute; top: -5px; left: 50%; transform: translateX(-50%);
  width: 10px; height: 10px; border-radius: 50%;
}
.mercury { background: #B0B8C8; width: 6px; height: 6px; animation: orbitPlanet 8s linear infinite; transform-origin: 3px 63px; }
.venus { background: #F5CBA7; width: 8px; height: 8px; animation: orbitPlanet 12s linear infinite; transform-origin: 4px 99px; }
.earth-p { background: #1A5CFF; width: 10px; height: 10px; box-shadow: 0 0 8px rgba(26,92,255,0.5); animation: orbitPlanet 18s linear infinite; transform-origin: 5px 145px; }
.mars { background: #E74C3C; width: 8px; height: 8px; animation: orbitPlanet 25s linear infinite; transform-origin: 4px 194px; }
.planet-label {
  position: absolute; top: 14px; left: 50%; transform: translateX(-50%);
  font-size: 8px; color: rgba(255,255,255,0.3); white-space: nowrap;
}
@keyframes orbitPlanet {
  from { transform: translateX(-50%) rotate(0deg); }
  to { transform: translateX(-50%) rotate(360deg); }
}

/* 小行星轨道 */
.asteroid-orbit {
  position: absolute; top: 50%; left: 12%;
  width: 300px; height: 300px;
  border: 1px dashed rgba(212,168,67,0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%) rotate(15deg);
}
.asteroid {
  position: absolute; top: -8px; left: 60%;
  animation: orbitPlanet 22s linear infinite;
  transform-origin: 8px 158px;
}
.asteroid-label {
  position: absolute; top: 18px; left: 50%; transform: translateX(-50%);
  font-size: 9px; color: #D4A843; white-space: nowrap; font-weight: 600;
}

.trajectory-svg {
  position: absolute; inset: 0; width: 100%; height: 100%; z-index: 5; pointer-events: none;
}

/* 探测器 */
.probe { z-index: 20; display: flex; flex-direction: column; align-items: center; gap: 4px; }
.probe-label { font-size: 11px; color: #00D4FF; font-weight: 700; }
.probe-trail {
  width: 2px; height: 40px;
  background: linear-gradient(to bottom, rgba(0,212,255,0.5), transparent);
  transform: rotate(30deg); margin-top: -20px; opacity: 0.4;
}

/* 任务信息 */
.mission-info {
  position: absolute; top: 20px; right: 20px; z-index: 10; max-width: 260px;
}
.mission-card {
  padding: 16px; background: rgba(10,22,40,0.85); backdrop-filter: blur(8px);
  border: 1px solid rgba(0,212,255,0.12); border-radius: 12px;
}
.mission-tag { font-size: 11px; color: #D4A843; display: block; margin-bottom: 6px; }
.mission-card h4 { font-size: 15px; font-weight: 700; color: #00D4FF; margin-bottom: 12px; }
.mission-timeline-mini { display: flex; flex-direction: column; gap: 6px; }
.ms-item { display: flex; gap: 8px; }
.ms-year { font-size: 11px; font-weight: 800; color: #D4A843; font-family: var(--font-num); min-width: 36px; }
.ms-event { font-size: 11px; color: rgba(255,255,255,0.55); }

.distance-panel {
  position: absolute; bottom: 20px; left: 20px; z-index: 10;
  display: flex; gap: 16px; padding: 14px 18px;
  background: rgba(10,22,40,0.85); backdrop-filter: blur(8px);
  border: 1px solid rgba(0,212,255,0.1); border-radius: 10px;
}
.dist-item { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.dist-val { font-size: 13px; font-weight: 800; color: #00D4FF; font-family: var(--font-num); }
.dist-lab { font-size: 9px; color: rgba(255,255,255,0.35); }

@media (max-width: 767px) {
  .solar-scene { height: 420px; }
  .mission-info { max-width: 200px; right: 8px; top: 8px; }
  .distance-panel { left: 8px; bottom: 8px; gap: 10px; padding: 10px; }
}
</style>
