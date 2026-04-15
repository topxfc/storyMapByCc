<template>
  <section
    class="chapter-page"
    :class="[`chapter-${chapter.index}`, { 'chapter-dark': isDark }]"
    :id="`chapter-${chapter.index}`"
    ref="sectionEl"
  >
    <!-- 暗化遮罩 -->
    <div class="ch-overlay" />

    <!-- 背景图占位标注 -->
    <div class="bg-anno" v-if="!isDark && !bgLoaded">
      <div class="bg-anno-box">
        <span class="bg-anno-label">第{{ String(chapter.index).padStart(2,'0') }}章 背景图</span>
        <span class="bg-anno-path">/public/assets/images/bg-{{ String(chapter.index).padStart(2,'0') }}.jpg</span>
        <span class="bg-anno-hint">建议 1920x1080 · JPG/WebP · {{ chapter.title }}场景</span>
      </div>
    </div>

    <!-- 叙事块 -->
    <div class="story-blocks">
      <!-- Hero 全屏 -->
      <div class="seg-hero" ref="heroRef">
        <div class="hero-card glass">
          <span class="seg-chapter-num">{{ `第 ${String(chapter.index).padStart(2,'0')} 章` }}</span>
          <h1 class="seg-title">{{ chapter.title }}</h1>
          <div class="seg-divider" :style="{ background: accentColor }" />
          <p class="seg-subtitle">{{ chapter.subtitle }}</p>
          <div class="seg-hero-stat">
            <span class="hero-num" :style="{ color: accentColor }" ref="numEl">{{ displayNum }}</span>
            <span class="hero-unit">{{ chapter.heroUnit }}</span>
          </div>
          <p class="seg-hero-desc">{{ chapter.heroDesc }}</p>
        </div>
      </div>

      <!-- 紧凑卡片列，靠右 -->
      <div class="cards-column">
        <div class="cards-wrapper">

          <!-- 自定义展示区（各章节专属） -->
          <div class="story-card" v-if="$slots.showcase">
            <slot name="showcase" />
          </div>

          <!-- 关键技术突破 -->
          <div class="story-card">
            <h3 class="card-title">关键技术突破</h3>
            <ul class="tech-list">
              <li v-for="(b, i) in chapter.technicalBreakthroughs" :key="i">
                <span class="tech-dot" :style="{ background: accentColor }" />{{ b }}
              </li>
            </ul>
          </div>

          <!-- 发展历程 -->
          <div class="story-card">
            <h3 class="card-title">发展历程</h3>
            <div class="timeline">
              <div v-for="ev in chapter.timeline" :key="ev.year + ev.event" class="tl-item">
                <span class="tl-year" :style="{ color: accentColor }">{{ ev.year }}</span>
                <span class="tl-dot" :style="{ borderColor: accentColor }" />
                <span class="tl-event">{{ ev.event }}</span>
              </div>
            </div>
          </div>

          <!-- 统计图 -->
          <div class="story-card" v-if="chapter.chart">
            <h3 class="card-title">{{ chapter.chart.title }}</h3>
            <AchievementChart :config="chapter.chart" :color="accentColor" />
          </div>

          <!-- 标签 -->
          <div class="story-card">
            <div class="tag-list">
              <span v-for="tag in chapter.tags" :key="tag" class="tag-item">{{ tag }}</span>
            </div>
          </div>

          <!-- 自定义底部 -->
          <div class="story-card" v-if="$slots.extra">
            <slot name="extra" />
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { categoryColors } from '../data/achievements'
import AchievementChart from './AchievementChart.vue'
import type { Achievement } from '../types'
import gsap from 'gsap'

const props = defineProps<{
  chapter: Achievement
  isDark?: boolean
}>()

const sectionEl = ref<HTMLElement>()
const heroRef = ref<HTMLElement>()
const numEl = ref<HTMLElement>()
const displayNum = ref(props.chapter.heroStat)

const accentColor = computed(() => categoryColors[props.chapter.category] || '#CC0000')

// 背景图探测（仅用于占位提示）
const bgSrc = computed(() => `/assets/images/bg-${String(props.chapter.index).padStart(2, '0')}.jpg`)
const bgLoaded = ref(false)
function probeImage() {
  if (props.isDark) return
  const img = new Image()
  img.onload = () => { bgLoaded.value = true }
  img.src = bgSrc.value
}

function animateNumber() {
  const raw = props.chapter.heroStat
  const num = parseFloat(raw.replace(/[^\d.]/g, ''))
  if (isNaN(num) || raw.includes('∞')) return
  const hasDecimal = raw.includes('.')
  const suffix = raw.replace(/[\d.]/g, '')
  const obj = { val: 0 }
  gsap.to(obj, {
    val: num, duration: 2, ease: 'power2.out',
    onUpdate: () => {
      displayNum.value = hasDecimal
        ? obj.val.toFixed(raw.split('.')[1]?.replace(/\D/g, '').length || 1) + suffix
        : Math.round(obj.val) + suffix
    }
  })
}

let observer: IntersectionObserver | null = null
onMounted(() => {
  probeImage()
  observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { animateNumber(); observer!.disconnect() }
  }, { threshold: 0.3 })
  if (heroRef.value) observer.observe(heroRef.value)
})
onUnmounted(() => { observer?.disconnect() })
</script>

