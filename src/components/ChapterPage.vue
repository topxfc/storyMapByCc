<template>
  <section
    class="chapter-page"
    :class="[`chapter-${chapter.index}`, { 'chapter-dark': isDark }]"
    :id="`chapter-${chapter.index}`"
    ref="sectionEl"
  >
    <!-- 视差固定背景层（Ch15/16深色主题不使用背景图） -->
    <div class="ch-parallax-bg" v-if="!isDark">
      <div class="parallax-img" :style="parallaxStyle">
        <!-- 有真实图片时显示图片，否则显示占位 -->
        <img
          v-if="bgLoaded"
          :src="bgSrc"
          :alt="`${chapter.title} 背景`"
          class="bg-real-img"
        />
        <div v-else class="bg-placeholder">
          <span class="bg-placeholder-text">
            {{ chapter.title }} · 背景图<br/>
            建议分辨率: 1920×1080<br/>
            格式: JPG/WebP<br/>
            位置: /public/assets/images/bg-{{ String(chapter.index).padStart(2, '0') }}.jpg
          </span>
        </div>
      </div>
      <!-- 渐变遮罩：让文字可读 -->
      <div class="parallax-overlay"></div>
    </div>

    <!-- 内容层（叠在背景之上滚动） -->
    <div class="ch-content-layer">
      <div class="chapter-container">
        <!-- 章节头部 -->
        <div class="ch-header scroll-reveal" ref="headerRef">
          <span class="ch-number">{{ `第 ${String(chapter.index).padStart(2, '0')} 章` }}</span>
          <h2 class="ch-title">{{ chapter.title }}</h2>
          <div class="chapter-divider"></div>
          <p class="ch-subtitle">{{ chapter.subtitle }}</p>
        </div>

        <!-- 核心数字 -->
        <div class="ch-hero-stat scroll-reveal" ref="statRef">
          <span class="stat-num" :style="`color:${accentColor}`" ref="numEl">{{ displayNum }}</span>
          <span class="stat-unit">{{ chapter.heroUnit }}</span>
          <p class="stat-desc">{{ chapter.heroDesc }}</p>
        </div>

        <!-- 自定义内容区（各章节专属展示） -->
        <div class="ch-showcase scroll-reveal" ref="showcaseRef">
          <slot name="showcase"></slot>
        </div>

        <!-- 正文内容 -->
        <div class="ch-body">
          <div class="ch-narrative scroll-reveal" ref="narrativeRef">
            <div class="narrative-block">
              <h3>项目概述</h3>
              <p>{{ chapter.summary }}</p>
            </div>
            <div class="narrative-block">
              <h3>研发背景</h3>
              <p>{{ chapter.background }}</p>
            </div>
            <div class="narrative-block">
              <h3>战略意义</h3>
              <p>{{ chapter.significance }}</p>
            </div>
            <div class="narrative-block">
              <h3>未来展望</h3>
              <p>{{ chapter.future }}</p>
            </div>
          </div>

          <!-- 侧边栏 -->
          <div class="ch-sidebar scroll-reveal" ref="sidebarRef">
            <!-- 技术突破 -->
            <div class="sidebar-card">
              <h4>关键技术突破</h4>
              <ul class="tech-list">
                <li v-for="(b, i) in chapter.technicalBreakthroughs" :key="i">{{ b }}</li>
              </ul>
            </div>

            <!-- 发展时间线 -->
            <div class="sidebar-card">
              <h4>发展历程</h4>
              <div class="mini-timeline">
                <div v-for="ev in chapter.timeline" :key="ev.year + ev.event" class="tl-item">
                  <span class="tl-year" :style="`color:${accentColor}`">{{ ev.year }}</span>
                  <span class="tl-line" :style="`background:${accentColor}`"></span>
                  <span class="tl-event">{{ ev.event }}</span>
                </div>
              </div>
            </div>

            <!-- 图表 -->
            <div class="sidebar-card" v-if="chapter.chart">
              <AchievementChart :config="chapter.chart" :color="accentColor" />
            </div>

            <!-- 标签 -->
            <div class="tag-list">
              <span v-for="tag in chapter.tags" :key="tag" class="tag-item">{{ tag }}</span>
            </div>
          </div>
        </div>

        <!-- 自定义底部内容 -->
        <div class="ch-extra scroll-reveal" ref="extraRef" v-if="$slots.extra">
          <slot name="extra"></slot>
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
const headerRef = ref<HTMLElement>()
const statRef = ref<HTMLElement>()
const showcaseRef = ref<HTMLElement>()
const narrativeRef = ref<HTMLElement>()
const sidebarRef = ref<HTMLElement>()
const extraRef = ref<HTMLElement>()
const numEl = ref<HTMLElement>()
const displayNum = ref(props.chapter.heroStat)

