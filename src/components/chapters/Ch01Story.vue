<template>
  <section
    class="ch01-story"
    :id="id"
    ref="sectionEl"
  >
    <!-- 背景图占位标注（图片未就位时） -->
    <div class="bg-anno" v-if="bgPhase === 'ch01' && !bgDefaultLoaded">
      <div class="bg-anno-box">
        <span class="bg-anno-label">默认背景图</span>
        <span class="bg-anno-path">/public/assets/images/bg-01.jpg</span>
        <span class="bg-anno-hint">建议 1920x1080 · JPG/WebP · 奋斗者号海面场景</span>
      </div>
    </div>
    <div class="bg-anno" v-if="bgPhase === 'ch01-tech' && !bgTechLoaded">
      <div class="bg-anno-box">
        <span class="bg-anno-label">技术/历程段背景图</span>
        <span class="bg-anno-path">/public/assets/images/bg-01-tech.jpg</span>
        <span class="bg-anno-hint">建议 1920x1080 · JPG/WebP · 深海科研/实验室场景</span>
      </div>
    </div>

    <!-- 暗化遮罩 -->
    <div class="ch-overlay" />

    <!-- 叙事块 -->
    <div class="story-blocks">
      <!-- Hero 全屏 -->
      <div class="seg-hero" ref="seg1">
        <div class="hero-card glass">
          <span class="seg-chapter-num">第 01 章</span>
          <h1 class="seg-title">{{ chapter.title }}</h1>
          <div class="seg-divider" />
          <p class="seg-subtitle">{{ chapter.subtitle }}</p>
          <div class="seg-hero-stat">
            <span class="hero-num" ref="numEl">{{ displayNum }}</span>
            <span class="hero-unit">{{ chapter.heroUnit }}</span>
          </div>
          <p class="seg-hero-desc">{{ chapter.heroDesc }}</p>
        </div>
      </div>

      <!-- 6张紧凑卡片，同宽靠右 -->
      <div class="cards-column">
        <div class="cards-wrapper">

          <!-- seg2: 深潜线路图 -->
          <div class="story-card" ref="seg2">
            <h3 class="card-title">马里亚纳海沟深潜线路图</h3>
            <svg class="route-svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="s2OceanGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#0EA5E9" stop-opacity="0.3"/>
                  <stop offset="50%" stop-color="#0369A1" stop-opacity="0.6"/>
                  <stop offset="100%" stop-color="#0C4A6E" stop-opacity="0.9"/>
                </linearGradient>
                <linearGradient id="s2PathGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#00D4FF"/>
                  <stop offset="100%" stop-color="#CC0000"/>
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="800" height="500" fill="url(#s2OceanGrad)" rx="8"/>
              <path d="M0,30 Q100,10 200,30 T400,30 T600,30 T800,30" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
              <text x="400" y="22" text-anchor="middle" fill="rgba(255,255,255,0.6)" font-size="12" font-weight="600">海面 0m</text>
              <line x1="60" y1="30" x2="60" y2="470" stroke="rgba(255,255,255,0.15)" stroke-width="1" stroke-dasharray="4 4"/>
              <text x="55" y="125" text-anchor="end" fill="rgba(255,255,255,0.4)" font-size="10">-2000m</text>
              <text x="55" y="220" text-anchor="end" fill="rgba(255,255,255,0.4)" font-size="10">-4000m</text>
              <text x="55" y="315" text-anchor="end" fill="rgba(255,255,255,0.4)" font-size="10">-7000m</text>
              <text x="55" y="410" text-anchor="end" fill="rgba(255,255,255,0.4)" font-size="10">-10000m</text>
              <text x="55" y="468" text-anchor="end" fill="#CC0000" font-size="11" font-weight="700">-10909m</text>
              <path d="M100,480 Q250,480 350,440 Q420,420 500,460 Q600,490 700,480 L700,500 L100,500 Z" fill="#0C3547" opacity="0.5"/>
              <path class="dive-path" d="M400,40 L390,100 L380,180 L370,260 L360,340 L355,400 L350,450 L348,470"
                fill="none" stroke="url(#s2PathGrad)" stroke-width="3" stroke-linecap="round" stroke-dasharray="8 4"/>
              <g v-for="(node, i) in diveNodes" :key="i">
                <circle :cx="node.x" :cy="node.y" r="6" :fill="node.color" stroke="white" stroke-width="2"/>
                <rect :x="node.x + 12" :y="node.y - 14" :width="node.labelW" height="28" rx="6" fill="rgba(0,0,0,0.6)"/>
                <text :x="node.x + 18" :y="node.y + 5" fill="white" font-size="10" font-weight="600">{{ node.label }}</text>
                <text :x="node.x + 18" :y="node.y - 4" fill="rgba(255,255,255,0.6)" font-size="9">{{ node.depth }}</text>
              </g>
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

          <!-- seg3: 技术突破 -->
          <div class="story-card" ref="seg3">
            <h3 class="card-title">关键技术突破</h3>
            <ul class="tech-list">
              <li v-for="(b, i) in chapter.technicalBreakthroughs" :key="i">
                <span class="tech-dot" />{{ b }}
              </li>
            </ul>
          </div>

          <!-- seg4: 发展历程 -->
          <div class="story-card" ref="seg4">
            <h3 class="card-title">发展历程</h3>
            <div class="timeline">
              <div v-for="ev in chapter.timeline" :key="ev.year + ev.event" class="tl-item">
                <span class="tl-year">{{ ev.year }}</span>
                <span class="tl-dot" />
                <span class="tl-event">{{ ev.event }}</span>
              </div>
            </div>
          </div>

          <!-- seg5: 统计图（触发海洋背景） -->
          <div class="story-card" ref="seg5">
            <h3 class="card-title">{{ chapter.chart.title }}</h3>
            <AchievementChart :config="chapter.chart" :color="accentColor" />
          </div>

          <!-- seg6: 图片 -->
          <div class="story-card" ref="seg6">
            <h3 class="card-title">深海影像</h3>
            <div class="photo-grid">
              <div class="photo-item">
                <img v-if="photoMainLoaded" :src="photoMainSrc" alt="奋斗者号出水" class="photo-img" />
                <div v-else class="photo-placeholder">奋斗者号出水瞬间<br/><small>/public/assets/images/ch01-photo-main.jpg</small></div>
                <span class="photo-caption">奋斗者号从马里亚纳海沟成功浮出水面</span>
              </div>
              <div class="photo-item">
                <img v-if="photoSubLoaded" :src="photoSubSrc" alt="舱内作业" class="photo-img" />
                <div v-else class="photo-placeholder">舱内作业画面<br/><small>/public/assets/images/ch01-photo-sub.jpg</small></div>
                <span class="photo-caption">科研人员在深海舱内开展作业</span>
              </div>
            </div>
          </div>

          <!-- seg7: 结语 -->
          <div class="story-card" ref="seg7">
            <h3 class="card-title">深海强国</h3>
            <p class="seg-summary">{{ chapter.summary }}</p>
            <div class="tag-list">
              <span v-for="tag in chapter.tags" :key="tag" class="tag-item">{{ tag }}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>

  <!-- 海洋场景：Teleport 到 body，真正的 fixed 定位 -->
  <Teleport to="body">
    <div class="ocean-overlay" v-show="bgPhase === 'ch01-ocean'" @click="onOceanClick">
      <div class="bubble-container" ref="bubbleContainer" />
      <div class="ocean-right-scene">
        <div class="depth-ruler">
          <div v-for="mark in depthMarks" :key="mark.depth" class="ruler-mark" :style="{ top: mark.pct + '%' }">
            <span class="mark-label">{{ mark.depth }}</span>
            <span class="mark-tick" />
          </div>
        </div>
        <div v-for="sub in submarines" :key="sub.name"
          class="sub-icon"
          :class="{ highlight: sub.highlight, wobbling: sub.wobbling }"
          :style="{ top: sub.pct + '%' }"
          @click.stop="wobbleSub(sub)">
          <svg width="52" height="30" viewBox="0 0 52 30">
            <ellipse cx="26" cy="15" rx="22" ry="11"
              :fill="sub.highlight ? '#CC0000' : 'rgba(255,255,255,0.2)'"
              stroke="rgba(255,255,255,0.7)" stroke-width="1.5" />
            <text x="26" y="19" text-anchor="middle" fill="white" font-size="8" font-weight="700">{{ sub.short }}</text>
          </svg>
          <div class="sub-label">
            <span class="sub-name">{{ sub.name }}</span>
            <span class="sub-depth">{{ sub.depth }}</span>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive, nextTick } from 'vue'