<style scoped>
/* ══ 章节页 — 背景由 StoryBackground 管理 ══ */
.chapter-page {
  position: relative;
  min-height: 100vh;
  background: transparent;
}
.chapter-page.chapter-dark {
  background: var(--deep-black) !important;
}

.ch-overlay {
  position: absolute; inset: 0;
  background: rgba(0,0,0,0.3);
  pointer-events: none; z-index: 0;
}
.chapter-dark .ch-overlay { background: none; }

.story-blocks { position: relative; z-index: 1; }

/* ══ Hero 全屏 ══ */
.seg-hero {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-card {
  background: rgba(0,0,0,0.5);
  backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 18px;
  padding: 40px 48px;
  color: #fff;
  text-align: center;
  width: 380px;
  box-shadow: 0 8px 40px rgba(0,0,0,0.5);
}
.chapter-dark .hero-card {
  background: rgba(0,0,0,0.6);
  border-color: rgba(255,255,255,0.08);
}
.seg-chapter-num {
  font-size: 12px; font-weight: 800;
  letter-spacing: 3px;
  color: rgba(255,255,255,0.55);
}
.seg-title {
  font-size: 36px; font-weight: 900;
  margin: 10px 0 6px; letter-spacing: 2px;
  color: #fff;
}
.seg-divider {
  width: 36px; height: 3px;
  border-radius: 2px; margin: 12px auto;
}
.seg-subtitle {
  font-size: 14px;
  color: rgba(255,255,255,0.65);
  margin-bottom: 20px;
}
.seg-hero-stat {
  display: flex; align-items: baseline;
  justify-content: center; gap: 6px;
  margin-bottom: 8px;
}
.hero-num {
  font-size: 64px; font-weight: 900;
  line-height: 1; font-variant-numeric: tabular-nums;
}
.hero-unit {
  font-size: 22px;
  color: rgba(255,255,255,0.85);
  font-weight: 500;
}
.seg-hero-desc {
  font-size: 13px;
  color: rgba(255,255,255,0.55);
}

/* ══ 卡片列 ══ */
.cards-column {
  display: flex;
  justify-content: flex-end;
  padding-right: calc(100vw / 12);
  padding-top: 32px;
  padding-bottom: 80px;
}
.cards-wrapper {
  width: calc(100vw / 3);
  min-width: 300px;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 48px rgba(0,0,0,0.5);
}
.story-card {
  background: rgba(0,0,0,0.58);
  backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
  padding: 28px 30px;
  color: #fff;
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.story-card:last-child { border-bottom: none; }
.chapter-dark .story-card {
  background: rgba(0,0,0,0.65);
}

/* ══ 卡片标题 ══ */
.card-title {
  font-size: 16px; font-weight: 700;
  margin-bottom: 16px;
  display: flex; align-items: center; gap: 8px;
  color: #fff;
}
.card-title::before {
  content: ''; width: 3px; height: 15px;
  background: var(--china-red);
  border-radius: 2px; flex-shrink: 0;
}

/* ══ 技术列表 ══ */
.tech-list {
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-direction: column; gap: 11px;
}
.tech-list li {
  display: flex; align-items: flex-start;
  gap: 10px; font-size: 13px;
  color: rgba(255,255,255,0.82); line-height: 1.5;
}
.tech-dot {
  width: 6px; height: 6px;
  border-radius: 50%; flex-shrink: 0;
  margin-top: 5px;
}

/* ══ 时间线 ══ */
.timeline { display: flex; flex-direction: column; gap: 12px; }
.tl-item {
  display: grid;
  grid-template-columns: 44px 14px 1fr;
  gap: 8px; align-items: start;
}
.tl-year {
  font-size: 13px; font-weight: 800;
  text-align: right; font-variant-numeric: tabular-nums;
}
.tl-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  border: 2px solid;
  justify-self: center; margin-top: 3px;
}
.tl-event {
  font-size: 13px;
  color: rgba(255,255,255,0.78);
  line-height: 1.5;
}

/* ══ 标签 ══ */
.tag-list { display: flex; flex-wrap: wrap; gap: 7px; }
.tag-item {
  font-size: 12px; padding: 3px 11px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 20px;
  color: rgba(255,255,255,0.6);
}

/* ══ 背景图占位标注 ══ */
.bg-anno {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%,-50%);
  pointer-events: none; z-index: 10;
}
.bg-anno-box {
  display: flex; flex-direction: column;
  align-items: center; gap: 4px;
  background: rgba(0,0,0,0.55);
  border: 1px solid rgba(255,200,0,0.4);
  border-radius: 10px; padding: 10px 20px;
}
.bg-anno-label { font-size: 11px; font-weight: 700; color: rgba(255,200,0,0.9); letter-spacing: 1px; }
.bg-anno-path { font-size: 12px; color: rgba(255,255,255,0.85); font-family: monospace; }
.bg-anno-hint { font-size: 11px; color: rgba(255,255,255,0.45); }

/* ══ 响应式 ══ */
@media (max-width: 1024px) {
  .cards-column { padding-right: 5vw; }
  .cards-wrapper { width: 70vw; }
}
@media (max-width: 767px) {
  .cards-column { padding-right: 16px; padding-left: 16px; justify-content: center; }
  .cards-wrapper { width: 100%; min-width: unset; }
  .hero-card { width: calc(100vw - 48px); padding: 28px 24px; }
  .hero-num { font-size: 48px; }
  .seg-title { font-size: 28px; }
}
</style>