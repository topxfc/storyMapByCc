<template>
  <section class="cover-page" ref="coverEl">
    <!-- 粒子背景 -->
    <canvas class="cover-particles" ref="canvasEl"></canvas>

    <!-- 背景装饰 -->
    <div class="cover-bg-deco">
      <div class="bg-circle c1"></div>
      <div class="bg-circle c2"></div>
      <div class="bg-circle c3"></div>
      <div class="bg-grid"></div>
    </div>

    <!-- 主内容 -->
    <div class="cover-content">
      <div class="cover-eyebrow">
        <span class="eyebrow-line"></span>
        <span class="eyebrow-text">2026 — 2030</span>
        <span class="eyebrow-line"></span>
      </div>

      <h1 class="cover-title">
        <span class="title-main">十五五</span>
        <span class="title-sub">中国成就</span>
      </h1>

      <div class="cover-divider">
        <span class="divider-dot"></span>
        <span class="divider-line"></span>
        <span class="divider-dot"></span>
      </div>

      <p class="cover-desc">
        沉浸式故事地图 · 用地理空间串联科技突破与民生进步
      </p>
      <p class="cover-quote">
        深海之底、苍穹之上、山河之间——<br/>
        16个改变时代的里程碑，记录中国在科技、国防、民生与经济领域的历史性跨越
      </p>

      <!-- 统计数字 -->
      <div class="cover-stats">
        <div class="stat-item" v-for="s in stats" :key="s.label">
          <span class="stat-value" :style="`color:${s.color}`">{{ s.value }}</span>
          <span class="stat-label">{{ s.label }}</span>
        </div>
      </div>
    </div>

    <!-- 向下滚动提示 -->
    <div class="cover-scroll-hint" @click="$emit('scrollDown')">
      <span class="hint-text">向下探索</span>
      <div class="hint-arrows">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M7 10l5 5 5-5"/>
        </svg>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="arrow-2">
          <path d="M7 10l5 5 5-5"/>
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineEmits(['scrollDown'])

const coverEl = ref<HTMLElement>()
const canvasEl = ref<HTMLCanvasElement>()

const stats = [
  { value: '16', label: '里程碑成就', color: '#CC0000' },
  { value: '11', label: '战略领域', color: '#1A5CFF' },
  { value: '5年', label: '发展跨度', color: '#D4A843' }
]

// 粒子效果
let animFrame = 0
function initParticles() {
  const canvas = canvasEl.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const resize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  resize()
  window.addEventListener('resize', resize)

  interface Particle {
    x: number; y: number; vx: number; vy: number
    size: number; alpha: number; color: string
  }

  const particles: Particle[] = []
  const colors = ['#CC0000', '#1A5CFF', '#D4A843', '#E63939', '#4B83FF']

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.3 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)]
    })
  }

  function animate() {
    if (!ctx || !canvas) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach(p => {
      p.x += p.vx
      p.y += p.vy
      if (p.x < 0) p.x = canvas.width
      if (p.x > canvas.width) p.x = 0
      if (p.y < 0) p.y = canvas.height
      if (p.y > canvas.height) p.y = 0

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
      ctx.fillStyle = p.color
      ctx.globalAlpha = p.alpha
      ctx.fill()
    })

    // 连线
    ctx.globalAlpha = 0.03
    ctx.strokeStyle = '#1A5CFF'
    ctx.lineWidth = 0.5
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const d = dx * dx + dy * dy
        if (d < 25000) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }
    ctx.globalAlpha = 1

    animFrame = requestAnimationFrame(animate)
  }
  animate()
}

onMounted(initParticles)
onUnmounted(() => cancelAnimationFrame(animFrame))
</script>

<style scoped>
.cover-page {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(160deg, #0A0E1A 0%, #1A1A2E 40%, #2C1A0A 100%);
  overflow: hidden;
}

.cover-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.cover-bg-deco {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}
.bg-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
}
.bg-circle.c1 {
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(204,0,0,0.12) 0%, transparent 70%);
  top: -200px; right: -100px;
}
.bg-circle.c2 {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(26,92,255,0.1) 0%, transparent 70%);
  bottom: -150px; left: -100px;
}
.bg-circle.c3 {
  width: 400px; height: 400px;
  background: radial-gradient(circle, rgba(212,168,67,0.08) 0%, transparent 70%);
  top: 50%; left: 50%; transform: translate(-50%, -50%);
}
.bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 60px 60px;
}

.cover-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  animation: fadeInUp 1.2s ease-out;
}

.cover-eyebrow {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}
.eyebrow-line {
  width: 48px;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(212,168,67,0.6));
}
.eyebrow-line:last-child {
  background: linear-gradient(to left, transparent, rgba(212,168,67,0.6));
}
.eyebrow-text {
  font-size: 14px;
  font-weight: 600;
  color: var(--earth-yellow);
  letter-spacing: 6px;
  font-family: var(--font-num);
}

.cover-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.title-main {
  font-size: 96px;
  font-weight: 900;
  color: #FFFFFF;
  letter-spacing: 12px;
  line-height: 1.1;
  text-shadow: 0 4px 40px rgba(204,0,0,0.3);
}
.title-sub {
  font-size: 36px;
  font-weight: 600;
  color: rgba(255,255,255,0.6);
  letter-spacing: 16px;
}

.cover-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 28px 0;
}
.divider-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--china-red);
}
.divider-line {
  width: 80px;
  height: 1px;
  background: linear-gradient(to right, var(--china-red), var(--tech-blue));
}

.cover-desc {
  font-size: 16px;
  color: rgba(255,255,255,0.45);
  letter-spacing: 3px;
  margin-bottom: 12px;
}
.cover-quote {
  font-size: 17px;
  color: rgba(255,255,255,0.55);
  line-height: 2;
  max-width: 560px;
}

.cover-stats {
  display: flex;
  gap: 48px;
  margin-top: 48px;
  padding: 24px 48px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 16px;
  backdrop-filter: blur(8px);
}
.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.stat-value {
  font-size: 48px;
  font-weight: 900;
  font-family: var(--font-num);
  line-height: 1;
}
.stat-label {
  font-size: 13px;
  color: rgba(255,255,255,0.4);
  letter-spacing: 1px;
}

.cover-scroll-hint {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: rgba(255,255,255,0.3);
  transition: color 0.3s;
}
.cover-scroll-hint:hover { color: rgba(255,255,255,0.6); }
.hint-text {
  font-size: 12px;
  letter-spacing: 3px;
}
.hint-arrows {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: -8px;
  animation: bounce-arrow 2s ease-in-out infinite;
}
.hint-arrows .arrow-2 { opacity: 0.4; margin-top: -14px; }

@media (max-width: 1024px) {
  .title-main { font-size: 64px; letter-spacing: 8px; }
  .title-sub { font-size: 24px; letter-spacing: 10px; }
  .cover-stats { gap: 32px; padding: 20px 32px; }
  .stat-value { font-size: 36px; }
}
@media (max-width: 767px) {
  .title-main { font-size: 48px; letter-spacing: 6px; }
  .title-sub { font-size: 18px; letter-spacing: 6px; }
  .cover-stats { flex-direction: column; gap: 20px; padding: 20px; }
  .stat-value { font-size: 32px; }
  .cover-quote { font-size: 15px; padding: 0 16px; }
}
</style>