import type { Achievement } from '../../types'
import AchievementChart from '../AchievementChart.vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const props = defineProps<{ chapter: Achievement; id: string }>()

const sectionEl = ref<HTMLElement>()
const accentColor = '#CC0000'

// 背景图探测（仅用于占位提示）
const bgDefaultLoaded = ref(false)
const bgTechLoaded = ref(false)
function probeImage(src: string, loaded: { value: boolean }) {
  const img = new Image()
  img.onload = () => { loaded.value = true }
  img.src = src
}

// 照片探测
const photoMainSrc = '/assets/images/ch01-photo-main.jpg'
const photoSubSrc  = '/assets/images/ch01-photo-sub.jpg'
const photoMainLoaded = ref(false)
const photoSubLoaded  = ref(false)

// 数字动画
const displayNum = ref(props.chapter.heroStat)
const numEl = ref<HTMLElement>()
function animateNumber() {
  const raw = props.chapter.heroStat
  const num = parseFloat(raw.replace(/[^\d.]/g, ''))
  if (isNaN(num)) return
  const suffix = raw.replace(/[\d.]/g, '')
  const obj = { val: 0 }
  gsap.to(obj, {
    val: num, duration: 2, ease: 'power2.out',
    onUpdate: () => { displayNum.value = Math.round(obj.val) + suffix }
  })
}