const accentColor = computed(() => categoryColors[props.chapter.category] || '#CC0000')

// 背景图加载
const bgSrc = computed(() => `/assets/images/bg-${String(props.chapter.index).padStart(2, '0')}.jpg`)
const bgLoaded = ref(false)

function probeImage() {
  if (props.isDark) return
  const img = new Image()
  img.onload = () => { bgLoaded.value = true }
  img.src = bgSrc.value
}

// 背景图视差偏移量（滚动时缓慢移动）
const bgOffsetY = ref(0)
const parallaxStyle = computed(() => ({
  transform: `translateY(${bgOffsetY.value}px)`
}))

function onScroll() {
  if (!sectionEl.value || props.isDark) return
  const rect = sectionEl.value.getBoundingClientRect()
  const vh = window.innerHeight
  // 只在元素可见范围内计算
  if (rect.bottom > 0 && rect.top < vh) {
    // 背景以 0.3 倍速度跟随滚动 → 视差效果
    bgOffsetY.value = -rect.top * 0.3
  }
}

function animateNumber() {
  const raw = props.chapter.heroStat
  const num = parseFloat(raw.replace(/[^\d.]/g, ''))
  if (isNaN(num) || raw.includes('∞')) return
  const hasDecimal = raw.includes('.')
  const suffix = raw.replace(/[\d.]/g, '')
  const obj = { val: 0 }
  gsap.to(obj, {
    val: num,
    duration: 2,
    ease: 'power2.out',
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
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          if (entry.target === statRef.value) {
            animateNumber()
          }
        }
      })
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  )
  ;[headerRef, statRef, showcaseRef, narrativeRef, sidebarRef, extraRef].forEach(el => {
    if (el.value) observer!.observe(el.value)
  })
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  observer?.disconnect()
})
</script>

<style scoped>
/* ═══════════════════════════════════════
   章节页 — 固定背景视差滚动
   背景图钉住 → 内容从上方滑入覆盖 →
   内容滑走后背景才随之离开
   ═══════════════════════════════════════ */
.chapter-page {
  position: relative;
  /* clip 让固定背景只在本 section 范围内可见 */
  overflow: clip;
  min-height: 100vh;
}
.chapter-page.chapter-dark {
  background: var(--deep-black) !important;
}

/* ── 视差背景层 ── */
.ch-parallax-bg {
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 0;
  overflow: hidden;
}

.parallax-img {
  position: absolute;
  inset: -60px 0;        /* 上下多出60px 用于视差位移 */
  will-change: transform;
  transition: transform 0.05s linear;
}

/* 真实背景图 */
.bg-real-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}

/* 背景图占位（后续替换为真实图片） */
.bg-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* 默认渐变底色，将来用 background-image 覆盖 */
  background:
    linear-gradient(135deg,
      rgba(200,190,175,0.6) 0%,
      rgba(180,170,155,0.4) 50%,
      rgba(160,150,135,0.6) 100%);
}
.bg-placeholder-text {
  padding: 32px 40px;
  background: rgba(255,255,255,0.75);
  backdrop-filter: blur(4px);
  border-radius: 16px;
  font-size: 14px;
  color: #666;
  text-align: center;
  line-height: 1.8;
  font-weight: 500;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
}

/* 奇偶章节不同底色渐变 */
.chapter-page:nth-child(odd) .bg-placeholder {
  background:
    linear-gradient(160deg,
      rgba(210,195,175,0.5) 0%,
      rgba(190,180,165,0.35) 100%);
}
.chapter-page:nth-child(even) .bg-placeholder {
  background:
    linear-gradient(160deg,
      rgba(185,200,210,0.5) 0%,
      rgba(170,185,195,0.35) 100%);
}

/* 渐变遮罩：仅底部淡出过渡，上方保留完整图片 */
.parallax-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      to bottom,
      transparent 0%,
      transparent 55%,
      rgba(245,242,236,0.4) 75%,
      rgba(245,242,236,0.85) 90%,
      rgba(245,242,236,1) 100%
    );
  pointer-events: none;
  z-index: 1;
}
.chapter-page:nth-child(even) .parallax-overlay {
  background:
    linear-gradient(
      to bottom,
      transparent 0%,
      transparent 55%,
      rgba(255,249,240,0.4) 75%,
      rgba(255,249,240,0.85) 90%,
      rgba(255,249,240,1) 100%
    );
}