const diveNodes = [
  { x: 392, y: 80,  depth: '-500m',   label: '设备自检完成', color: '#00D4FF', labelW: 100 },
  { x: 378, y: 200, depth: '-3000m',  label: '中层带穿越',   color: '#0EA5E9', labelW: 90 },
  { x: 365, y: 330, depth: '-7000m',  label: '深渊层进入',   color: '#1A5CFF', labelW: 90 },
  { x: 350, y: 450, depth: '-10909m', label: '坐底！创纪录', color: '#CC0000', labelW: 100 }
]

const depthMarks = [
  { depth: '0m', pct: 2 }, { depth: '-2000m', pct: 22 }, { depth: '-4000m', pct: 42 },
  { depth: '-6000m', pct: 62 }, { depth: '-7062m', pct: 72 }, { depth: '-10909m', pct: 95 }
]

interface Sub { name: string; short: string; depth: string; pct: number; highlight: boolean; wobbling: boolean }
const submarines = reactive<Sub[]>([
  { name: '和平号（俄罗斯）',   short: '和平', depth: '-6000m',  pct: 62, highlight: false, wobbling: false },
  { name: '蛟龙号（中国）',     short: '蛟龙', depth: '-7062m',  pct: 72, highlight: false, wobbling: false },
  { name: '深海挑战者（美国）', short: '挑战', depth: '-10908m', pct: 91, highlight: false, wobbling: false },
  { name: '限制因子号（美国）', short: '限制', depth: '-10928m', pct: 97, highlight: false, wobbling: false },
  { name: '奋斗者号（中国）',   short: '奋斗', depth: '-10909m', pct: 94, highlight: true,  wobbling: false }
])
function wobbleSub(sub: Sub) {
  if (sub.wobbling) return; sub.wobbling = true
  setTimeout(() => { sub.wobbling = false }, 600)
}

const bubbleContainer = ref<HTMLElement>()
function onOceanClick(e: MouseEvent) {
  const c = bubbleContainer.value; if (!c) return
  const rect = c.getBoundingClientRect()
  const bubble = document.createElement('div')
  bubble.className = 'bubble'
  const size = 8 + Math.random() * 18
  bubble.style.cssText = `left:${e.clientX - rect.left}px;top:${e.clientY - rect.top}px;width:${size}px;height:${size}px`
  c.appendChild(bubble)
  bubble.addEventListener('animationend', () => bubble.remove())
}

const seg1 = ref<HTMLElement>(); const seg2 = ref<HTMLElement>()
const seg3 = ref<HTMLElement>(); const seg4 = ref<HTMLElement>()
const seg5 = ref<HTMLElement>(); const seg6 = ref<HTMLElement>()
const seg7 = ref<HTMLElement>()

const bgPhase = ref('ch01') // 用于 ocean overlay 显隐

// 调用 App.vue 暴露的全局背景切换
function activateBg(id: string) {
  const fn = (window as any).__activateBg
  if (fn) fn(id)
}

let numObs: IntersectionObserver | null = null
onMounted(() => {
  probeImage('/assets/images/bg-01.jpg', bgDefaultLoaded)
  probeImage('/assets/images/bg-01-tech.jpg', bgTechLoaded)
  probeImage(photoMainSrc, photoMainLoaded)
  probeImage(photoSubSrc, photoSubLoaded)

  numObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { animateNumber(); numObs!.disconnect() }
  }, { threshold: 0.3 })
  if (seg1.value) numObs.observe(seg1.value)

  // Ch01 内部三阶段背景切换
  nextTick(() => {
    // seg3 进入 → 切到 ch01-tech
    if (seg3.value) {
      ScrollTrigger.create({
        trigger: seg3.value, start: 'top center', end: 'bottom center',
        onEnter: () => { activateBg('ch01-tech'); bgPhase.value = 'ch01-tech' },
        onLeaveBack: () => { activateBg('ch01'); bgPhase.value = 'ch01' },
      })
    }
    // seg5 进入 → 切到 ch01-ocean
    if (seg5.value) {
      ScrollTrigger.create({
        trigger: seg5.value, start: 'top center', end: 'bottom center',
        onEnter: () => { activateBg('ch01-ocean'); bgPhase.value = 'ch01-ocean' },
        onLeaveBack: () => { activateBg('ch01-tech'); bgPhase.value = 'ch01-tech' },
      })
    }
    // seg6 进入 → 切回 ch01
    if (seg6.value) {
      ScrollTrigger.create({
        trigger: seg6.value, start: 'top center',
        onEnter: () => { activateBg('ch01'); bgPhase.value = 'ch01' },
        onLeaveBack: () => { activateBg('ch01-ocean'); bgPhase.value = 'ch01-ocean' },
      })
    }
  })
})
onUnmounted(() => {
  numObs?.disconnect()
})
</script>

<style scoped>
.ch01-story {
  position: relative; width: 100%;
  background: transparent;
}
.ch-overlay {
  position: absolute; inset: 0;
  background: rgba(0,0,0,0.25);
  pointer-events: none; z-index: 0;
}
.story-blocks { position: relative; z-index: 1; }