/* ── 内容层 ── */
.ch-content-layer {
  position: relative;
  z-index: 2;
  /*
    不用负 margin！
    背景占 100vh sticky，内容紧随其后自然排列。
    滚动时：先看到完整一屏背景 → 继续滚动内容从底部升起覆盖背景。
  */
  padding-top: 60px;
  padding-bottom: 80px;
  min-height: 60vh;
  /* 内容区自带背景色，遮住下方的 sticky 背景 */
  background: var(--bg-warm);
}
.chapter-page:nth-child(even) .ch-content-layer {
  background: var(--bg-section);
}
/* 深色主题没有背景图层，正常排列 */
.chapter-dark .ch-content-layer {
  margin-top: 0;
  padding-top: 100px;
}

.chapter-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 48px;
}

/* ── 章节头 ── */
.ch-header {
  margin-bottom: 32px;
}
.ch-number {
  font-family: var(--font-num);
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 3px;
  color: var(--china-red);
  text-transform: uppercase;
}
.chapter-dark .ch-number { color: var(--tech-cyan); }

.ch-title {
  font-size: 48px;
  font-weight: 900;
  color: var(--text-primary);
  line-height: 1.2;
  letter-spacing: 2px;
  margin: 12px 0;
}
.chapter-dark .ch-title { color: #FFFFFF; }

.ch-subtitle {
  font-size: 18px;
  color: var(--text-secondary);
  line-height: 1.6;
}
.chapter-dark .ch-subtitle { color: var(--silver-gray); }

/* ── 核心数字 ── */
.ch-hero-stat {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 48px;
}
.stat-num {
  font-size: 80px;
  font-weight: 900;
  font-family: var(--font-num);
  line-height: 1;
}
.stat-unit {
  font-size: 24px;
  color: var(--text-secondary);
  font-weight: 500;
}
.stat-desc {
  width: 100%;
  font-size: 16px;
  color: var(--text-muted);
  margin-top: 4px;
}
.chapter-dark .stat-unit { color: var(--silver-gray); }
.chapter-dark .stat-desc { color: rgba(255,255,255,0.4); }

/* ── 展示区 ── */
.ch-showcase {
  margin-bottom: 48px;
}

/* ── 正文区 ── */
.ch-body {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 48px;
  align-items: start;
}

.ch-narrative {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.narrative-block h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.narrative-block h3::before {
  content: '';
  width: 3px;
  height: 16px;
  background: var(--china-red);
  border-radius: 2px;
}
.chapter-dark .narrative-block h3 { color: #FFFFFF; }
.chapter-dark .narrative-block h3::before { background: var(--tech-cyan); }

.narrative-block p {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 2;
}
.chapter-dark .narrative-block p { color: rgba(255,255,255,0.65); }

/* ── 侧边栏 ── */
.ch-sidebar {
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: sticky;
  top: 100px;
}
.sidebar-card {
  padding: 24px;
  background: rgba(255,255,255,0.85);
  backdrop-filter: blur(8px);
  border-radius: 14px;
  border: 1px solid rgba(0,0,0,0.04);
  box-shadow: 0 2px 12px rgba(0,0,0,0.03);
}
.chapter-dark .sidebar-card {
  background: rgba(255,255,255,0.04);
  border-color: rgba(255,255,255,0.06);
  backdrop-filter: none;
}
.sidebar-card h4 {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 16px;
  letter-spacing: 0.5px;
}
.chapter-dark .sidebar-card h4 { color: rgba(255,255,255,0.85); }

/* Mini 时间线 */
.mini-timeline {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.tl-item {
  display: grid;
  grid-template-columns: 42px 12px 1fr;
  gap: 8px;
  align-items: start;
}
.tl-year {
  font-size: 13px;
  font-weight: 800;
  font-family: var(--font-num);
  text-align: right;
}
.tl-line {
  width: 2px;
  height: 100%;
  min-height: 20px;
  border-radius: 1px;
  opacity: 0.3;
  justify-self: center;
}
.tl-event {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
}
.chapter-dark .tl-event { color: rgba(255,255,255,0.55); }

/* ── 额外内容 ── */
.ch-extra {
  margin-top: 48px;
}

/* ═══ 响应式 ═══ */
@media (max-width: 1024px) {
  .ch-body { grid-template-columns: 1fr; }
  .ch-sidebar { position: relative; top: 0; }
  .ch-title { font-size: 36px; }
  .stat-num { font-size: 56px; }
  .chapter-container { padding: 0 24px; }
}
@media (max-width: 767px) {
  .ch-title { font-size: 28px; }
  .stat-num { font-size: 42px; }
  .stat-unit { font-size: 18px; }
  .chapter-container { padding: 0 16px; }
  .ch-parallax-bg { height: 75vh; }
}
</style>