/* Hero */
.seg-hero { height: 100vh; display: flex; align-items: center; justify-content: center; }
.hero-card {
  background: rgba(0,0,0,0.5); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255,255,255,0.12); border-radius: 18px;
  padding: 40px 48px; color: #fff; text-align: center; width: 360px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.5);
}
.seg-chapter-num { font-size: 12px; font-weight: 800; letter-spacing: 3px; color: rgba(255,255,255,0.55); }
.seg-title { font-size: 38px; font-weight: 900; margin: 10px 0 6px; letter-spacing: 2px; }
.seg-divider { width: 36px; height: 3px; background: #CC0000; border-radius: 2px; margin: 12px auto; }
.seg-subtitle { font-size: 14px; color: rgba(255,255,255,0.65); margin-bottom: 20px; }
.seg-hero-stat { display: flex; align-items: baseline; justify-content: center; gap: 6px; margin-bottom: 8px; }
.hero-num { font-size: 64px; font-weight: 900; color: #CC0000; line-height: 1; font-variant-numeric: tabular-nums; }
.hero-unit { font-size: 22px; color: rgba(255,255,255,0.85); font-weight: 500; }
.seg-hero-desc { font-size: 13px; color: rgba(255,255,255,0.55); }

/* 卡片列 */
.cards-column { display: flex; justify-content: flex-end; padding-right: calc(100vw / 12); padding-top: 32px; padding-bottom: 80px; }
.cards-wrapper {
  width: calc(100vw / 3); min-width: 300px;
  border: 1px solid rgba(255,255,255,0.12); border-radius: 16px;
  overflow: hidden; box-shadow: 0 8px 48px rgba(0,0,0,0.5);
}
.story-card {
  background: rgba(0,0,0,0.58); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  padding: 28px 30px; color: #fff; border-bottom: 1px solid rgba(255,255,255,0.08);
}
.story-card:last-child { border-bottom: none; }

.card-title { font-size: 16px; font-weight: 700; margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
.card-title::before { content: ''; width: 3px; height: 15px; background: #CC0000; border-radius: 2px; flex-shrink: 0; }

.route-svg { width: 100%; height: auto; border-radius: 8px; }
.dive-path { animation: dashDraw 3s ease-in-out forwards; stroke-dashoffset: 600; }
@keyframes dashDraw { to { stroke-dashoffset: 0; } }

.tech-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 11px; }
.tech-list li { display: flex; align-items: flex-start; gap: 10px; font-size: 13px; color: rgba(255,255,255,0.82); line-height: 1.5; }
.tech-dot { width: 6px; height: 6px; border-radius: 50%; background: #CC0000; flex-shrink: 0; margin-top: 5px; }

.timeline { display: flex; flex-direction: column; gap: 12px; }
.tl-item { display: grid; grid-template-columns: 44px 14px 1fr; gap: 8px; align-items: start; }
.tl-year { font-size: 13px; font-weight: 800; color: #CC0000; text-align: right; }
.tl-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,0.3); border: 2px solid #CC0000; justify-self: center; margin-top: 3px; }
.tl-event { font-size: 13px; color: rgba(255,255,255,0.78); line-height: 1.5; }

.photo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.photo-item { position: relative; border-radius: 8px; overflow: hidden; min-height: 120px; }
.photo-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.photo-placeholder { min-height: 120px; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.35); font-size: 12px; text-align: center; padding: 12px; }
.photo-placeholder small { color: rgba(255,255,255,0.2); font-size: 10px; }
.photo-caption { position: absolute; bottom: 0; left: 0; right: 0; padding: 5px 8px; background: rgba(0,0,0,0.55); color: rgba(255,255,255,0.75); font-size: 11px; }

.seg-summary { font-size: 13px; color: rgba(255,255,255,0.78); line-height: 1.9; margin-bottom: 18px; }
.tag-list { display: flex; flex-wrap: wrap; gap: 7px; }
.tag-item { font-size: 12px; padding: 3px 11px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); border-radius: 20px; color: rgba(255,255,255,0.6); }

/* 背景图占位标注 */
.bg-anno { position: absolute; top: 50%; left: 50%; transform: translate(-50%,-50%); pointer-events: none; z-index: 10; }
.bg-anno-box { display: flex; flex-direction: column; align-items: center; gap: 4px; background: rgba(0,0,0,0.55); border: 1px solid rgba(255,200,0,0.4); border-radius: 10px; padding: 10px 20px; }
.bg-anno-label { font-size: 11px; font-weight: 700; color: rgba(255,200,0,0.9); letter-spacing: 1px; }
.bg-anno-path { font-size: 12px; color: rgba(255,255,255,0.85); font-family: monospace; }
.bg-anno-hint { font-size: 11px; color: rgba(255,255,255,0.45); }

@media (max-width: 1024px) { .cards-column { padding-right: 5vw; } .cards-wrapper { width: 70vw; } }
@media (max-width: 767px) {
  .cards-column { padding-right: 16px; padding-left: 16px; justify-content: center; }
  .cards-wrapper { width: 100%; min-width: unset; }
  .hero-card { width: calc(100vw - 48px); padding: 28px 24px; }
  .hero-num { font-size: 48px; }
  .photo-grid { grid-template-columns: 1fr; }
}
</style>

<!-- 海洋场景全局样式（Teleport 到 body 的元素不受 scoped 影响） -->
<style>
.ocean-overlay {
  position: fixed; inset: 0; z-index: 9999;
  background: linear-gradient(to bottom, #0EA5E9 0%, #0369A1 30%, #0C4A6E 60%, #02101A 100%);
  cursor: crosshair;
  transition: opacity 0.6s ease;
}
.ocean-overlay .bubble-container { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.ocean-overlay .bubble {
  position: absolute; border-radius: 50%; background: rgba(255,255,255,0.3); border: 1px solid rgba(255,255,255,0.5);
  transform: translateX(-50%) translateY(-50%); animation: bubbleRise 1.5s ease-out forwards; pointer-events: none;
}
@keyframes bubbleRise {
  0%   { opacity: 0.8; transform: translateX(-50%) translateY(-50%) scale(1); }
  100% { opacity: 0;   transform: translateX(-50%) translateY(calc(-50% - 130px)) scale(1.6); }
}
.ocean-overlay .ocean-right-scene { position: absolute; right: 0; top: 0; width: 34vw; height: 100%; pointer-events: none; }
.ocean-overlay .depth-ruler { position: absolute; right: 9vw; top: 5%; height: 90%; width: 2px; background: rgba(255,255,255,0.25); }
.ocean-overlay .ruler-mark { position: absolute; right: 0; transform: translateY(-50%); white-space: nowrap; }
.ocean-overlay .mark-label { position: absolute; right: 14px; font-size: 11px; color: rgba(255,255,255,0.6); transform: translateY(-50%); }
.ocean-overlay .mark-tick { position: absolute; right: 0; top: 0; width: 8px; height: 1px; background: rgba(255,255,255,0.4); }
.ocean-overlay .sub-icon {
  position: absolute; right: 5vw; transform: translateY(-50%);
  display: flex; align-items: center; gap: 8px; cursor: pointer; pointer-events: all;
}
.ocean-overlay .sub-icon:hover svg { filter: brightness(1.3); }
.ocean-overlay .sub-icon.wobbling { animation: subWobble 0.6s ease; }
@keyframes subWobble {
  0%   { transform: translateY(-50%) translate(0,0); }
  20%  { transform: translateY(-50%) translate(-12px, 8px); }
  40%  { transform: translateY(-50%) translate(10px, -7px); }
  60%  { transform: translateY(-50%) translate(-8px, 5px); }
  80%  { transform: translateY(-50%) translate(6px, -3px); }
  100% { transform: translateY(-50%) translate(0,0); }
}
.ocean-overlay .sub-label { display: flex; flex-direction: column; }
.ocean-overlay .sub-name { font-size: 11px; color: rgba(255,255,255,0.85); font-weight: 600; }
.ocean-overlay .sub-depth { font-size: 10px; color: rgba(255,255,255,0.5); }
.ocean-overlay .sub-icon.highlight .sub-name { color: #FF6B6B; }
.ocean-overlay .sub-icon.highlight .sub-depth { color: #CC0000; }
</style>